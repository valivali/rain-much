# React + TypeScript + Vite Boilerplate

A production-ready boilerplate for React applications with TypeScript, featuring essential development tools and best practices.

## ✨ Features

### Core Technologies

- ⚡ **Vite 7** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with new features
- 🔷 **TypeScript 5.8** - Type safety and better developer experience
- 🎨 **Sass** - Enhanced CSS with variables and mixins
- 🧭 **React Router** - Client-side routing

### Development Tools

- 🔍 **ESLint** - Code linting with TypeScript-aware rules and type checking
- 💅 **Prettier** - Code formatting integrated with ESLint
- 🧪 **Jest** - Testing framework with React Testing Library setup
- 📦 **Bundle Analyzer** - Analyze bundle size and composition
- 🪝 **lint-staged** - Pre-commit code quality checks

### Developer Experience

- 🛡️ **Error Boundaries** - Graceful error handling with user-friendly fallbacks
- 📁 **Absolute Imports** - Clean import paths with `@/` aliases
- 🔧 **Environment Variables** - Configurable app settings with example template
- 📋 **TypeScript Project References** - Optimized build performance

## 🚀 Getting Started

### Prerequisites

- Node.js 20.18.0+ (see `.nvmrc` file)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd your-project-name

# Install dependencies
npm install

# Copy environment variables template
cp env.example .env

# Start development server
npm run dev
```

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run preview          # Preview production build

# Building
npm run build            # Build for production

# Code Quality
npm run lint             # Run ESLint with TypeScript type checking
npm run lint:fix         # Fix ESLint errors automatically

# Testing
npm run test             # Run Jest tests
```

## 🔧 Configuration

### Environment Variables

The boilerplate includes an `env.example` file with common configuration options:

```env
# Application Configuration
VITE_APP_TITLE=My App
VITE_APP_VERSION=1.0.0

# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEV_TOOLS=true
```

Copy this to `.env` and customize for your project.

### Absolute Imports

The project is configured with path aliases for cleaner imports:

```typescript
// Instead of relative imports
import ErrorBoundary from "../../components/general/ErrorBoundary"

// Use absolute imports
import ErrorBoundary from "@/components/general/ErrorBoundary"
```

Available aliases:

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/pages/*` → `src/pages/*`
- `@/hooks/*` → `src/hooks/*`
- `@/contexts/*` → `src/contexts/*`

### ESLint Configuration

The boilerplate includes a comprehensive ESLint setup with:

- TypeScript-aware rules with type checking
- React and React Hooks rules
- Import sorting and unused import cleanup
- Prettier integration for consistent formatting

### Error Boundaries

The boilerplate includes a production-ready error boundary component that:

- Catches JavaScript errors in React components
- Displays user-friendly error messages
- Shows detailed error information in development
- Provides a reload button for recovery

## 🧪 Testing

### Test Setup

- Jest configured for TypeScript and React
- React Testing Library for component testing
- DOM mocking for browser APIs (IntersectionObserver, ResizeObserver, matchMedia)

### Writing Tests

```typescript
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import MyComponent from "./MyComponent"

// Wrap components that use React Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe("MyComponent", () => {
  it("renders correctly", () => {
    renderWithRouter(<MyComponent />)
    expect(screen.getByText("Hello world!")).toBeInTheDocument()
  })
})
```

## 🏗️ Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, optimized for production deployment.

## 📁 Project Structure

```
src/
├── components/
│   ├── general/        # Reusable UI components (ErrorBoundary)
│   └── layout/         # Layout-specific components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Page-level components
├── App.tsx             # Main app component with routing
├── main.tsx            # Application entry point
└── setupTests.ts       # Jest test configuration
```

## 🔄 Development Workflow

### Code Quality

The project enforces code quality through:

- **lint-staged**: Runs linting and formatting on staged files
- **TypeScript**: Strict type checking with comprehensive compiler options
- **ESLint**: Advanced rules including type-aware linting
- **Prettier**: Consistent code formatting

### Bundle Analysis

Analyze your production bundle:

```bash
# The bundle analyzer is integrated into Vite config
# Build in analyze mode to generate bundle report
npm run build -- --mode analyze
```

## 🎯 What's Included vs. What's Not

### ✅ Included

- Essential development tools and configurations
- Error handling and debugging setup
- Testing infrastructure with mocking
- TypeScript configuration optimized for React
- Build optimization and analysis tools
- Environment variable management

### ❌ Not Included (Intentionally Flexible)

- Specific UI component libraries
- State management solutions (Redux, Zustand, etc.)
- CSS frameworks (Tailwind, Material-UI, etc.)
- Additional testing libraries (Playwright, Cypress)
- Deployment configurations
- Database or backend integrations

This keeps the boilerplate flexible for various project requirements while providing a solid foundation.

## 🤝 Usage Tips

1. **Start Clean**: Remove unused folders in `src/components/`, `src/pages/`, etc.
2. **Environment Setup**: Configure `.env` file for your specific needs
3. **Error Boundaries**: Wrap route components with the ErrorBoundary for better UX
4. **Type Safety**: Leverage the strict TypeScript configuration for better code quality

## 📄 License

This project is licensed under the MIT License.
