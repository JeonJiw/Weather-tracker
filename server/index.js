import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/env.config.js";

connectDB()
  .then(() => {
    app.listen(config.PORT, () =>
      console.log(`Server running on port ${config.PORT}`)
    );
  })
  .catch((err) => {
    console.log("Mongo connection error", err);
    process.exit(1);
  });
