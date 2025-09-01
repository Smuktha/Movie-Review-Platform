import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie._id}`} className="card block hover:opacity-95 transition">
      <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover rounded-xl mb-3" />
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{movie.title}</h3>
        <span className="text-sm opacity-70">{movie.year}</span>
      </div>
      <div className="text-sm opacity-80 mt-1">⭐ {movie.avgRating?.toFixed(1) || '0.0'} ({movie.ratingsCount})</div>
      <div className="text-xs opacity-70 mt-1">{movie.genres?.join(', ')}</div>
    </Link>
  )
}
