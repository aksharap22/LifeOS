import OpenAI from 'openai';
import Insight from '../models/Insight.js';
import OperatingManual from '../models/OperatingManual.js';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export const generateAIInsights = async (experimentId: string, data: any[]) => {
  const prompt = `Analyze this lifestyle experiment data and provide insights: ${JSON.stringify(data)}`;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' }
  });

  const aiResult = JSON.parse(response.choices[0]?.message.content || '{}');
  
  const insight = await Insight.create({
    experimentId,
    title: aiResult.title || 'New Insight',
    description: aiResult.description || 'AI analysis complete',
    confidenceScore: aiResult.confidence || 0.8
  });

  return insight;
};
