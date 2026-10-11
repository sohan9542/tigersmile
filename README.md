# TigerSmile

Client-side activity and schedule dashboard built with React and Vite.

**Live demo:** [https://tigersmile.vercel.app](https://tigersmile.vercel.app)

Author: [Sohanur Rahman](https://github.com/sohan9542)

## What it is

TigerSmile is a front-end demo of a role-based student/team productivity UI. Users can sign in with mock accounts, browse a calendar of activities by subject, track in-progress work, review simple reports, and manage team/message tables. All data is held in React context and browser `localStorage` — there is no backend API in this repository.

## Features

- Mock email/password authentication with role-based permissions (manager, admin, observer, viewer, support, focus)
- Home dashboard with greeting, today’s activities, and weekly summary widgets
- FullCalendar week/month/day/list views with optional subject filtering (`/calender?subject=…`)
- Activity CRUD table, weekly activity tracker (start/end), and completion report view
- Team member table and basic in-app messaging UI
- Notifications drawer fed by mock notification data

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 18, MUI, Tailwind CSS |
| Routing | React Router v6 |
| Charts / calendar | Recharts, FullCalendar |
| Tables | MUI X Data Grid |
| Tooling | Vite 5, ESLint 9, Prettier, Vitest |
| Hosting | Vercel |

## Architecture

```text
src/
  assets/          Mock users and subjects
  components/      Feature UI (Home, Calendar, Activity, Team, Message)
  constants/       Shared UI constants (toast settings)
  context/         Auth/session and app state provider
  data/            Mock activities and notifications
  helpers/         Pure date/activity helpers (unit tested)
  layout/          Shell: navbar, sidebars, authenticated layout
  pages/           Route-level screens
  theme.js         MUI theme
```

- `MyProvider` hydrates the signed-in user from `localStorage` (`skipthinkuser`) and exposes activities, users, and notifications through React context.
- Routes are declared in `src/App.jsx`. Existing pathnames (including `/calender`) are intentional and stable.
- There are no server routes; validation is limited to client-side form `required` attributes and mock credential checks on login.

## Demo accounts

Use any of these mock credentials on `/login`:

| Role | Email | Password |
| --- | --- | --- |
| manager | manager@gmail.com | manager123 |
| admin | admin@gmail.com | admin123 |
| observer | observer@gmail.com | observer123 |
| viewer | viewer@gmail.com | viewer123 |
| support | support@gmail.com | support123 |
| focus | focus@gmail.com | focust123 |

These are demo-only values checked in as fixture data for the UI, not production secrets.

## Local setup

Prerequisites: Node.js 20+ and npm.

```bash
git clone https://github.com/sohan9542/tigersmile.git
cd tigersmile
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Environment variables

Copy `.env.example` if you add Vite env vars later. The current app runs without any required environment variables.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the repo with Prettier |
| `npm run format:check` | Check Prettier formatting |
| `npm test` | Run Vitest unit tests once |
| `npm run test:watch` | Run Vitest in watch mode |

## Project structure

```text
.
├── .github/workflows/ci.yml   Install, lint, test, build
├── public/                    Static assets, logos, fonts
├── src/                       Application source (see Architecture)
├── .env.example               Env var names only
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Notes

- The Google sign-in button on the login page is presentational only; authentication is mock/local.
- Sidebar includes an `/update` link that is not wired to a route yet.
- Landing “Contact” points to `/contact`, which is not implemented in this SPA.
