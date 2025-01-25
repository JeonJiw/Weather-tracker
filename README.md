# Weather App Project

A web application that provides weather information with data persistence capabilities.

## Features

- Location search via postal code, GPS, landmarks, or city names
- Current weather and 5-day forecast display
- Historical weather data analysis for events/festivals
- CRUD operations for saved searches with password protection
- Data export functionality
- Additional location-based API integrations

## Tech Stack

- Frontend: React, TailwindCSS, Axios
- Backend: Node.js, Express, Bsrypt
- Database: MongoDB
- APIs: OpenWeatherMap, Google Maps

# Frontend dependencies

npm install axios tailwindcss postcss autoprefixer
npm install react-datepicker @types/react-datepicker
npm install react-icons

# Backend dependencies

npm install express mysql2 dotenv cors bcrypt uuid

## API Integration Details

### OpenWeatherMap API

- Current weather
- 5-day forecast
- Location geocoding

### Google Maps API

- Map visualization
- Place search
- Address geocoding

Required API Keys:

- REACT_APP_OPENWEATHER_API_KEY
- REACT_APP_GOOGLE_MAPS_API_KEY

## Database Schema

## Scripts

```bash
# Frontend
npm start   # Run on port 3000

# Backend
npm run dev # Run on port 5003
```

## Environment Variables

### Frontend (.env)

```env
REACT_APP_OPENWEATHER_API_KEY=
REACT_APP_GOOGLE_MAPS_API_KEY=
REACT_APP_API_URL=http://localhost:8000
```

### Backend (.env)

```env
PORT=8000
MONGODB_URI
OPENWEATHER_API_KEY=
GOOGLE_MAPS_API_KEY=
CORS_ORIGIN=http://localhost:3000
```
