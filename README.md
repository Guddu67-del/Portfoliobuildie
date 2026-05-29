# Portfoliobuildie

A modern Construction Estimation and Project Management platform built with React and Headless WordPress CMS.

## Overview

Portfoliobuildie is a frontend-focused estimation and workspace management application designed for handling construction-related projects, material calculations, room estimations, and project tracking using a Headless CMS architecture.
The application provides a scalable dashboard interface with modular project sections, estimation breakdowns, and centralized state management using Redux Toolkit.

---

## Features

### Authentication System
- User login authentication
- Protected dashboard routes
- Session-based access control

### Dashboard Workspace
- Sidebar workspace navigation
- Project management interface
- Dynamic project detail pages

### Construction Estimation
- Bill of Quantity (BOQ)
- Material rate management
- Opening breakdown calculations
- Room-based estimation workflow

### Project Management
- Create and manage projects
- View detailed project summaries
- Organized workspace sections

### UI & UX
- Responsive dashboard layout
- Modern React component architecture
- Dark mode compatible styling
- Tailwind CSS integration

---

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Redux Toolkit
- Tailwind CSS

### Backend
- WordPress Headless CMS
- WordPress REST API

### State Management
- Redux Toolkit slices

---

## Project Structure

```bash
src/
│
├── pages/
│   ├── Auth/
│   ├── Blog/
│   ├── Dashboard/
│   ├── ProjectDetails/
│   ├── Projects/
│   └── Settings/
│
├── store/
│   ├── slices/
│   └── store.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Guddu67-del/Portfoliobuildie.git
```

Move into project folder:

```bash
cd Portfoliobuildie
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Environment Variables

Create a `.env` file in the root directory.

Example:

```env
VITE_API_URL=https://your-wordpress-site.com/wp-json
```

---

## Deployment

Frontend deployment supported on:

- Vercel
- Netlify

Recommended platform:

- Vercel

---

## Future Improvements

- JWT Authentication
- Advanced Analytics Dashboard
- Real-time Estimation Updates
- Role-based Access Control
- Cloud File Uploads
- AI-assisted Cost Prediction

---

## Author

Developed by Subhadeep

GitHub:
https://github.com/Guddu67-del

---

## License

This project is currently for educational and portfolio purposes.
