# Rain Much

A weather application that provides detailed weather forecasts and precipitation data visualization. Built with a modern monorepo architecture featuring a Node.js/Express backend and a React frontend.

## ✨ Features

- 🌤️ **Weather Forecasts** - Daily and hourly weather forecasts with temperature, humidity, wind speed, and weather codes
- 🌧️ **Precipitation Visualization** - Interactive charts showing hourly precipitation data
- 📍 **Geolocation Support** - Automatic location detection for personalized weather data
- 🔄 **Multiple Weather Providers** - Integration with OpenMeteo and Tomorrow.io APIs
- 📊 **Data Visualization** - Beautiful charts using Recharts for precipitation data
- ⚡ **Real-time Updates** - React Query for efficient data fetching and caching

## 🏗️ Architecture

This is a monorepo project with two main workspaces:

- **Backend** - Express.js API server with TypeScript
- **Frontend** - React application with Vite, TypeScript, and React Query

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0+ (see `package.json` engines)
- npm 9.0.0+
- Tomorrow.io API key (optional, for enhanced weather data)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd rain-much

# Install all dependencies (root, backend, and frontend)
npm run install:all
```

### Environment Setup

#### Backend

```bash
cd backend
cp env.example .env
```

Edit `backend/.env`:
```env
PORT=3001
NODE_ENV=development
TOMORROW_API_KEY=your_tomorrow_api_key_here
```

#### Frontend

```bash
cd frontend
cp env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000
```

### Running the Application

```bash
# From the root directory, run both backend and frontend concurrently
npm run dev

# Or run them separately:
npm run dev:backend   # Backend only (http://localhost:3001)
npm run dev:frontend  # Frontend only (http://localhost:5173)
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📜 Available Scripts

### Root Level

```bash
npm run dev              # Run both backend and frontend concurrently
npm run dev:backend      # Run backend only
npm run dev:frontend     # Run frontend only
npm run build            # Build both backend and frontend
npm run build:backend    # Build backend only
npm run build:frontend   # Build frontend only
npm run install:all      # Install dependencies for all workspaces
npm run lint             # Lint all workspaces
npm run lint:fix         # Fix linting issues in all workspaces
```

### Backend

```bash
cd backend
npm run dev              # Start development server with hot reload
npm run build            # Build for production
npm run start            # Run production build
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
```

### Frontend

```bash
cd frontend
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run test             # Run Jest tests
```

## 🔧 Configuration

### Backend API Endpoints

- `GET /` - API health check
- `GET /health` - Health status endpoint
- `GET /api/weather/forecast` - Get weather forecast
  - Query params: `lat`, `lon`
- `GET /api/weather/hourly-precipitation` - Get hourly precipitation data
  - Query params: `lat`, `lon`

### Weather Providers

The backend supports multiple weather data providers:

- **OpenMeteo** - Free weather API (no API key required)
- **Tomorrow.io** - Enhanced weather data (requires API key)

The system automatically falls back to OpenMeteo if Tomorrow.io is unavailable or not configured.

## 📁 Project Structure

```
rain-much/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration (env, etc.)
│   │   ├── controllers/     # Request handlers
│   │   ├── mappers/         # Data transformation
│   │   ├── models/          # Data models and schemas
│   │   ├── providers/       # Weather API providers
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── server.ts        # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/             # API client and queries
│   │   ├── components/      # React components
│   │   │   ├── general/     # Reusable components
│   │   │   ├── Header/      # Header component
│   │   │   ├── RainChart/   # Precipitation chart
│   │   │   └── UI/          # UI primitives
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   └── package.json
└── package.json             # Root workspace config
```

## 🛠️ Tech Stack

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **Zod** - Schema validation
- **OpenMeteo SDK** - Weather data integration
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Recharts** - Data visualization
- **Sass** - CSS preprocessing

## 🧪 Testing

```bash
cd frontend
npm run test
```

The frontend includes Jest and React Testing Library for component testing.

## 🏗️ Building for Production

```bash
# Build both workspaces
npm run build

# Or build individually
npm run build:backend
npm run build:frontend
```

Production builds:
- Backend: `backend/dist/`
- Frontend: `frontend/dist/`

## 📄 License

This project is licensed under the MIT License.
