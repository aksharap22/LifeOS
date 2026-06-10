# Tasks: LifeOS Experimentation Platform

**Input**: Design documents from `specs/001-lifeos-platform/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize backend Node.js/TypeScript project in `backend/`
- [x] T002 Initialize frontend React/TypeScript project in `frontend/`
- [x] T003 [P] Configure ESLint and Prettier for both `backend/` and `frontend/`
- [x] T004 [P] Setup environment variable templates in `backend/.env.example` and `frontend/.env.example`
- [x] T005 Install core dependencies (Express, Mongoose, OpenAI, Tailwind CSS, Recharts)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and authentication required for all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Setup MongoDB connection and Mongoose configuration in `backend/src/config/db.ts`
- [x] T007 [P] Create User model in `backend/src/models/User.ts`
- [x] T008 [P] Implement password hashing and JWT utilities in `backend/src/utils/auth.ts`
- [x] T009 Implement Register and Login controllers in `backend/src/api/auth.ts`
- [x] T010 [P] Create JWT authentication middleware in `backend/src/middleware/auth.ts`
- [x] T011 Setup basic Express router and error handling in `backend/src/index.ts`
- [x] T012 [P] Configure Tailwind CSS in `frontend/tailwind.config.js` and `frontend/src/index.css`
- [x] T013 Setup React Router and basic layout in `frontend/src/App.tsx`
- [x] T014 [P] Implement API client utility with auth headers in `frontend/src/services/api.ts`

**Checkpoint**: Foundation ready - Authentication is functional, and project structure is established.

---

## Phase 3: User Story 1 - Experiment Creation & Tracking (Priority: P1) 🎯 MVP

**Goal**: Allow users to create experiments with hypotheses and log daily metrics.

**Independent Test**: Create a "Sleep" experiment, log a daily entry, and verify the data in the database.

- [x] T015 [P] [US1] Create Experiment model in `backend/src/models/Experiment.ts`
- [x] T016 [P] [US1] Create MetricDefinition and DailyLog models in `backend/src/models/`
- [x] T017 [P] [US1] Create MetricEntry model with Field-Level Encryption logic in `backend/src/models/MetricEntry.ts`
- [x] T018 [US1] Implement Create and List Experiment endpoints in `backend/src/api/experiments.ts`
- [x] T019 [US1] Implement Daily Log and Metric Entry endpoints in `backend/src/api/metrics.ts`
- [x] T020 [P] [US1] Create Experiment creation form in `frontend/src/pages/CreateExperiment.tsx`
- [x] T021 [US1] Implement Dashboard showing active experiments in `frontend/src/pages/Dashboard.tsx`
- [x] T022 [US1] Create Daily Log entry form in `frontend/src/components/DailyLogForm.tsx`
- [x] T023 [US1] Integrate frontend forms with backend experiment and metric APIs

**Checkpoint**: MVP Ready - Users can create experiments and track metrics daily.

---

## Phase 4: User Story 2 - Comparative Analytics & Dashboards (Priority: P2)

**Goal**: Provide visualizations and statistical comparisons of experiment data.

**Independent Test**: Navigate to an experiment's results page and view a Recharts comparison chart.

- [x] T024 [US2] Implement analytics service for metric comparison in `backend/src/services/analytics.ts`
- [x] T025 [US2] Create Experiment Results endpoint in `backend/src/api/experiments.ts` (GET `/experiments/:id/results`)
- [x] T026 [P] [US2] Setup Recharts wrappers for time-series and comparison charts in `frontend/src/components/charts/`
- [x] T027 [US2] Create Experiment Results page in `frontend/src/pages/Results.tsx`
- [x] T028 [US2] Implement trend charts for individual metrics in the dashboard

**Checkpoint**: Analytics ready - Users can see evidence of their experiment outcomes.

---

## Phase 5: User Story 3 - AI Insights & Personal Operating Manual (Priority: P3)

**Goal**: Generate AI-powered insights and maintain a dynamic Personal Operating Manual.

**Independent Test**: Trigger an insight generation and verify the Operating Manual updates with a new "Validated Truth".

- [x] T029 [P] [US3] Create Insight, OperatingManual, and ManualVersion models in `backend/src/models/`
- [x] T030 [US3] Implement OpenAI service for insight generation in `backend/src/services/ai.ts`
- [x] T031 [US3] Create Generate Insights endpoint in `backend/src/api/ai.ts`
- [x] T032 [US3] Implement Operating Manual retrieval and versioning logic in `backend/src/api/manual.ts`
- [x] T033 [US3] Implement "Convert to Experiment" logic for AI recommendations (FR-005)
- [x] T034 [P] [US3] Create Insights Dashboard in `frontend/src/pages/Insights.tsx`
- [x] T035 [US3] Create Personal Operating Manual view in `frontend/src/pages/Manual.tsx`
- [x] T036 [US3] Add interactive "Convert to Experiment" UI in insights cards

**Checkpoint**: Full Platform ready - AI generates value from user data and builds the Operating Manual.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Production readiness and alignment with LifeOS Constitution

- [x] T037 [P] Privacy audit: Verify FLE and HttpOnly cookie security (Constitution I)
- [x] T038 [P] Mobile-First validation: Test UI responsiveness and logging speed (Constitution VII)
- [x] T039 Implement data export and account deletion features (Constitution V)
- [x] T040 Final code cleanup and documentation update in `README.md`
- [x] T041 Setup deployment scripts for Vercel (frontend) and Render (backend)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 completion.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Stories 2 & 3 (Phases 4 & 5)**: Depend on Phase 3 data (Experiments & Logs) being available.
- **Polish (Phase N)**: Depends on all user stories being functionally complete.

### User Story Dependencies

- **User Story 2**: Needs logged data from US1 to visualize.
- **User Story 3**: Needs data from US1 to analyze and build insights.

### Parallel Opportunities

- T001 and T002 (Project initialization)
- T007, T008, T010 (Auth foundational pieces)
- T012, T013, T014 (Frontend foundational pieces)
- T015, T016, T017 (Data models within US1)
- T026 and T024 (Analytics frontend vs backend)
- T029 and T030 (AI models vs service logic)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (MVP)
4. **VALIDATE**: Ensure a user can register, create an experiment, and log data.

### Incremental Delivery

1. Deploy MVP to gather initial data.
2. Add Analytics (US2) to provide immediate feedback to users.
3. Add AI Insights (US3) as the differentiator once enough data is collected.
