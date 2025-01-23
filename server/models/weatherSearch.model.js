import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { config } from "../config/env.config.js";

const weatherSearchSchema = new mongoose.Schema({
  location: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    coordinates: {
      lat: Number,
      lon: Number,
    },
  },
  searchParams: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  weatherData: {
    current: {
      temperature: Number,
      condition: String,
      icon: String,
    },
    forecast: [
      {
        _id: false,
        date: String,
        maxTemp: Number,
        minTemp: Number,
        avgTemp: Number,
        condition: String,
        icon: String,
        rainChance: String,
        snowChance: String,
      },
    ],
  },
  memo: {
    type: String,
    trim: true,
    maxLength: 500,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

weatherSearchSchema.methods.comparePassword = async function (inputPassword) {
  const hashedPassword = await bcrypt.hash(
    inputPassword + config.HASH_SECRET_KEY,
    10
  );
  return await bcrypt.compare(
    inputPassword + config.HASH_SECRET_KEY,
    this.password
  );
};
weatherSearchSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(
      this.password + config.HASH_SECRET_KEY,
      10
    );
    next();
  } catch (error) {
    next(error);
  }
});

weatherSearchSchema.index({ "location.name": 1, createdAt: -1 });

const WeatherSearch = mongoose.model("WeatherSearch", weatherSearchSchema);

export default WeatherSearch;
