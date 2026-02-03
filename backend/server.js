import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Load env variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express
const app = express();

// Simple test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
