import React, { useState } from "react";
import { MapPin, Droplets, Cloud } from "lucide-react";
import SaveButton from "../saves/SaveButton";
import axios from "axios";

const WeatherDashboard = ({ weatherData }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (memo, password) => {
    setIsSaving(true);
    try {
      const requestBody = {
        location: weatherData.location,
        searchParams: {
          startDate: weatherData.forecast[0].date,
          endDate: weatherData.forecast[forecast.length - 1].date,
        },
        weatherData: weatherData,
        memo: memo,
        password: password,
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/weather/saved`,
        requestBody
      );

      alert("✅ Weather data saved successfully!");
    } catch (error) {
      console.error("Error saving weather data:", error);
      alert("❌ Failed to save weather data!");
    } finally {
      setIsSaving(false);
    }
  };

  if (!weatherData) return null;
  const { location, current, forecast } = weatherData;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h3 className="text-xl font-bold mb-4">Current Weather</h3>
      <div className="flex items-center mb-4 justify-between">
        <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-lg shadow p-4 w-fit">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-white" />
              <div>
                <h2 className="text-xl font-bold text-white">
                  {location.name}
                </h2>
                <p className="text-sm text-white/90">{location.country}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={current.icon.replace("//", "https://")}
                alt={current.condition}
                className="w-10 h-10"
              />
              <div>
                <p className="text-sm text-white/90">{current.condition}</p>
                <p className="text-2xl font-bold text-white">
                  {current.temperature}°C
                </p>
              </div>
            </div>
          </div>
        </div>
        <SaveButton handleSave={handleSave} isSaving={isSaving} />
      </div>

      <h3 className="text-xl font-bold mb-4">{forecast.length}-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((day) => (
          <div
            key={day.date}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-4"
          >
            <p className="text-sm font-semibold mb-3 text-gray-700">
              {new Date(day.date + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                timeZone: location.tz_id,
              })}
            </p>
            <div className="flex flex-col items-center gap-3">
              <img
                src={day.icon.replace("//", "https://")}
                alt={day.condition}
                className="w-16 h-16"
              />
              <p className="text-sm text-center text-gray-600">
                {day.condition}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-red-500">
                  {Math.round(day.maxTemp)}°
                </span>
                <div className="h-0.5 w-8 bg-gray-200"></div>
                <span className="text-lg font-bold text-blue-500">
                  {Math.round(day.minTemp)}°
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Droplets className="w-4 h-4" />
                  <span>{day.rainChance || 0}%</span>
                </div>
                {day.snowChance > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Cloud className="w-4 h-4" />
                    <span>{day.snowChance}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;
