import weatherService from "../services/weather.service.js";
import WeatherSearch from "../models/weatherSearch.model.js";
import WeatherAPI from "../services/weather.api.js";

export const getWeatherData = async (req, res) => {
  try {
    const { location, start, end } = req.query;
    // 1. Validate required parameters
    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    // 2. Validate dates if provided
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const currentDate = new Date();
      const maxForecastDate = new Date(currentDate);
      maxForecastDate.setDate(currentDate.getDate() + 5);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res
          .status(400)
          .json({ message: "Invalid date format. Use YYYY-MM-DD" });
      }

      if (startDate > endDate) {
        return res
          .status(400)
          .json({ message: "Start date must be before end date" });
      }

      if (endDate > maxForecastDate) {
        return res
          .status(400)
          .json({ message: "Forecast is only available for the next 5 days" });
      }
    }

    // 3. Get weather data
    const weatherData = await weatherService.getWeatherData(
      location,
      start,
      end
    );
    res.json(weatherData);
  } catch (error) {
    console.error("Weather Controller Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchLocation = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Query required" });

    const data = await WeatherAPI.searchLocation(q);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSavedSearches = async (req, res) => {
  try {
    const searches = await WeatherSearch.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .exec();

    res.json(searches);
  } catch (error) {
    console.error("Get Searches Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const saveWeatherSearch = async (req, res) => {
  try {
    const { location, searchParams, weatherData, memo, password } = req.body;

    const savedSearch = await WeatherSearch.create({
      location,
      searchParams,
      weatherData,
      memo,
      password,
      createdAt: new Date(),
    });

    const searchResponse = savedSearch.toObject();
    delete searchResponse.password;

    res.status(201).json(searchResponse);
  } catch (error) {
    console.error("Save Search Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateSavedSearch = async (req, res) => {
  try {
    const { id } = req.params;
    const { memo, password } = req.body;

    if (!memo || !password) {
      return res
        .status(400)
        .json({ message: "Memo and password are required" });
    }
    const search = await WeatherSearch.findById(id);

    if (!search) {
      return res.status(404).json({ message: "Search not found" });
    }

    const isPasswordValid = await search.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    search.memo = memo;
    await search.save();

    const searchResponse = search.toObject();
    delete searchResponse.password;

    res.json(searchResponse);
  } catch (error) {
    console.error("Update Search Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteSavedSearch = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const search = await WeatherSearch.findById(id);

    if (!search) {
      return res.status(404).json({ message: "Search not found" });
    }

    const isPasswordValid = await search.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    await search.deleteOne();
    res.json({ message: "Search deleted successfully" });
  } catch (error) {
    console.error("Delete Search Error:", error);
    res.status(500).json({ message: error.message });
  }
};
