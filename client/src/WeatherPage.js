import { useState, useEffect } from "react";
import axios from "axios";
import LocationSearch from "./components/search/LocationSearch";
import DateRangeSelect from "./components/search/DateRangeSelect";
import SearchButton from "./components/search/SearchButton";
import WeatherDashboard from "./components/weather/WeatherDashboard";
import { SavedSearchList } from "./components/saves/SavedSearchList";

export default function WeatherPage() {
  const [location, setLocation] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [savedSearches, setSavedSearches] = useState([]);

  useEffect(() => {
    fetchSavedSearches();
  }, []);
  const fetchSavedSearches = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/weather/saved`
      );
      const processedData = response.data.map((search) => ({
        ...search,
        location:
          typeof search.location === "object"
            ? search.location.name
            : search.location,
      }));
      setSavedSearches(processedData);
    } catch (error) {
      console.error("Failed to fetch saved searches:", error);
    }
  };

  const handleDeleteSearch = async (id, password) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/weather/saved/${id}`,
        { data: { password } }
      );
      fetchSavedSearches();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete search");
    }
  };

  const handleUpdateSearch = async (id, memo, password) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/weather/saved/${id}`, {
        memo,
        password,
      });
      fetchSavedSearches();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update search");
    }
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (endDate && newStartDate > endDate) {
      setEndDate(newStartDate);
    }
  };

  const handleSearch = async () => {
    if (!location?.name || !startDate) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/weather`,
        {
          params: {
            location: location.name,
            start: startDate,
            end: endDate || startDate,
          },
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch weather data");
      console.error("Weather search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Saved Search List */}
          <div className="lg:col-span-1 bg-gray-50 rounded-xl shadow-lg">
            <SavedSearchList
              searches={savedSearches}
              onDelete={handleDeleteSearch}
              onUpdate={handleUpdateSearch}
              onSelect={(search) => {
                setLocation({ name: search.location });
                setWeatherData(search.weatherData);
              }}
            />
          </div>

          {/* Right: Search Result */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Weather Forecast
              </h2>
            </div>

            <div className="space-y-6">
              <LocationSearch onLocationSelect={setLocation} />

              <DateRangeSelect
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={handleStartDateChange}
                onEndDateChange={(e) => setEndDate(e.target.value)}
                minDate={new Date().toISOString().split("T")[0]}
                maxDate={
                  new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
              />

              <SearchButton
                onClick={handleSearch}
                disabled={!location?.name || !startDate || isLoading}
                isLoading={isLoading}
              />
              <WeatherDashboard
                weatherData={weatherData}
                fetchSavedSearches={fetchSavedSearches}
              />
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
