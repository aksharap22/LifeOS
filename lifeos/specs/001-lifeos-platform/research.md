# Research: LifeOS Experimentation Platform

## 1. Existing Solutions

### Daylio
- **Strengths**: Mood tracking, daily journaling.
- **Limitations**: No experiment framework, no hypothesis testing.

### Habitify
- **Strengths**: Habit tracking, streak management.
- **Limitations**: Measures consistency only; does not evaluate effectiveness.

### Exist.io
- **Strengths**: Correlation analysis, personal data insights.
- **Limitations**: Complex onboarding, limited experiment workflow.

### Bearable
- **Strengths**: Health and symptom tracking, correlation discovery.
- **Limitations**: Focused mainly on health.

---

## 2. Identified Gap

Current products answer: "Did you complete your habit today?"
**LifeOS answers: "Did this habit actually improve your life?"**

---

## 3. Differentiators

### Structured Experiments
Users create hypotheses and test them over time.
- **Example**: Hypothesis: Sleeping 8 hours improves focus.

### AI-Powered Insights
The system identifies patterns and generates recommendations.
- **Example**: Users are 22% more productive after sleeping more than 7 hours.

### Personal Operating Manual
LifeOS continuously builds a personalized guide using completed experiments.

---

## 4. Flagship Experiments

- **Dead Time Audit**: Identify where time is being wasted.
- **News Blackout**: Test impact of news consumption on mood/productivity.
- **The 90 Second Rule**: Process emotions/urges before acting.
- **Compliment Blackout**: Observe social dynamics.
- **Async Life Week**: Maximize asynchronous communication.
- **One Hard Thing Daily**: Build resilience.
- **Say No Week**: Test the impact of boundary setting.
- **Comparison Detox**: Reduce social media comparison.

---

## 5. Expected Impact

LifeOS helps users:
- Improve productivity and self-awareness.
- Reduce stress.
- Build evidence-based habits.
- Understand personal behavioral patterns.

Instead of following generic advice, users discover what works specifically for them.

---

## 6. Technical Implementation Decisions

### AI Insight Generation & Operating Manual
- **Decision**: Use OpenAI's GPT-4o with structured JSON output.
- **Rationale**: Superior reasoning for identifying correlations and ensuring the Operating Manual is programmatically versioned.

### Data Privacy & Security
- **Decision**: Implement Field-Level Encryption (FLE) for sensitive metrics and use Argon2 for password hashing.
- **Rationale**: Complies with the "Data Privacy First" mandate for sensitive habit/health data.

### Mobile-First Visualization
- **Decision**: Use `Recharts` with responsive containers.
- **Rationale**: Optimized for touch interactions and high-level trend visualization on mobile devices.

### Custom Metrics Pattern
- **Decision**: Use a "Dynamic Schema" pattern in MongoDB.
- **Rationale**: Supports highly dynamic user-defined metrics (Boolean, Scale, Duration) without complex migrations.
