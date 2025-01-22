import express from "express";
import { run } from "./config/db.js";

const app = express();
const PORT = 5003;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Connect to MongoDB
run();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
