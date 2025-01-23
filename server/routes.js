import express from "express";
import {
  getWeatherData,
  getSavedSearches,
  saveWeatherSearch,
  updateSavedSearch,
  deleteSavedSearch,
} from "./controllers/weather.controller.js";

const router = express.Router();

router.get("/weather", getWeatherData);

router.get("/weather/saved", getSavedSearches);
router.post("/weather/saved", saveWeatherSearch);
router.put("/weather/saved/:id", updateSavedSearch);
router.delete("/weather/saved/:id", deleteSavedSearch);

export default router;
