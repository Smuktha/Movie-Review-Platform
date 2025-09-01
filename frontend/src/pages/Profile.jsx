import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function Profile() {
  const [me, setMe] = useState(null)
  useEffect(() => { api.get('/users/me').then(r => setMe(r.data)) }, [])
  if (!me) return <p>Loading...</p>
  return (
    <div className="max-w-xl">
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Hello, {me.username}</h1>
        <div className="opacity-80 text-sm">{me.email}</div>
        <div className="opacity-80 text-sm">Joined: {new Date(me.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  )
}
