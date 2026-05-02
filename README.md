
# Real Estate Inventory Management

A full-stack real estate inventory management application with React frontend and Node.js/Express/SQLite backend.

This is a code bundle for Real Estate Inventory Management. The original project is available at https://www.figma.com/design/cGu4dN1EwvJsjwlxH0nNkn/Real-Estate-Inventory-Management.

## Features

- **Project Management**: Create and manage real estate projects with multiple buildings
- **Inventory Tracking**: Track flat availability, status, and assignments
- **Live Activity Feed**: Real-time updates on flat status changes
- **Analytics Dashboard**: Sales trends, revenue analysis, and performance metrics
- **Responsive Design**: Mobile-friendly interface with modern UI components

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, TypeScript, SQLite with better-sqlite3
- **UI Components**: Radix UI, Lucide Icons, Recharts for data visualization

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   npm run backend:install
   ```

3. Initialize the database:
   ```bash
   npm run backend:init
   ```

### Running the Application

Open two terminal windows:

1. **Start the backend** (port 4000):
   ```bash
   npm run backend:dev
   ```

2. **Start the frontend** (port 5173):
   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` to use the application.

## Available Scripts

### Frontend Scripts
- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run bootstrap` — install all dependencies (frontend + backend)

### Backend Scripts
- `npm run backend:install` — install backend dependencies
- `npm run backend:dev` — start backend in development mode
- `npm run backend:check` — run TypeScript type checking
- `npm run backend:init` — initialize SQLite database with sample data
- `npm run backend:start` — run production build

## API Endpoints

- `GET /api/projects` — list all projects
- `POST /api/projects` — create new project
- `GET /api/projects/:id` — get project details
- `PUT /api/projects/:id` — update project
- `DELETE /api/projects/:id` — delete project
- `GET /api/flats` — list flats (with optional projectId filter)
- `GET /api/flats/:id` — get flat details
- `PUT /api/flats/:id` — update flat status
- `GET /api/activities` — get activity feed
- `GET /api/analytics` — get analytics data

## Database

The application uses SQLite with the following structure:
- **Projects**: Real estate projects with building information
- **Buildings**: Towers within projects
- **Flats**: Individual units with status tracking
- **Activities**: Audit trail of status changes
- **Analytics**: Pre-computed sales and revenue data

Database file: `DB/realestate.db`
Schema file: `DB/schema.sql`

## Development

### Type Checking
- Frontend: `npx tsc --noEmit` (uses root `tsconfig.json`)
- Backend: `npm run backend:check`

### Project Structure
```
├── src/                    # Frontend React app
│   ├── app/
│   │   ├── api/           # API client functions
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── types.ts       # TypeScript type definitions
│   └── vite-env.d.ts      # Vite environment types
├── backend/               # Node.js/Express backend
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── db.ts          # Database connection
│   │   └── index.ts       # Express app setup
│   ├── scripts/           # Database initialization
│   └── package.json
├── DB/                    # SQLite database and schema
└── README.md
```

## Troubleshooting

- **Backend init fails**: Ensure backend dependencies are installed with `npm run backend:install`
- **Database issues**: Delete `DB/realestate.db` and rerun `npm run backend:init`
- **Frontend not loading data**: Confirm backend is running on `http://localhost:4000`
- **Type errors**: Run `npm run backend:check` for backend or `npx tsc --noEmit` for frontend
- **Port conflicts**: Backend runs on 4000, frontend on 5173

## Notes

- The frontend proxies `/api` requests to the backend automatically
- Sample data is seeded during database initialization
- All API responses follow a consistent `{ data: T }` format
- TypeScript is used throughout for type safety
  