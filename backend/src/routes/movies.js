import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import Movie from '../models/Movie.js';
import Review from '../models/Review.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { recomputeMovieRating } from '../utils/ratings.js';

const router = Router();

// GET /movies
router.get('/',
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '12', 10);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.genre) filter.genres = req.query.genre;
    if (req.query.year) filter.year = parseInt(req.query.year);
    if (req.query.minRating) filter.avgRating = { $gte: parseFloat(req.query.minRating) };
    if (req.query.q) filter.title = { $regex: req.query.q, $options: 'i' };

    const [items, total] = await Promise.all([
      Movie.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Movie.countDocuments(filter)
    ]);

    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  }
);

// GET /movies/:id
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Not found' });
  res.json(movie);
});

// POST /movies (admin)
router.post('/',
  requireAuth, requireAdmin,
  body('title').isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const created = await Movie.create(req.body);
    res.status(201).json(created);
  }
);

// GET /movies/:id/reviews
router.get('/:id/reviews', async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '10', 10);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Review.find({ movie: req.params.id }).populate('user', 'username').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Review.countDocuments({ movie: req.params.id })
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

// POST /movies/:id/reviews
router.post('/:id/reviews',
  requireAuth,
  body('rating').isInt({ min: 1, max: 5 }),
  body('text').isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const created = await Review.create({
        user: req.user.sub,
        movie: req.params.id,
        rating: req.body.rating,
        text: req.body.text
      });
      await recomputeMovieRating(created.movie);
      res.status(201).json(created);
    } catch (e) {
      if (e.code === 11000) return res.status(409).json({ error: 'You already reviewed this movie' });
      throw e;
    }
  }
);

export default router;
