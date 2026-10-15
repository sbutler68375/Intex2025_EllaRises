# Ella Rises

A Node/Express web app for [Ella Rises](https://www.ellarises.org/), a nonprofit that encourages young women to pursue higher education and STEAM fields (science, technology, engineering, arts, and math) through mentoring, creative workshops, and leadership events. Built as a group project for BYU INTEX, Fall 2025 (Group 2-11).

Ella Rises measures its impact through post-event surveys (satisfaction, usefulness, and how likely participants are to recommend an event) and milestones participants reach over time, like graduating or getting a STEAM job. This app gives them one place to manage that data and see what's working.

## Features

- **Public pages** – landing page, account sign-up, and guest donations (no account needed).
- **Participants** – browse the event calendar, register for events, take post-event surveys, and donate.
- **Admins** – full create/view/edit/delete for:
  - Participants
  - Events (event types and scheduled dates), with attendance and no-show tracking
  - Post-event surveys
  - Milestones (each participant can have many)
  - Donations
  - User accounts and roles
- **Dashboard** – an embedded Tableau dashboard of survey results and long-term impact for Ella Rises leadership.
- **Security** – bcrypt-hashed passwords, session-based login, and admin-only pages.

Related analysis: [Google Colab notebook](https://colab.research.google.com/drive/1XN6XNvoruICsa3hCQJP3a7PIUZ_snCKX?usp=sharing) · [Tableau dashboard](https://public.tableau.com/views/INTEXideas/Dashboard1)

All data in this project is fake sample data.

## Team

- [Mike-31415](https://github.com/Mike-31415)
- [owenck](https://github.com/owenck)
- [brmeek](https://github.com/brmeek)
- [sbutler68375](https://github.com/sbutler68375)

## Tech stack

| Part | Technology |
|---|---|
| Server | Node.js, Express 5 |
| Pages | EJS templates, CSS |
| Database | PostgreSQL (Supabase), queried with Knex |
| Auth | express-session, bcrypt |
| Analytics | Tableau, Python (Google Colab) |

The database design is in `INTEX ERD.png`.

## Getting it running

### 1. Install the tools

- [Node.js](https://nodejs.org/) 20 or newer
- A free [Supabase](https://supabase.com) account (or any PostgreSQL database)

### 2. Create the database

1. In Supabase, create a new project and save the database password you choose.
2. Click **Connect** → **Session pooler** → **View parameters** to see your host, port, user, and database name.
3. Copy `.env.example` to `.env` (this file is gitignored, so your password stays off GitHub) and fill in those values. If your password contains `#` or other special characters, keep it wrapped in single quotes.
4. Install packages and build the database:
   ```bash
   npm install
   npm run db:setup
   ```
   This creates the 7 tables, loads the sample data (about 8,000 rows), and adds the demo logins. Running it again resets the database.

### 3. Start the app

```bash
npm start
```

Open http://localhost:3001.

### Demo logins

| Username | Password | Role |
|---|---|---|
| `admin` | `admin` | Admin – manages all data and users |
| `user` | `user` | Participant – a sample participant with events, surveys, milestones, and donations |

## Project structure

```
index.js         Express server: routes, login and role checks, database queries
views/           EJS pages
public/          CSS, images, and front-end libraries
database/        Setup script, schema + sample data, demo logins
```
