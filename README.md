# BigHappy Analytics Dashboard

A modern enterprise-grade analytics dashboard built with React, TypeScript, Vite, and Recharts.

This project was developed as a frontend engineering assignment focused on scalable architecture, reusable analytics components, advanced chart interactions, filtering systems, and enterprise dashboard UX patterns.

---

# Features

## Dashboard Overview

* KPI analytics cards
* Budget pacing widgets
* Delivery tracking
* Trend indicators
* Performance summaries
* Responsive analytics layout

## Advanced Analytics

* Dynamic chart rendering
* Multi-metric visualization
* Combined bar + line charts
* Dual-axis support
* Zoom interactions
* Crosshair tooltips
* Interactive legends
* Animated metric toggling

## Filtering System

* Multi-select filters
* Searchable dropdowns
* Filter chips
* Synchronized analytics state
* Grouped metric selection
* Active filter indicators

## Reports Module

* Saved reports
* Report status tracking
* Search and sorting
* Pagination
* Export history

## Users Module

* User management table
* Role badges
* Status indicators
* Search and filtering
* User action menus

## Export Features

* CSV export
* JSON export
* PNG chart export
* Export current filtered state
* Export visible metrics

## UI / UX

* Enterprise SaaS styling
* Responsive design
* Framer Motion animations
* Loading skeletons
* Empty states
* Error handling
* Keyboard accessibility
* Smooth transitions

---

# Tech Stack

## Frontend

* React 19
* TypeScript
* Vite
* TailwindCSS

## State Management

* Zustand

## Charts & Visualization

* Recharts

## Animation

* Framer Motion

## Forms & Validation

* React Hook Form
* Zod

## Tooling

* ESLint
* Prettier

---

# Project Structure

```txt
src/
│
├── app/
├── pages/
├── features/
├── components/
├── services/
├── hooks/
├── store/
├── types/
├── utils/
├── constants/
├── mocks/
└── styles/
```

---

# Architecture Overview

The application follows a modular feature-driven architecture designed for scalability and maintainability.

## Key Architectural Decisions

### Feature-Based Structure

Business logic is grouped by domain:

* analytics
* reports
* users
* filters
* charts

This improves scalability and reduces coupling.

### Reusable Chart Engine

The chart system is fully configuration-driven using metric definitions.

Features include:

* dynamic metric rendering
* dual-axis handling
* reusable tooltip system
* animated transitions
* zoom state management

### Centralized State Management

Zustand is used for:

* analytics filters
* selected metrics
* chart state
* zoom state
* UI preferences

### Reusable Component System

Shared components include:

* tables
* dropdowns
* cards
* badges
* modals
* chart wrappers
* loaders

---

# Getting Started

## Prerequisites

* Node.js 18+
* npm or pnpm

---

# Installation

```bash
git clone <repository-url>

cd analytics-dashboard

npm install
```

---

# Development

```bash
npm run dev
```

Runs the app locally using Vite.

---

# Production Build

```bash
npm run build
```

---

# Preview Production Build

```bash
npm run preview
```

---

# Linting

```bash
npm run lint
```

---

# Performance Optimizations

Implemented optimizations include:

* React.memo
* useMemo
* useCallback
* Derived Zustand selectors
* Lazy loading
* Optimized chart rendering
* Debounced filtering
* Memoized analytics calculations

---

# Accessibility

Accessibility improvements include:

* Keyboard navigation
* ARIA labels
* Focus states
* Semantic HTML
* Accessible dropdowns
* Escape key handling
* Responsive navigation
* Screen reader-friendly interactions

---

# Responsive Design

Optimized for:

* Desktop
* Tablet
* Mobile

Responsive behaviors include:

* Collapsible sidebar
* Mobile filter drawers
* Adaptive chart resizing
* Responsive tables

---

# Analytics Features

Supported metrics include:

* Impressions
* Clicks
* CTR
* Revenue
* VCR
* SSP Spend
* SSP Impressions
* Time Spent
* QR Clicks

---

# Chart Features

* Combined bar + line charts
* Dynamic metric configuration
* Multi-series rendering
* Animated updates
* Crosshair tooltips
* Interactive legends
* Zoom functionality
* Responsive containers

---

# Future Improvements

Potential enhancements:

* Real backend integration
* Authentication system
* Real-time analytics
* Server-side pagination
* Advanced report scheduling
* Dark mode
* Role-based permissions
* WebSocket live updates
* Unit and integration testing

---

# Design Goals

This project was designed to emulate modern enterprise BI and analytics platforms such as:

* Tableau
* Looker
* Datadog
* Google Analytics
* Power BI

The focus was on:

* scalability
* modularity
* enterprise UX
* performance
* maintainability
* reusable systems

---

# Author

Frontend Engineering Assignment Project
Built using React + TypeScript + Vite
# Big-Happy-Assignment-Bhavesh-
