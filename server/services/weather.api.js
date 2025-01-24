import axios from "axios";
import { config } from "../config/env.config.js";

class WeatherAPI {
  constructor() {
    this.API_KEY = config.WEATHERAPI_KEY;
    this.baseURL = "http://api.weatherapi.com/v1";

    this.client = axios.create({
      baseURL: this.baseURL,
      params: {
        key: this.API_KEY,
      },
    });
  }

  async getWeatherData(location, start, end) {
    try {
      const response = await this.client.get("/forecast.json", {
        params: {
          q: location,
          days: 5,
          aqi: "no",
        },
      });

      response.data.forecast.forecastday =
        response.data.forecast.forecastday.filter((day) => {
          const date = day.date;
          return date >= start && date <= end;
        });

      return response.data;
    } catch (error) {
      console.error(
        "Weather API Error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        throw new Error("Invalid API key");
      }
      if (error.response?.status === 400) {
        const errorMsg =
          error.response.data.error?.message || "Invalid request";
        throw new Error(errorMsg);
      }
      throw new Error(`Failed to get weather data: ${error.message}`);
    }
  }

  async searchLocation(query) {
    try {
      const response = await this.client.get("/search.json", {
        params: {
          q: query,
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Location Search Error:",
        error.response?.data || error.message
      );
      throw new Error(`Failed to search location: ${error.message}`);
    }
  }
}

export default new WeatherAPI();
