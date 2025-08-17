# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Seekare is a medical Q&A platform with four main components:
- **seekare_frontend**: React.js client application
- **seekare_backend**: Node.js/Express API server with MongoDB
- **seekare_admin**: React.js admin dashboard
- **seekare_text**: Python scripts for automated book data uploads

Development focus is currently on seekare_frontend and seekare_backend.

## Development Commands

### Frontend (seekare_frontend)
```bash
cd seekare_frontend
npm start           # Production server (Express)
npm run dev         # Development mode
npm run build       # Production build
npm test            # Run tests
```

### Admin (seekare_admin)
```bash
cd seekare_admin
npm start           # Production server (Express)
npm run dev         # Development mode
npm run build       # Production build
npm test            # Run tests
```

### Backend (seekare_backend)
```bash
cd seekare_backend
npm start           # Start with nodemon
npm run dev         # Development mode with NODE_ENV=development
npm run db:seed     # Seed database
npm run db:backup   # Backup database
```

### Docker Development
```bash
docker-compose up          # Start all services
docker-compose up api      # Start backend only
docker-compose up proxy    # Start frontend proxy
```

## Architecture

### Frontend Architecture
The React frontend is organized into three main wiki components:
- **wikiLeft**: Left sidebar navigation
- **WikiContent**: Main content area
- **wikiRight**: Right sidebar

Key directories:
- `src/app/main/wiki/`: Wiki components management
- `src/app/store/`: Redux store with domain-specific modules (auth, question, user, wiki, etc.)
- `src/app/services/api/`: API service layer
- `src/app/routing/`: React Router configuration
- `src/app/main/shared-components/`: Reusable components

### Backend Architecture
Express.js REST API with MongoDB:
- `src/routes/client/`: Public API routes
- `src/routes/admin/`: Admin-only routes
- `src/controllers/`: Request handlers
- `src/models/`: MongoDB/Mongoose schemas
- `src/middleware/`: Authentication and validation middleware

### Authentication & Authorization
Uses role-based access control with these roles:
- `guest`: Unauthenticated users
- `user`: Authenticated users
- `triage`: Triage personnel
- `md`: Medical doctors
- Admin roles for backend management

### State Management
- Redux with domain-specific modules (auth, questions, users, wiki, etc.)
- Custom hooks for common operations (useAuth, useQuestion, etc.)
- Context providers for theme and authentication

### Key Features
- Medical Q&A system with physician moderation
- Wiki-style knowledge base
- User profiles and subscription management
- File upload capabilities
- Real-time notifications via Pusher
- Stripe payment integration
- Email notifications via SendGrid/Nodemailer

## Environment Configuration

Backend and frontend have separate environment files. Configure:
- MongoDB connection string
- Email server credentials (nodemailer)
- Stripe keys for payments
- Auth0 configuration
- API base URLs

## Deployment

Uses Docker with nginx proxy, SSL via Let's Encrypt:
- `api`: Backend service
- `proxy`: Frontend nginx server
- `admin`: Admin dashboard
- `certbot`: SSL certificate management

The application serves at seekare.org with admin dashboard on port 65432.