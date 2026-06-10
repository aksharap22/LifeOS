# Feature Specification: LifeOS Experimentation Platform

**Feature Branch**: `001-lifeos-platform`

**Created**: 2026-06-10

**Status**: Draft

## Clarifications

### Session 2026-06-10
- User requested explicit support for: Sleep, Productivity, Exercise, and Custom Experiments.
- **Q1: Custom Experiments Scope** → **A: Fully Custom Metrics**. Users can define custom metric names and types (Numeric, Boolean, Rating, Duration, Percentage, Text) and combine them with predefined metrics. AI must analyze both.
- **Q2: Personal Operating Manual Generation** → **A: Live Dynamic Document**. The manual updates automatically with key insights (sleep, productivity, etc.), confidence levels, and historical versioning.
- **Q3: AI Recommendation Interactivity** → **A: Conversion to Experiment**. AI recommendations can be converted into new experiments with one click, auto-populating the hypothesis, duration, and metrics.

**Input**: User description: "Build LifeOS, an AI-powered personal experimentation platform. Users should be able to: - Create experiments - Define hypotheses - Track daily metrics - Compare experiment outcomes - Generate personalized insights - View dashboards and charts - Receive AI recommendations Metrics should include: - Mood - Energy - Productivity - Sleep - Exercise - Screen Time Example experiments: - Morning vs Night Study - No Social Media Challenge - Daily Exercise Challenge - 6 Hours vs 8 Hours Sleep The system should generate a Personal Operating Manual based on completed experiments. Focus on user value and requirements only. Do not decide technology yet."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Experiment Creation & Tracking (Priority: P1)

As a health-conscious user, I want to create a structured experiment with a specific hypothesis so that I can objectively test if a lifestyle change improves my well-being.

**Why this priority**: This is the core engine of the platform. Without the ability to define and track experiments, the platform has no data to analyze.

**Independent Test**: Can be fully tested by creating a "6 Hours vs 8 Hours Sleep" experiment, logging daily sleep and energy metrics for 7 days, and verifying the data is persisted correctly.

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** I click "New Experiment" and enter a hypothesis ("8 hours of sleep increases my productivity"), **Then** the experiment should be active and visible.
2. **Given** an active experiment, **When** I log my daily metrics (Mood, Energy, Productivity), **Then** these entries should be linked to the active experiment.

---

### User Story 2 - Comparative Analytics & Dashboards (Priority: P2)

As an analytical user, I want to view charts comparing my performance across different experiment phases so that I can see clear evidence of what works for me.

**Why this priority**: Provides the "Evidence-Based" value promised in the Constitution.

**Independent Test**: After completing an experiment, the user can navigate to the "Results" tab and see a comparison chart between the "Control" and "Test" phases.

**Acceptance Scenarios**:

1. **Given** a completed experiment, **When** I view the comparison dashboard, **Then** I should see a visualization of the primary metrics (e.g., Productivity) for both phases.
2. **Given** multiple experiments, **When** I compare two different challenges (e.g., No Social Media vs. Daily Exercise), **Then** the system should show relative impact on my baseline metrics.

---

### User Story 3 - AI Insights & Personal Operating Manual (Priority: P3)

As a long-term user, I want the system to synthesize my experiment results into a "Personal Operating Manual" so that I have a high-level guide on how to optimize my life.

**Why this priority**: Delivers the final "Personalized Insights" and "Explainable" value.

**Independent Test**: After 3 completed experiments, the system generates a summary document stating "You are 20% more productive when you sleep 8 hours vs 6 hours."

**Acceptance Scenarios**:

1. **Given** three or more completed experiments, **When** I access my "Operating Manual", **Then** I should see a list of "Validated Truths" about my productivity and health.
2. **Given** a new insight, **When** I click for details, **Then** the system should explain the evidence-based rationale behind the recommendation.

### Edge Cases

- **Incomplete Metric Logging**: How the system handles days where the user only logs partial metrics (e.g., forgets Sleep but logs Mood).
- **Abnormal Data Points**: Handling outliers in metric tracking (e.g., 24 hours of screen time due to a device error) to prevent skewing AI insights.
- **Overlapping Experiments**: Constraints or behavior when a user tries to start two experiments that track the same metric simultaneously.
- **Data Sync Conflicts**: Resolving differences between offline logs on mobile and server-side state.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to define experiments with a title, hypothesis, duration, and target metrics.
- **FR-002**: System MUST support daily metric tracking for:
  - **Core Metrics**: Mood, Energy, Productivity, Sleep, Exercise, and Screen Time.
  - **Custom Metrics**: User-defined metrics with support for Numeric, Boolean (Yes/No), Rating Scale (1-10), Duration, Percentage, and Text Notes.
- **FR-003**: [EVIDENCE-BASED] System SHOULD provide statistical comparison of metrics between different experiment states (e.g., before/after or A/B).
- **FR-004**: System MUST allow users to view time-series dashboards for all tracked metrics.
- **FR-005**: System SHOULD generate AI-powered recommendations based on correlations found in the data (e.g., "High screen time correlates with low energy").
  - **Actionability**: Users MUST be able to convert a recommendation into a new experiment with one click.
  - **Auto-population**: Generated experiments MUST include a suggested hypothesis, duration, and recommended metrics.
  - **Customization**: Users MUST be able to modify any generated experiment before starting it.
- **FR-006**: System MUST generate a "Personal Operating Manual" as a live dynamic document that:
  - Updates automatically as new experiment results and validated insights become available.
  - Displays optimal sleep schedules, productivity windows, and lifestyle recommendations.
  - Includes confidence levels for each recommendation based on data volume and consistency.
  - Tracks changes over time and allows users to view historical versions of the manual.
- **FR-007**: System MUST support specialized experiment types for Sleep, Productivity, and Exercise, as well as "Challenge" templates and "Custom Experiments".
- **FR-008**: System MUST allow users to combine core metrics with custom metrics within a single experiment.
- **FR-009**: AI insights MUST analyze correlations between both core and custom metrics.

### Key Entities

- **Experiment**: Represents a structured test (Hypothesis, Status, Start Date, End Date).
- **MetricDefinition**: Defines a custom metric (Name, Type, Unit, UserID).
- **MetricEntry**: A daily log of specific values (DefinitionID/Type, Value, Timestamp, UserID).
- **Insight**: A correlation or conclusion derived from data (Summary, Confidence Score, EvidenceLinks).
- **OperatingManual**: A persistent collection of validated insights for a specific user.
- **ManualVersion**: A snapshot of the Operating Manual at a point in time to track evolution.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete a daily metric log (all 6 metrics) in under 30 seconds.
- **SC-002**: 80% of completed experiments result in at least one "Explainable Insight" in the Personal Operating Manual.
- **SC-003**: Dashboards and charts load within 2 seconds on mobile connections.
- **SC-004**: 90% of users report that the AI recommendations are "accurate" or "helpful" after 4 weeks of use.

## Assumptions

- **Mobile-First**: Users will primarily interact via a mobile interface for daily tracking.
- **Data Retention**: All historical metric data is kept indefinitely to improve AI insight quality.
- **Privacy**: All AI processing is done with the primary goal of user data ownership (as per Constitution).
- **Offline Tracking**: Users may need to log data while offline; sync happens when a connection is restored.
