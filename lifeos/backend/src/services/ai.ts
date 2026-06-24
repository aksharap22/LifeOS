import OpenAI from 'openai';
import Insight from '../models/Insight.js';

const getAIProvider = () => process.env['AI_PROVIDER'] || 'ollama';

const callOpenAI = async (prompt: string) => {
  const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });

  const response = await openai.chat.completions.create({
    model: process.env['OPENAI_MODEL'] || 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0]?.message.content || '{}');
};

const callOllama = async (prompt: string) => {
  const baseUrl = process.env['OLLAMA_BASE_URL'] || 'http://localhost:11434';
  const model = process.env['OLLAMA_MODEL'] || 'llama3';

  const response = await fetch(`${baseUrl}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt: `${prompt}\n\nIMPORTANT: Respond ONLY with a valid JSON object.`,
      stream: false,
      format: 'json'
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.response || '{}');
};

export const generateAIInsights = async (experimentId: string, data: any[]) => {
  const provider = getAIProvider();
  const prompt = `
    Analyze this lifestyle experiment data and provide insights.
    Data: ${JSON.stringify(data)}
    
    Return a JSON object with:
    - title: A short descriptive title of the insight.
    - description: A detailed explanation of the pattern found.
    - confidence: A number between 0 and 1 representing the statistical or logical confidence.
  `;

  let aiResult;
  try {
    if (provider === 'openai') {
      aiResult = await callOpenAI(prompt);
    } else {
      aiResult = await callOllama(prompt);
    }
  } catch (error) {
    console.error(`AI Insight generation failed with ${provider}:`, error);
    throw error;
  }

  const insight = await Insight.create({
    experimentId,
    title: aiResult.title || 'New Insight',
    description: aiResult.description || 'AI analysis complete',
    confidenceScore: aiResult.confidence || 0.8
  });

  return insight;
};
