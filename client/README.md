# TalentStack Frontend

React frontend for the TalentStack e-learning platform.

## Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

The app will run on `http://localhost:3000` and proxy API requests to `http://localhost:5000/api`.

## Build

```bash
npm run build
```

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable components (Navbar, Footer, CourseCard, etc.)
│   ├── pages/          # Page components (Landing, Courses, Dashboard, etc.)
│   ├── services/        # API service layer
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css       # Global styles
├── index.html
├── vite.config.js
└── package.json
```
