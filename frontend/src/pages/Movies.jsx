import { useEffect, useState } from "react";
import { fetchMovies } from "../api";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies().then(data => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (!movies.length) return <p>No movies found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {movies.map(movie => (
          <div key={movie._id} style={{ width: "200px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            <img src={movie.posterUrl} alt={movie.title} style={{ width: "100%", borderRadius: "4px" }} />
            <h3>{movie.title}</h3>
            <p>{movie.year} | {movie.genres.join(", ")}</p>
            <p>⭐ {movie.avgRating || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
