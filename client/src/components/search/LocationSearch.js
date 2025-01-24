import React, { useState } from "react";
import { Search } from "lucide-react";
import _ from "lodash";
import axios from "axios";

const LocationSearch = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchLocation = React.useCallback(
    async (searchQuery) => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/weather/search?q=${searchQuery}`
        );
        setSuggestions(data);
      } catch (error) {
        console.error("Location search failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setSuggestions, setIsLoading]
  );

  const debouncedSearch = _.debounce(searchLocation, 300);

  const handleSelect = (location) => {
    setQuery(location.name);
    setSuggestions([]);
    onLocationSelect(location);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            debouncedSearch(e.target.value);
          }}
          placeholder="Search location..."
          className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search
          className={`absolute right-3 top-2.5 ${
            isLoading ? "text-blue-500 animate-spin" : "text-gray-400"
          }`}
          size={20}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={`${suggestion.lat}-${suggestion.lon}`}
              onClick={() => handleSelect(suggestion)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion.name}, {suggestion.country}
              {suggestion.region && `, ${suggestion.region}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
