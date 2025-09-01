import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import User from '../models/User.js';
import Watchlist from '../models/Watchlist.js';

const router = Router();

// GET /users/me
router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.sub).select('-passwordHash');
  res.json(user);
});

// PUT /users/me
router.put('/me', requireAuth,
  body('username').optional().isLength({ min: 3 }),
  body('avatarUrl').optional().isURL().isLength({ max: 500 }).optional({ nullable: true }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const updated = await User.findByIdAndUpdate(req.user.sub, req.body, { new: true }).select('-passwordHash');
    res.json(updated);
  }
);

// Watchlist
router.get('/me/watchlist', requireAuth, async (req, res) => {
  const list = await Watchlist.find({ user: req.user.sub }).populate('movie');
  res.json(list);
});

router.post('/me/watchlist', requireAuth, body('movieId').isString(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const item = await Watchlist.create({ user: req.user.sub, movie: req.body.movieId });
    res.status(201).json(item);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'Already in watchlist' });
    throw e;
  }
});

router.delete('/me/watchlist/:movieId', requireAuth, async (req, res) => {
  await Watchlist.findOneAndDelete({ user: req.user.sub, movie: req.params.movieId });
  res.json({ ok: true });
});

export default router;
