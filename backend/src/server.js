import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express(); // ← must come before app.use()

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));
app.use(express.json());

// Example route
app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/moviesdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
