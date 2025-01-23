import weatherAPI from "./weather.api.js";

class WeatherService {
  async getWeatherData(location, start, end) {
    const weatherData = await weatherAPI.getWeatherData(location, start, end);

    return {
      location: {
        name: weatherData.location.name,
        country: weatherData.location.country,
        coordinates: {
          lat: weatherData.location.lat,
          lon: weatherData.location.lon,
        },
      },
      current: {
        temperature: weatherData.current.temp_c,
        condition: weatherData.current.condition.text,
        icon: weatherData.current.condition.icon,
      },
      forecast: weatherData.forecast.forecastday.map((day) => ({
        date: day.date,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
        avgTemp: day.day.avgtemp_c,
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
        rainChance: day.day.daily_chance_of_rain,
        snowChance: day.day.daily_chance_of_snow,
      })),
    };
  }
}

export default new WeatherService();
