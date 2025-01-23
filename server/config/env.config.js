import dotenv from "dotenv";
dotenv.config();

export const config = {
  WEATHERAPI_KEY: process.env.WEATHERAPI_KEY,
  PORT: process.env.PORT || 5003,
  HASH_SECRET_KEY: process.env.HASH_SECRET_KEY,
};

if (!config.WEATHERAPI_KEY) {
  throw new Error("WEATHERAPI_KEY is required in environment variables");
}

if (!config.HASH_SECRET_KEY) {
  throw new Error("HASH_SECRET_KEY is required in environment variables");
}
