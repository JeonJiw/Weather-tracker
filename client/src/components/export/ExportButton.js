import React from "react";
import { Download } from "lucide-react";
import Papa from "papaparse";

const ExportButton = ({ weatherData, format }) => {
  const exportData = () => {
    const data = {
      location: weatherData.location.name,
      country: weatherData.location.country,
      current: {
        temperature: weatherData.current.temperature,
        condition: weatherData.current.condition,
      },
      forecast: weatherData.forecast,
    };

    switch (format) {
      case "json":
        const jsonString = JSON.stringify(data, null, 2);
        downloadFile(jsonString, "weather-data.json", "application/json");
        break;

      case "csv":
        const csvData = [
          ["Date", "Temperature", "Condition", "Rain Chance", "Snow Chance"],
          ...weatherData.forecast.map((day) => [
            day.date,
            day.maxTemp,
            day.condition,
            day.rainChance || 0,
            day.snowChance || 0,
          ]),
        ];
        const csv = Papa.unparse(csvData);
        downloadFile(csv, "weather-data.csv", "text/csv");
        break;

      case "markdown":
        const markdown = generateMarkdown(data);
        downloadFile(markdown, "weather-data.md", "text/markdown");
        break;

      default:
        console.error("Unsupported format");
    }
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateMarkdown = (data) => {
    return `# Weather Report for ${data.location}, ${data.country}

## Current Weather
- Temperature: ${data.current.temperature}°C
- Condition: ${data.current.condition}

## Forecast
${data.forecast
  .map(
    (day) => `
### ${day.date}
- Max Temperature: ${day.maxTemp}°C
- Min Temperature: ${day.minTemp}°C
- Condition: ${day.condition}
- Rain Chance: ${day.rainChance || 0}%
- Snow Chance: ${day.snowChance || 0}%
`
  )
  .join("\n")}`;
  };

  return (
    <button
      onClick={exportData}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <Download className="w-4 h-4" />
      Export {format.toUpperCase()}
    </button>
  );
};

const ExportButtons = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="flex gap-4 mt-4">
      <ExportButton weatherData={weatherData} format="csv" />
      <ExportButton weatherData={weatherData} format="json" />
      <ExportButton weatherData={weatherData} format="markdown" />
    </div>
  );
};

export default ExportButtons;
