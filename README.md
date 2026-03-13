# Cloud Exam

A web application for managing users, with the database hosted on a separate MySQL server.

## Structure

- `backend/` - Node.js Express server with MySQL database
- `frontend/` - Simple HTML/CSS/JS frontend

## Setup

1. Navigate to the backend directory and follow the setup instructions in `backend/README.md`.

2. The frontend will be served by the backend at `http://localhost:3000`.

## Database

The database is hosted on a separate MySQL server. The server ID is configured in `backend/.env` as `DB_SERVER_ID`.