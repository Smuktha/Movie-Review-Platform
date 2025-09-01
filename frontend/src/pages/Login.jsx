import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from '../store/authSlice'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const { token } = useSelector(s => s.auth)
  const onSubmit = (data) => dispatch(loginThunk(data))
  return (
    <div className="max-w-md mx-auto card space-y-3">
      <h1 className="text-2xl font-bold">Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="input" placeholder="Email" {...register('email')} />
        <input className="input" placeholder="Password" type="password" {...register('password')} />
        <button className="btn w-full">Login</button>
      </form>
      {token && <p className="opacity-80">Logged in!</p>}
    </div>
  )
}
