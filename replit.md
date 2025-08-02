# Overview

This is a Discord bot showcase website that displays a collection of free Discord bots developed by Axsls. The platform serves as a centralized hub where users can discover, learn about, and invite various Discord bots to their servers. The site features three main bots: Garden Bot (for Grow a Garden game stock tracking), Moderation Bot (for server management), and Music Bot (for audio streaming). The application emphasizes that all bots are completely free with no premium plans or hidden costs.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with dedicated pages for each bot
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Discord-themed color variables and dark mode support
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Component Structure**: Modular design with reusable components like BotCard, Navigation, Footer, and HeroSection

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with endpoints for bot and review management
- **Data Storage**: In-memory storage implementation with interface-based design for future database integration
- **Development Setup**: Vite integration for hot module replacement in development mode
- **Request Logging**: Custom middleware for API request logging and error handling

## Data Storage Solutions
- **Current Implementation**: In-memory storage using Map data structures for development/demo purposes
- **Database Schema**: Drizzle ORM configured for PostgreSQL with tables for bots and reviews
- **Planned Migration**: Architecture supports easy transition from memory storage to PostgreSQL database
- **Schema Management**: Type-safe schema definitions with Zod validation for data integrity

## Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Express session middleware configured but not actively used
- **Future Considerations**: Architecture allows for easy integration of authentication systems

## External Dependencies
- **Database**: Neon Database (PostgreSQL) configured via Drizzle ORM
- **UI Framework**: Extensive use of Radix UI primitives for accessibility
- **Icons**: Lucide React icons with React Icons for brand icons
- **Development Tools**: Replit-specific plugins for development environment integration
- **Build Tools**: ESBuild for server bundling, Vite for client bundling
- **Form Handling**: React Hook Form with Hookform Resolvers for validation
- **Date Handling**: date-fns library for date manipulation and formatting