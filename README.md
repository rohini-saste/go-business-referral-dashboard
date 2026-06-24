# Go Business - Referral Management Dashboard

A modern, responsive referral management dashboard built with React, Vite, and Ant Design. This application allows users to manage, track, and share business referrals with an intuitive interface and real-time data synchronization.

## Features

- **User Authentication**: Secure login system with JWT token-based authentication
- **Protected Routes**: Role-based access control with automatic redirect to login for unauthorized users
- **Referral Dashboard**: View comprehensive referral statistics and performance metrics
- **Referral Table**: Paginated table view with sorting and filtering capabilities
- **Service Summary**: Quick overview of service-related referrals
- **Referral Details**: Detailed view of individual referrals with complete information
- **Share Referrals**: Easy sharing functionality for referral links
- **Responsive Design**: Mobile-friendly interface that works on all screen sizes
- **Real-time Updates**: Auto-refresh capabilities for dashboard data
- **Currency Formatting**: Automatic formatting of monetary values
- **Date Formatting**: Consistent date display across the application

## Tech Stack

- **Frontend Framework**: React 19.2.6
- **Build Tool**: Vite 8.0.12
- **UI Component Library**: Ant Design 6.4.4
- **Routing**: React Router 7.18.0
- **HTTP Client**: Axios 1.18.0
- **State Management**: React Hooks (useState, useCallback, useRef)
- **Authentication**: JWT with Cookies (js-cookie 3.0.8)
- **Icons**: Ant Design Icons 6.2.5
- **Linting**: ESLint 10.3.0

## Project Structure

```
go-business/
├── src/
│   ├── pages/                 # Page components
│   │   ├── Dashboard.jsx      # Main dashboard view
│   │   ├── Login.jsx          # Authentication page
│   │   ├── ReferralDetails.jsx # Individual referral details
│   │   └── NotFound.jsx       # 404 page
│   ├── components/            # Reusable components
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Footer.jsx         # Footer component
│   │   ├── OverviewSection.jsx # Statistics overview
│   │   ├── ServiceSummary.jsx # Service metrics
│   │   ├── ReferralTable.jsx  # Referral data table
│   │   ├── ShareReferral.jsx  # Share functionality
│   │   ├── Pagination.jsx     # Pagination controls
│   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   └── Loading.jsx        # Loading indicator
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── utils/
│   │   ├── formatCurrency.js  # Currency formatting utility
│   │   └── formatDate.js      # Date formatting utility
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── package.json               # Project dependencies
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint rules
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/go-business.git
cd go-business
```

2. Install dependencies
```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Create an optimized production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

## API Integration

The application connects to an AWS Lambda-based API for authentication and referral data management:

- **API Endpoint**: `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api`
- **Authentication**: POST `/auth/signin` - Submit email and password to receive JWT token
- **Token Storage**: JWT tokens are stored in cookies for session persistence

## Authentication Flow

1. User navigates to `/login`
2. Enters email and password credentials
3. System validates credentials via API
4. On success, JWT token is stored in cookies
5. User is redirected to dashboard
6. Protected routes check for valid token; unauthorized users are redirected to login

## Environment Configuration

The application uses Vite for configuration management. Key configurations:

- **VITE_API_URL**: API endpoint base URL (configured in `.env` or environment variables)
- **Development**: Fast refresh enabled with HMR
- **Production**: Optimized builds with code splitting

## Deployment

The project is configured for deployment on Vercel (see `vercel.json`). Deploy with:

```bash
npm run build
vercel deploy
```

## Components Overview

### Pages
- **Dashboard**: Main application hub displaying referral overview and statistics
- **Login**: Secure authentication interface
- **ReferralDetails**: Detailed view of a specific referral
- **NotFound**: 404 error page for invalid routes

### Key Components
- **ProtectedRoute**: Wrapper component that ensures only authenticated users can access protected pages
- **ReferralTable**: Displays paginated list of referrals with sorting capabilities
- **OverviewSection**: Shows key metrics and statistics
- **ServiceSummary**: Provides quick summary of service-related data
- **ShareReferral**: Enables users to share referrals via links or other methods

## Utility Functions

- **formatCurrency()**: Formats numbers as currency with proper symbols and decimals
- **formatDate()**: Converts dates to readable format with localization support

## Code Quality

- ESLint configured for React best practices
- React Hooks best practices enforced
- Proper prop validation and TypeScript-ready structure
- Modular component architecture for maintainability

## Performance Optimizations

- Vite's fast build and HMR for development
- Code splitting for optimized bundle size
- Lazy loading of routes
- Efficient re-rendering with React.memo and useCallback hooks

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)




---

**Last Updated**: 2026-06-24
