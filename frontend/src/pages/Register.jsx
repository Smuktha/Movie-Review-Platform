import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { registerThunk } from '../store/authSlice'

export default function Register() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const onSubmit = (data) => dispatch(registerThunk(data))
  return (
    <div className="max-w-md mx-auto card space-y-3">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="input" placeholder="Username" {...register('username')} />
        <input className="input" placeholder="Email" {...register('email')} />
        <input className="input" placeholder="Password" type="password" {...register('password')} />
        <button className="btn w-full">Sign up</button>
      </form>
    </div>
  )
}
