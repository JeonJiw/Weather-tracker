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
- Database: MySQL
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

````sql
-- Searches table
CREATE TABLE searches (
 id VARCHAR(36) PRIMARY KEY,
 location VARCHAR(255) NOT NULL,
 start_date DATE NOT NULL,
 end_date DATE NOT NULL,
 password_hash VARCHAR(255) NOT NULL,
 memo TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 INDEX idx_location (location),
 INDEX idx_dates (start_date, end_date)
);

-- Weather data table
CREATE TABLE weather_data (
 id VARCHAR(36) PRIMARY KEY,
 search_id VARCHAR(36),
 temperature DECIMAL(5,2),
 humidity INT,
 description VARCHAR(255),
 date DATE,
 FOREIGN KEY (search_id) REFERENCES searches(id)
);

## Scripts
```bash
# Frontend
npm start   # Run on port 3000

# Backend
npm run dev # Run on port 5003
````

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
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root1234
DB_NAME=weather_app
OPENWEATHER_API_KEY=
GOOGLE_MAPS_API_KEY=
CORS_ORIGIN=http://localhost:3000
```
