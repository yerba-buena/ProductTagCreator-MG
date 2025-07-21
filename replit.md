# Product Management App

## Overview

This is a full-stack web application for managing products with barcode generation capabilities. The application consists of a React frontend built with Vite, an Express.js backend API, and uses PostgreSQL with Drizzle ORM for data persistence. The UI is built using shadcn/ui components with Tailwind CSS for styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Comprehensive set of Radix UI primitives wrapped in shadcn/ui

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **API Style**: RESTful API endpoints
- **Middleware**: JSON parsing, URL encoding, custom logging middleware
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Data Storage Solutions
- **Database**: PostgreSQL (configured for production)
- **ORM**: Drizzle ORM with TypeScript support
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing
- **Database Provider**: Neon Database (serverless PostgreSQL)

### Authentication and Authorization
- Currently using session-based architecture (connect-pg-simple for session storage)
- No authentication implementation present in current codebase

### Key Components

#### Database Schema
- **Products Table**: Contains id (serial), name (text), price (real), barcode (text), imageUrl (text)
- **Validation**: Zod schemas for input validation derived from Drizzle schema

#### API Endpoints
- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Retrieve specific product by ID
- `POST /api/products` - Create new product with validation

#### Frontend Features
- Product listing and management interface
- Barcode generation and display functionality
- File upload capabilities for product images
- Form validation with error handling
- Responsive design with mobile support
- Toast notifications for user feedback

## Data Flow

1. **Client Requests**: React components make API requests through TanStack Query
2. **API Processing**: Express.js routes handle requests, validate input with Zod schemas
3. **Data Layer**: Drizzle ORM interfaces with PostgreSQL database
4. **Response Handling**: API responses are cached and managed by TanStack Query
5. **UI Updates**: React components re-render based on query state changes

## External Dependencies

### Database & Infrastructure
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **connect-pg-simple**: PostgreSQL session store

### UI & Styling
- **@radix-ui/***: Primitive UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **embla-carousel-react**: Carousel/slider functionality

### Development & Build Tools
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development
- Uses Vite dev server with HMR (Hot Module Replacement)
- Express server runs with tsx for TypeScript execution
- Environment variable `NODE_ENV=development`

### Production Build Process
1. Vite builds the frontend React application
2. esbuild bundles the Express server code
3. Static files served from `dist/public`
4. Server bundle output to `dist/index.js`

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Separate configurations for development and production
- Session management configured for PostgreSQL in production

### Architecture Decisions

**Monorepo Structure**: Single repository containing both frontend and backend code with shared schema definitions, allowing for type safety across the full stack.

**Drizzle ORM Choice**: Selected for its TypeScript-first approach, type safety, and serverless compatibility with Neon Database.

**TanStack Query**: Chosen for robust server state management, caching, and optimistic updates in the frontend.

**shadcn/ui Components**: Provides a consistent, accessible design system built on Radix UI primitives with Tailwind CSS styling.

**Memory Storage Fallback**: Implemented in-memory storage for development and testing scenarios when database is not available.

## Recent Changes

### January 21, 2025
- Added elegant Crimson Text serif font for product names with rounded terminals
- Implemented transparent peachy blush background (rgba(255, 218, 185, 0.3)) for product tags
- Extended barcode length from 12 to 28 digits for more professional appearance
- Created comprehensive Git repository setup with README.md and .gitignore
- Repository: https://github.com/yerba-buena/ProductTagCreator-MG.git