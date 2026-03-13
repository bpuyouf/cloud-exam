# Cloud Exam Backend

A Node.js backend for the Cloud Exam application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values:
   ```bash
   cp .env.example .env
   ```

3. Initialize the database:
   ```bash
   npm run db:init
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user