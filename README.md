# Job Tracker


A full-stack MERN app to track job applications, follow-ups, and basic analytics.


## Tech
- React + Vite + TypeScript
- Express + TypeScript + Mongoose
- JWT auth, Zod validation


## Running locally
1. Copy `.env.example` to `server/.env` and `client/.env` and fill values.
2. `npm install`
3. `npm run dev`


## API
Base: `/api/v1`
- `POST /auth/register` `{ name, email, password }`
- `POST /auth/login` `{ email, password }`
- `GET /auth/me` (Bearer token)
- `POST /applications` `{ company, role, ... }`
- `GET /applications`


## Roadmap
- Filters, pagination, charts
- Email reminders (cron)
- Kanban board
- CSV import/export
