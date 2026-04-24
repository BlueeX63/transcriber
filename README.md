# Transcriber - AI Audio Transcription Platform

Transcriber is a full-stack, production-ready web application built with Next.js 16. It leverages Google's advanced **Gemini 2.5 Flash** AI model to automatically transcribe large audio files into highly accurate text. It features a secure administrative dashboard, a persistent PostgreSQL database using Prisma ORM, and robust JSON Web Token (JWT) authentication.

## Features
- **AI-Powered Transcription:** Upload audio files directly from the browser to Google's Gemini AI for fast and incredibly accurate text transcription.
- **Secure Admin Portal:** Protected by server-side Edge Middleware, ensuring that only authorized users can upload audio or view past transcriptions.
- **Persistent Storage:** All transcriptions are securely saved to a PostgreSQL database, making them searchable and accessible at any time.
- **Beautiful UI:** A fully responsive, modern design using Tailwind CSS with glassmorphism effects, micro-animations, and interactive modals.
- **Optimized Performance:** Built on Next.js 16 App Router (Turbopack) with a highly optimized global Prisma connection pool to prevent database exhaustion.

---

## Local Development Setup

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following variables:
```env
# Database
DATABASE_URL="postgresql://username:password@your-database-host:port/database_name"

# AI Integration
GEMINI_API_KEY="your_google_gemini_api_key"

# Security
JWT_SECRET="a_very_long_secure_random_string"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="securepassword123"
```

### 3. Install Dependencies & Setup Database
```bash
# Install NPM packages
npm install

# Push the database schema to your PostgreSQL instance
npx prisma db push

# Generate the Prisma Client
npx prisma generate
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying on Railway

This application is fully optimized for deployment on [Railway](https://railway.app/). Railway's Nixpacks build system will automatically detect the Next.js framework and build it seamlessly.

### Step-by-Step Deployment

1. **Push to GitHub:**
   Make sure your code is pushed to a GitHub repository.

2. **Create a Railway Project:**
   - Go to your Railway Dashboard.
   - Click **New Project** -> **Deploy from GitHub repo**.
   - Select your `Transcriber` repository.

3. **Add a PostgreSQL Database (If you don't already have one):**
   - In your Railway project, click **New** -> **Database** -> **Add PostgreSQL**.
   - Railway will provision a database instantly.

4. **Set Environment Variables:**
   Click on your web service, navigate to the **Variables** tab, and securely add:
   - `DATABASE_URL` (If you provisioned a DB on Railway, it provides this automatically, otherwise paste your external connection string).
   - `GEMINI_API_KEY` (Your Google AI Studio API key).
   - `JWT_SECRET` (A strong, random secret key).
   - `ADMIN_USERNAME` (Your desired login username).
   - `ADMIN_PASSWORD` (Your desired login password).

5. **Build & Deploy:**
   Railway will automatically trigger a build once the variables are set.
   - The custom `"postinstall": "prisma generate"` script inside `package.json` guarantees that your database schema client is built correctly during deployment.
   - Railway handles the start command automatically for Next.js (`npm run start`).

6. **Generate a Public URL:**
   - Navigate to the **Settings** tab of your web service on Railway.
   - Click **Generate Domain** under the Environments section to get your live, secure HTTPS URL!

---

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database ORM:** Prisma 7 + PostgreSQL Adapter
- **AI Integration:** `@google/generative-ai` (Gemini 2.5 Flash)
- **Authentication:** `jose` (Server-side JWT processing)
- **Styling:** Tailwind CSS v4
