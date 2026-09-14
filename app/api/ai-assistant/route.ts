import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const apiKey = process.env.OPENAI_API_KEY || '';
const openai = createOpenAI({ apiKey });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawMessages = body.messages || [];

    // Loop & Payload Safety: Cap history to last 6 messages & limit text length
    const sanitizedMessages = rawMessages.slice(-6).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: String(m.content || '').substring(0, 500)
    }));

    // Demo Mode Fallback if no OpenAI API Key is provided locally
    if (!apiKey) {
      const lastMsg = (sanitizedMessages[sanitizedMessages.length - 1]?.content || '').toLowerCase();
      let reply = "Hej! Jag är Ellevios digitala AI-kundassistent. Hur kan jag hjälpa dig med dina frågor om elområde (SE1–SE4), elnätsavgift, solceller eller förbrukningsstyrning?";

      if (lastMsg.includes('pris') || lastMsg.includes('område') || lastMsg.includes('se3') || lastMsg.includes('matris')) {
        reply = "Spotpriset varierar mellan elområdena SE1 (Norrbotten), SE2 (Sundsvall), SE3 (Stockholm/Mellansverige) och SE4 (Malmö/Skåne). I vår interaktiva Timmätar-Matrix här på sidan kan du se timpriser och nätbelastning för att planera din förbrukning under dygnets billigaste timmar (kl 00:00–06:00).";
      } else if (lastMsg.includes('solcell') || lastMsg.includes('anslut')) {
        reply = "För att ansluta solceller till Ellevios elnät skickar din behöriga elinstallatör in en föranmälan. Därefter installerar vi en ny smart timmätare utan extra kostnad.";
      } else if (lastMsg.includes('avbrott') || lastMsg.includes('ström')) {
        reply = "Vid strömavbrott kan du kontrollera Ellevios live-avbrottskarta på ellevio.se för realtidsinformation om beräknad återställningstid i ditt område.";
      }

      return new Response(reply, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: `Du är Ellevios digitala AI-kundassistent på ellevio.se. 
Din uppgift är att svara på kunders frågor om elområden (SE1–SE4), elnätsavgifter, solcellsanslutningar, strömavbrott och energianvändning.
Svara alltid på enkel, ren, trevlig och professionell svenska utan konstiga tecken eller koder. Håll svaren korta och välstrukturerade.`,
      messages: sanitizedMessages
    });

    // Return PLAIN TEXT stream (toTextStreamResponse) so reader decodes 100% human-readable Swedish text
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('AI route error:', error);
    return new Response('Hej! Jag hjälper dig gärna med frågor om Ellevios elnät, timpriser och elområden SE1–SE4.', { 
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}
