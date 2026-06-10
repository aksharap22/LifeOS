# Data Model: LifeOS Experimentation Platform

## User
Represents a registered LifeOS user.

### Fields
- `id`: UUID (Primary Key)
- `name`: String
- `email`: String (Unique)
- `passwordHash`: String
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Relationships
- One User can create many Experiments
- One User can have many Daily Logs
- One User has one Personal Operating Manual

---

## Experiment
Represents a lifestyle experiment.

### Fields
- `id`: UUID (Primary Key)
- `userId`: UUID (FK)
- `title`: String
- `description`: String
- `hypothesis`: String
- `category`: Enum (Productivity, Health, Sleep, Social, Emotional, Attention, Growth, Custom)
- `duration`: Integer (Days)
- `status`: Enum (Draft, Active, Completed, Cancelled)
- `startDate`: Date
- `endDate`: Date
- `createdAt`: Timestamp

### Relationships
- One Experiment contains many Metrics
- One Experiment contains many Daily Logs
- One Experiment can generate many Insights

---

## Metric
Represents measurable data within an experiment.

### Fields
- `id`: UUID (Primary Key)
- `experimentId`: UUID (FK)
- `name`: String (e.g., "Mood Score", "Sleep Hours")
- `type`: Enum (Numeric, Boolean, Rating Scale, Duration, Percentage, Text)
- `unit`: String (Optional, e.g., "hours", "ml")

---

## Daily Log
Stores daily observations, acting as a container for metric entries.

### Fields
- `id`: UUID (Primary Key)
- `userId`: UUID (FK)
- `experimentId`: UUID (FK)
- `date`: Date
- `notes`: Text

### Relationships
- Contains multiple Metric Entries

---

## Metric Entry
Stores specific values for a metric on a given day.

### Fields
- `id`: UUID (Primary Key)
- `dailyLogId`: UUID (FK)
- `metricId`: UUID (FK)
- `value`: EncryptedString (FLE)

---

## Insight
Generated after AI analysis of completed or ongoing experiments.

### Fields
- `id`: UUID (Primary Key)
- `experimentId`: UUID (FK)
- `title`: String
- `description`: Text
- `confidenceScore`: Float (0.0 - 1.0)
- `createdAt`: Timestamp

### Examples
- "Sleep above 7.5 hours improves productivity by 18%"
- "Social media usage correlates with lower focus"

---

## Personal Operating Manual
Dynamic user profile generated from validated insights.

### Fields
- `id`: UUID (Primary Key)
- `userId`: UUID (FK)
- `summary`: Text
- `recommendations`: JSON (List of actionable rules)
- `confidenceLevel`: Float
- `updatedAt`: Timestamp

### Content Areas
- Best sleep schedule
- Productivity patterns
- Emotional triggers
- Focus recommendations
- Lifestyle recommendations
