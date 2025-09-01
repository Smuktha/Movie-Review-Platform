import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  genres: [{ type: String }],
  year: Number,
  director: String,
  cast: [{ type: String }],
  synopsis: String,
  posterUrl: String,
  avgRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Movie', movieSchema);
