import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: `Du är Ellevios digitala AI-kundassistent på ellevio.se. 
Din uppgift är att svara på kunders frågor om elområden (SE1–SE4), elnätsavgifter, solcellsanslutningar, strömavbrott och energianvändning.
Svara alltid på enkel, pedagogisk, trevlig och professionell svenska. Håll svaren korta, strukturerade och användarvänliga med punkter om det hjälper läsaren.`,
      messages
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('AI route error:', error);
    return new Response(JSON.stringify({ error: 'AI Assistant unavailable' }), { status: 500 });
  }
}
