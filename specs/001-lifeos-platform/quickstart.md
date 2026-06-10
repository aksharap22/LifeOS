# Quickstart: LifeOS Development

## Prerequisites
- Node.js v20+
- MongoDB (Local or Atlas)
- OpenAI API Key

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd lifeos
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   cp .env.example .env # Fill in MONGODB_URI and OPENAI_API_KEY
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Development Workflow
- **Frontend**: Runs on `http://localhost:3000`
- **Backend**: Runs on `http://localhost:5000`
- **API Documentation**: Available at `http://localhost:5000/api-docs` (Swagger)

## Testing
- Run all tests: `npm test` (from root)
- Frontend unit tests: `cd frontend && npm test`
- Backend API tests: `cd backend && npm test`
