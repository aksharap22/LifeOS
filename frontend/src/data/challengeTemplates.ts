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
};

export const challengeTemplates: ChallengeTemplate[] = [
  customChallengeTemplate,
  {
    id: 'chronotype-quest',
    title: 'Chronotype Quest',
    badge: 'High Impact',
    category: 'Lifestyle',
    duration: 14,
    description:
      'Shift your primary deep-work block 2 hours earlier or later. Identify your peak cognitive performance window through daily output tracking.',
    hypothesis: 'Working in alignment with your natural biological clock significantly increases focus and reduces mental fatigue.',
    metrics: [
      { name: 'Cognitive Clarity', type: 'Rating Scale' },
      { name: 'Energy Crash Time', type: 'Duration', unit: 'hrs' },
      { name: 'Output Quality', type: 'Rating Scale' },
    ],
    prompts: [
      'What time did you start your deep work today?',
      'At what point did you feel your focus start to drop?',
      'Did you feel more or less productive compared to your usual schedule?',
    ],
  },
  {
    id: 'deep-sleep-protocol',
    title: 'Deep Sleep Protocol',
    badge: 'Biological',
    category: 'Sleep',
    duration: 10,
    description:
      'No digital screens or caloric intake 3 hours before sleep. Test the impact of a strict "digital sunset" on morning alertness.',
    hypothesis: 'Eliminating blue light and late-night digestion leads to deeper REM cycles and higher morning energy.',
    metrics: [
      { name: 'Minutes to Fall Asleep', type: 'Duration', unit: 'min' },
      { name: 'Morning Alertness', type: 'Rating Scale' },
      { name: 'Sleep Consistency', type: 'Boolean' },
    ],
    prompts: [
      'Did you successfully avoid screens for the full 3 hours?',
      'How groggy did you feel immediately upon waking?',
      'What was the last thing you thought about before falling asleep?',
    ],
  },
  {
    id: 'flow-commute',
    title: 'The Flow Commute',
    badge: 'Mindset',
    category: 'Attention',
    duration: 7,
    description:
      'Begin your workday with 20 minutes of total silence. No music, podcasts, or notifications. Observe the impact on creative problem solving.',
    hypothesis: 'Protecting your mind from early-morning external inputs increases your capacity for original thought and strategic planning.',
    metrics: [
      { name: 'New Ideas Generated', type: 'Numeric' },
      { name: 'Initial Stress Level', type: 'Rating Scale' },
      { name: 'Flow State Duration', type: 'Duration', unit: 'min' },
    ],
    prompts: [
      'What did you think about during the 20 minutes of silence?',
      'Did you find it easier to enter "flow" once you started working?',
      'How strong was the urge to check notifications during the silence?',
    ],
  },
  {
    id: 'compliment-blackout',
    title: 'The Compliment Blackout',
    badge: 'Social',
    category: 'Social',
    duration: 7,
    description:
      'Practice radical social honesty by giving zero compliments and accepting them with a simple "thank you". Stop using praise as a social lubricant.',
    hypothesis: 'We often use compliments to avoid awkwardness or manipulate social dynamics rather than expressing genuine appreciation.',
    metrics: [
      { name: 'Conversation quality', type: 'Rating Scale' },
      { name: 'Discomfort score', type: 'Rating Scale' },
      { name: 'Self-worth', type: 'Rating Scale' },
    ],
    prompts: [
      'Where did you want to give or deflect a compliment today?',
      'Did conversations feel more honest, colder, awkward, or surprisingly normal?',
      'What did you notice about your need for validation?',
    ],
  },
  {
    id: 'dead-time-audit',
    title: 'Dead Time Audit',
    badge: 'Attention',
    category: 'Attention',
    duration: 3,
    description:
      'Audit your digital dependency. Every time you reach for your phone, immediately log the trigger: boredom, habit, anxiety, or a genuine functional need.',
    hypothesis: 'Most smartphone usage is a subconscious reaction to minor emotional discomfort rather than a conscious choice.',
    metrics: [
      { name: 'Phone pickups', type: 'Numeric' },
      { name: 'Anxiety-driven pickups', type: 'Numeric' },
      { name: 'Genuine-need pickups', type: 'Numeric' },
    ],
    prompts: [
      'What was the most common reason you picked up your phone?',
      'Which pickup felt automatic before you even noticed it?',
      'What would you have done if the phone was not available?',
    ],
  },
  {
    id: 'ninety-second-rule',
    title: 'The 90 Second Rule',
    badge: 'Emotional',
    category: 'Emotional',
    duration: 14,
    description:
      'When a negative emotion arises, set a 90-second timer. Observe the physical sensation without narrating a story or reacting impulsively.',
    hypothesis: 'The physiological lifespan of an emotion is only 90 seconds; the rest is maintained by our own mental loops.',
    metrics: [
      { name: 'Emotion intensity before', type: 'Rating Scale' },
      { name: 'Emotion intensity after', type: 'Rating Scale' },
      { name: 'Reacted impulsively', type: 'Boolean' },
    ],
    prompts: [
      'What emotion showed up, and where did you feel it physically?',
      'What thoughts tried to keep the emotion alive?',
      'Did the intensity change after 90 seconds?',
    ],
  },
  {
    id: 'one-hard-thing-daily',
    title: 'One Hard Thing Daily',
    badge: 'Growth',
    category: 'Growth',
    duration: 21,
    description:
      'Deliberately choose one task each day that you normally avoid due to minor discomfort or fear. Build your "discomfort tolerance" muscle.',
    hypothesis: 'Daily small discomforts build tolerance that makes bigger challenges feel smaller.',
    metrics: [
      { name: 'Discomfort before', type: 'Rating Scale' },
      { name: 'Relief after', type: 'Rating Scale' },
      { name: 'Challenge completed', type: 'Boolean' },
    ],
    prompts: [
      'What hard thing did you choose today?',
      'What made it uncomfortable before you started?',
      'How did you feel after doing it?',
    ],
  },
  {
    id: 'yes-audit',
    title: 'The "Yes" Audit',
    badge: 'Boundaries',
    category: 'Social',
    duration: 5,
    description:
      'Interrupt the automatic "Yes". Pause for 10 seconds before committing to any request to distinguish between genuine willingness and social guilt.',
    hypothesis: 'We often commit to things out of habit or social pressure rather than genuine interest.',
    metrics: [
      { name: 'Guilt-based commits', type: 'Numeric' },
      { name: 'Genuine-interest commits', type: 'Numeric' },
      { name: 'Times said "No"', type: 'Numeric' },
    ],
    prompts: [
      'What was the hardest thing to pause before answering today?',
      'Did the 10-second pause change your final answer?',
      'How did it feel in your body when you considered saying no?',
    ],
  },
  {
    id: 'digital-shadow-box',
    title: 'Digital Shadow Box',
    badge: 'Focus',
    category: 'Attention',
    duration: 7,
    description:
      'Reclaim your mornings. Spend the first 60 minutes of your day completely offline to discover your natural focus before the digital world intervenes.',
    hypothesis: 'Our morning "defaults" are heavily influenced by digital stimulation, masking our true mental state.',
    metrics: [
      { name: 'Mental clarity', type: 'Rating Scale' },
      { name: 'Urge to check phone', type: 'Rating Scale' },
      { name: 'Boredom level', type: 'Rating Scale' },
    ],
    prompts: [
      'What was the first thing your mind wanted to check this morning?',
      'What did you actually do with that hour?',
      'Did your focus for the rest of the day feel different?',
    ],
  },
  {
    id: 'money-emotion-map',
    title: 'The Money-Emotion Map',
    badge: 'Insight',
    category: 'Behavioral',
    duration: 10,
    description:
      'Map the cost of your emotions. Log every purchase over $5 and identify the feeling—stress, joy, boredom—that triggered the impulse to spend.',
    hypothesis: 'Significant spending is often a tool for emotional regulation rather than practical utility.',
    metrics: [
      { name: 'Emotional purchases', type: 'Numeric' },
      { name: 'Necessity purchases', type: 'Numeric' },
      { name: 'Regret level', type: 'Rating Scale' },
    ],
    prompts: [
      'Which purchase today felt the most "automatic"?',
      'What emotion was most expensive for you today?',
      'Could you have waited 24 hours to buy it?',
    ],
  },
  {
    id: 'sugar-sobriety',
    title: 'Sugar Sobriety',
    badge: 'Metabolic',
    category: 'Health',
    duration: 14,
    description:
      'Eliminate all added sugars for 14 days. Observe the stabilization of energy levels and changes in palate sensitivity.',
    hypothesis: 'Frequent sugar consumption creates energy spikes and crashes that mask true physiological energy levels.',
    metrics: [
      { name: 'Energy Stability', type: 'Rating Scale' },
      { name: 'Cravings Intensity', type: 'Rating Scale' },
      { name: 'Mood Balance', type: 'Rating Scale' },
    ],
    prompts: [
      'Where did you encounter hidden sugar today?',
      'Did you notice an afternoon energy slump?',
      'How did your first meal of the day taste compared to yesterday?',
    ],
  },
  {
    id: 'cold-exposure-reboot',
    title: 'Cold Exposure Reboot',
    badge: 'Resilience',
    category: 'Health',
    duration: 7,
    description:
      'End every shower with 2 minutes of cold water. Track your stress response and post-shower cognitive alertness.',
    hypothesis: 'Deliberate cold exposure builds autonomic resilience and increases dopamine levels for hours after exposure.',
    metrics: [
      { name: 'Post-Cold Alertness', type: 'Rating Scale' },
      { name: 'Willpower Score', type: 'Rating Scale' },
      { name: 'Recovery Feel', type: 'Rating Scale' },
    ],
    prompts: [
      'How long did you stay under the cold water?',
      'What was your immediate thought when the water hit your skin?',
      'How long did the "alertness boost" last?',
    ],
  },
];
