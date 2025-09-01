import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovie } from '../store/moviesSlice'
import api from '../utils/api'
import StarRating from '../components/StarRating'

export default function MovieDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { current } = useSelector(s => s.movies)
  const [reviews, setReviews] = useState([])
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)

  useEffect(() => { dispatch(fetchMovie(id)) }, [dispatch, id])
  useEffect(() => { api.get(`/movies/${id}/reviews`).then(r => setReviews(r.data.items)) }, [id])

  const submitReview = async (e) => {
    e.preventDefault()
    await api.post(`/movies/${id}/reviews`, { text, rating })
    setText(''); setRating(5)
    const { data } = await api.get(`/movies/${id}/reviews`)
    setReviews(data.items)
    dispatch(fetchMovie(id))
  }

  if (!current) return <p>Loading...</p>

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <img src={current.posterUrl} className="rounded-2xl w-full" />
      </div>
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold">{current.title} <span className="opacity-70 text-lg">({current.year})</span></h1>
        <div className="opacity-80 my-2">⭐ {current.avgRating?.toFixed(1)} ({current.ratingsCount})</div>
        <p className="opacity-80 mb-3">{current.synopsis}</p>
        <div className="text-sm opacity-70">Genres: {current.genres?.join(', ')}</div>
        <div className="text-sm opacity-70">Director: {current.director}</div>
        <div className="text-sm opacity-70">Cast: {current.cast?.join(', ')}</div>

        <hr className="my-6 border-neutral-800" />

        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <div className="space-y-3 mb-6">
          {reviews.map(r => (
            <div key={r._id} className="card">
              <div className="text-sm opacity-80">by {r.user?.username || 'anonymous'} — ⭐ {r.rating}</div>
              <div className="mt-2">{r.text}</div>
            </div>
          ))}
        </div>

        <form onSubmit={submitReview} className="card space-y-3">
          <h3 className="font-semibold">Write a review</h3>
          <StarRating value={rating} setValue={setRating} />
          <textarea className="input h-28" placeholder="Your thoughts..." value={text} onChange={e=>setText(e.target.value)} />
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  )
}
