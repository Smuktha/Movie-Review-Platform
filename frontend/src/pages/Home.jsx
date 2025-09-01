import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../store/moviesSlice'
import MovieCard from '../components/MovieCard'

export default function Home() {
  const dispatch = useDispatch()
  const { list, loading } = useSelector(s => s.movies)
  useEffect(() => { dispatch(fetchMovies({ limit: 6 })) }, [dispatch])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Featured Movies</h1>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {list?.items?.map(m => <MovieCard key={m._id} movie={m} />)}
      </div>
    </div>
  )
}
