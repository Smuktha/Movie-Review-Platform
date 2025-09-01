import Review from '../models/Review.js';
import Movie from '../models/Movie.js';

export async function recomputeMovieRating(movieId) {
  const agg = await Review.aggregate([
    { $match: { movie: movieId } },
    { $group: { _id: '$movie', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  const { avgRating = 0, count = 0 } = agg[0] || {};
  await Movie.findByIdAndUpdate(movieId, { avgRating, ratingsCount: count });
}
