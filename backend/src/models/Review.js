import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  text: { type: String, maxlength: 5000 },
}, { timestamps: true });

reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
