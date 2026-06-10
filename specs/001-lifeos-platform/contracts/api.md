# API Contract: LifeOS

All endpoints prefixed with `/api/v1`. Auth required via Bearer JWT.

## Authentication

### POST `/auth/register`
Register a new user.
- **Request**: `{ email, password }`
- **Response**: `{ user, token }`

### POST `/auth/login`
- **Request**: `{ email, password }`
- **Response**: `{ user, token }`

## Experiments

### POST `/experiments`
Create a new experiment.
- **Request**: `{ title, hypothesis, metricDefinitions: UUID[], startDate, endDate }`
- **Response**: `Experiment` entity

### GET `/experiments`
List all experiments for the user.

### GET `/experiments/:id/results`
Get comparative results and AI insights for an experiment.

## Metrics

### POST `/metrics/definitions`
Create a custom metric definition.
- **Request**: `{ name, type, unit }`

### POST `/metrics/entries`
Log a daily metric value.
- **Request**: `{ definitionId, value, timestamp, experimentId? }`

### GET `/metrics/entries`
Query historical metric data.
- **Query Params**: `definitionId`, `startDate`, `endDate`

## AI & Operating Manual

### POST `/ai/generate-insights/:experimentId`
Manually trigger AI analysis for a completed experiment.

### GET `/operating-manual`
Retrieve the current live Personal Operating Manual.

### GET `/operating-manual/versions`
List historical versions of the manual.
