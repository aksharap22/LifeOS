export type ChallengeMetric = {
  name: string;
  type: 'Numeric' | 'Boolean' | 'Rating Scale' | 'Duration' | 'Percentage' | 'Text';
  unit?: string;
};

export type ChallengeTemplate = {
  id: string;
  title: string;
  badge: string;
  category: string;
  duration: number;
  description: string;
  hypothesis: string;
  metrics: ChallengeMetric[];
  prompts: string[];
  tags: string[];
};

export const customChallengeTemplate: ChallengeTemplate = {
  id: 'custom',
  title: 'Custom Challenge',
  badge: 'Personal',
  category: 'Custom',
  duration: 7,
  description: 'Build a personal challenge around a behavior, fear, habit, or question you want to test.',
  hypothesis: 'A small structured challenge will reveal a useful pattern about my behavior.',
  metrics: [
    { name: 'Mood', type: 'Rating Scale' },
    { name: 'Energy', type: 'Rating Scale' },
    { name: 'Consistency', type: 'Percentage' },
  ],
  prompts: [
    'What did you do today for the challenge?',
    'How consistent were you?',
    'What did you learn about yourself?',
  ],
  tags: ['custom', 'personal', 'habit'],
};

export const challengeTemplates: ChallengeTemplate[] = [
  customChallengeTemplate,
  {
    id: 'chronotype-quest',
    title: 'Chronotype Quest',
    badge: 'High Impact',
    category: 'Lifestyle',
    duration: 14,
    description: 'Shift your primary deep-work block 2 hours earlier/later.',
    hypothesis: 'Working in alignment with your natural biological clock increases focus.',
    metrics: [{ name: 'Clarity', type: 'Rating Scale' }],
    prompts: ['What time did you start?'],
    tags: ['work', 'energy', 'productivity', 'lifestyle'],
  },
  {
    id: 'deep-sleep-protocol',
    title: 'Deep Sleep Protocol',
    badge: 'Biological',
    category: 'Sleep',
    duration: 10,
    description: 'No screens/food 3 hours before sleep.',
    hypothesis: 'Digital sunset leads to deeper REM cycles.',
    metrics: [{ name: 'Sleep Quality', type: 'Rating Scale' }],
    prompts: ['Did you avoid screens?'],
    tags: ['sleep', 'health', 'rest'],
  },
  {
    id: 'flow-commute',
    title: 'The Flow Commute',
    badge: 'Mindset',
    category: 'Attention',
    duration: 7,
    description: '20 mins of total silence before work.',
    hypothesis: 'Silence protects mental bandwidth for flow.',
    metrics: [{ name: 'Flow State', type: 'Rating Scale' }],
    prompts: ['How quiet was your mind?'],
    tags: ['focus', 'commute', 'attention'],
  },
  {
    id: 'compliment-blackout',
    title: 'The Compliment Blackout',
    badge: 'Social',
    category: 'Social',
    duration: 7,
    description: 'Give zero compliments for 7 days.',
    hypothesis: 'Removing praise as a social lubricant reveals true social dynamics.',
    metrics: [{ name: 'Discomfort', type: 'Rating Scale' }],
    prompts: ['Did you want to compliment?'],
    tags: ['social', 'honesty', 'boundaries'],
  },
  {
    id: 'dead-time-audit',
    title: 'Dead Time Audit',
    badge: 'Attention',
    category: 'Attention',
    duration: 3,
    description: 'Log every phone pickup trigger.',
    hypothesis: 'Phone use is usually anxiety-driven.',
    metrics: [{ name: 'Pickups', type: 'Numeric' }],
    prompts: ['Why did you pick it up?'],
    tags: ['phone', 'addiction', 'attention', 'focus'],
  },
  {
    id: 'ninety-second-rule',
    title: 'The 90 Second Rule',
    badge: 'Emotional',
    category: 'Emotional',
    duration: 14,
    description: 'Observe negative emotions for 90s.',
    hypothesis: 'Feelings last only 90s without mental loops.',
    metrics: [{ name: 'Intensity', type: 'Rating Scale' }],
    prompts: ['Did it pass after 90s?'],
    tags: ['emotion', 'anxiety', 'stress'],
  },
  {
    id: 'one-hard-thing-daily',
    title: 'One Hard Thing Daily',
    badge: 'Growth',
    category: 'Growth',
    duration: 21,
    description: 'Do one task you avoid daily.',
    hypothesis: 'Builds discomfort tolerance.',
    metrics: [{ name: 'Done', type: 'Boolean' }],
    prompts: ['What was the hard thing?'],
    tags: ['growth', 'fear', 'productivity'],
  },
  {
    id: 'yes-audit',
    title: 'The "Yes" Audit',
    badge: 'Boundaries',
    category: 'Social',
    duration: 5,
    description: '10-sec pause before saying Yes.',
    hypothesis: 'Distinguish genuine interest from guilt.',
    metrics: [{ name: 'Times said No', type: 'Numeric' }],
    prompts: ['Did the pause help?'],
    tags: ['social', 'guilt', 'boundaries'],
  },
  {
    id: 'digital-shadow-box',
    title: 'Digital Shadow Box',
    badge: 'Focus',
    category: 'Attention',
    duration: 7,
    description: 'First 60 mins offline daily.',
    hypothesis: 'Protect morning mental clarity.',
    metrics: [{ name: 'Clarity', type: 'Rating Scale' }],
    prompts: ['What was your focus like?'],
    tags: ['focus', 'morning', 'attention'],
  },
  {
    id: 'money-emotion-map',
    title: 'The Money-Emotion Map',
    badge: 'Insight',
    category: 'Behavioral',
    duration: 10,
    description: 'Log emotion before $5+ purchases.',
    hypothesis: 'Spending regulates emotion.',
    metrics: [{ name: 'Regret', type: 'Rating Scale' }],
    prompts: ['What emotion was it?'],
    tags: ['money', 'behavioral', 'spending'],
  },
  {
    id: 'fasting-audit',
    title: 'Intermittent Fasting Audit',
    badge: 'Metabolic',
    category: 'Health',
    duration: 14,
    description: '16:8 fasting window tracking.',
    hypothesis: 'Fasting improves metabolic flexibility and focus.',
    metrics: [{ name: 'Energy Stability', type: 'Rating Scale' }],
    prompts: ['How was your hunger levels?'],
    tags: ['health', 'diet', 'metabolic', 'fasting'],
  },
  {
    id: 'active-recall',
    title: 'Active Recall Learning',
    badge: 'Growth',
    category: 'Productivity',
    duration: 10,
    description: 'Test recall before re-reading materials.',
    hypothesis: 'Active retrieval consolidates memory faster.',
    metrics: [{ name: 'Retention', type: 'Percentage' }],
    prompts: ['What did you recall correctly?'],
    tags: ['learning', 'productivity', 'study', 'growth'],
  },
  {
    id: 'nocturnal-probe',
    title: 'Nocturnal Productivity Probe',
    badge: 'Lifestyle',
    category: 'Lifestyle',
    duration: 7,
    description: 'Experiment with late-night work blocks.',
    hypothesis: 'Quiet night hours may boost output.',
    metrics: [{ name: 'Output', type: 'Rating Scale' }],
    prompts: ['Did you work effectively?'],
    tags: ['lifestyle', 'work', 'night', 'productivity'],
  },
];
