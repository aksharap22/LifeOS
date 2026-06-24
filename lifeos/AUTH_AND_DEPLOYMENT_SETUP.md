# LifeOS Auth and Free API Setup

This app does not need a paid authentication provider. Authentication is handled by the existing Express backend with:

- Email and password registration
- Bcrypt password hashing
- JWT session tokens
- MongoDB Atlas for user/challenge/log storage

## Free Services Used

### 1. MongoDB Atlas Free Cluster

Use this for the database.

Where to get it:

1. Go to https://www.mongodb.com/products/platform/atlas-database
2. Sign up or log in.
3. Create a new project.
4. Create a cluster and choose the free `M0` cluster tier.
5. Create a database user.
6. In Network Access, add the backend host IP if you know it. For student/demo deployments, you can temporarily allow `0.0.0.0/0`, but tighten this later.
7. Click Connect, choose Drivers, and copy the MongoDB connection string.

Set this backend environment variable:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/lifeos
```

Replace `<username>`, `<password>`, and `<cluster-url>` with your Atlas values.

### 2. JWT Secret

This is not an external API. It is just a long random string used to sign login tokens.

Generate one locally:

```bash
openssl rand -base64 32
```

Set this backend environment variable:

```bash
JWT_SECRET=<paste-generated-secret-here>
```

### 3. Free Backend Hosting

The frontend is on Vercel, but the login system also needs the Express backend running somewhere.

One free option is Render Web Service.

Where to get it:

1. Go to https://render.com
2. Sign up with GitHub.
3. New -> Web Service.
4. Connect `aksharap22/LifeOS`.
5. Use these settings:

```text
Root Directory: lifeos/backend
Build Command: npm ci && npm run build
Start Command: npm start
```

6. Add backend environment variables:

```text
MONGODB_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<your generated secret>
```

7. Deploy and copy the Render URL. It will look like:

```text
https://lifeos-backend.onrender.com
```

The API base URL is that URL plus `/api/v1`:

```text
https://lifeos-backend.onrender.com/api/v1
```

Note: free Render web services can sleep when idle, so the first login request after inactivity can take around a minute.

### 4. Vercel Frontend Environment Variable

The frontend must know where the backend API lives.

In Vercel:

1. Open your LifeOS project.
2. Go to Settings -> Environment Variables.
3. Add:

```text
VITE_API_URL=https://lifeos-backend.onrender.com/api/v1
```

4. Add it for Production and Preview.
5. Redeploy the frontend after adding it. Old deployments do not receive new environment variables automatically.

## Local Development

Backend:

```bash
cd lifeos/backend
npm install
npm run dev
```

Frontend:

```bash
cd lifeos/frontend
npm install
npm run dev
```

For local frontend development, create `lifeos/frontend/.env.local`:

```bash
VITE_API_URL=http://localhost:5001/api/v1
```

For local backend development, create `lifeos/backend/.env`:

```bash
MONGODB_URI=mongodb://localhost:27017/lifeos
JWT_SECRET=dev-only-change-me
```

## Auth Endpoints

Register:

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Akshara",
  "email": "akshara@example.com",
  "password": "password123"
}
```

Login:

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "akshara@example.com",
  "password": "password123"
}
```

Both endpoints return:

```json
{
  "_id": "user-id",
  "name": "Akshara",
  "email": "akshara@example.com",
  "token": "jwt-token"
}
```

Protected requests must send:

```http
Authorization: Bearer <jwt-token>
```

The frontend already stores the token in `localStorage` and attaches it through the Axios interceptor.

## Current MVP Scope

The MVP does not require a paid AI API. The app now supports:

- Free email/password auth through your backend
- Challenge templates
- Accepting a challenge as an active experiment
- Daily metric logging
- Reflection prompts

For the Dead Time Audit, AI categorization can be added later. For now, the free MVP can ask the user to choose the reason manually: boredom, habit, anxiety, notification, or genuine need.
