import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawMessages = body.messages || [];

    // Loop & Payload Safety: Cap history to last 6 messages & limit text length
    const sanitizedMessages = rawMessages.slice(-6).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: String(m.content || '').substring(0, 500)
    }));

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
    return new Response(JSON.stringify({ error: 'AI Assistant unavailable' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
