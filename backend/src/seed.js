import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Movie from './models/Movie.js';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie_reviews';
await mongoose.connect(MONGODB_URI);
console.log('Connected to DB');

await Movie.deleteMany({});
await User.deleteMany({});

const movies = await Movie.insertMany([
  { title: 'Inception', genres: ['Sci-Fi', 'Thriller'], year: 2010, director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'], synopsis: 'A thief who steals corporate secrets through dream-sharing technology.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg' },
  { title: 'The Dark Knight', genres: ['Action', 'Crime'], year: 2008, director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger'], synopsis: 'Batman faces the Joker in Gotham City.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { title: 'Interstellar', genres: ['Sci-Fi', 'Drama'], year: 2014, director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway'], synopsis: 'A team travels through a wormhole in search of a new home for humanity.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg' },
]);

const admin = await User.create({
  username: 'admin',
  email: 'admin@example.com',
  passwordHash: await bcrypt.hash('Admin@123', 10),
  role: 'admin'
});

console.log(`Seeded ${movies.length} movies and admin user: admin@example.com / Admin@123`);
await mongoose.disconnect();
