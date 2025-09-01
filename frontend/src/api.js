const API_BASE = "http://localhost:5000";

export async function fetchMovies() {
  try {
    const res = await fetch(`${API_BASE}/movies`);
    if (!res.ok) throw new Error("Failed to fetch movies");
    const data = await res.json();
    return data.items; // <-- return the array inside "items"
  } catch (err) {
    console.error(err);
    return [];
  }
}
