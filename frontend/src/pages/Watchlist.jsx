import { useEffect, useState } from 'react'
import api from '../utils/api'
import { Link } from 'react-router-dom'

export default function Watchlist() {
  const [items, setItems] = useState([])
  useEffect(() => { api.get('/users/me/watchlist').then(r => setItems(r.data)) }, [])

  const removeItem = async (movieId) => {
    await api.delete(`/users/me/watchlist/${movieId}`)
    setItems(items.filter(i => i.movie._id !== movieId))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(i => (
          <div key={i._id} className="card">
            <Link to={`/movies/${i.movie._id}`}>
              <img src={i.movie.posterUrl} className="rounded-xl mb-2 h-56 w-full object-cover" />
              <div className="font-semibold">{i.movie.title}</div>
            </Link>
            <button className="btn mt-3" onClick={() => removeItem(i.movie._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}
