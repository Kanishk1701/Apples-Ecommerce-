import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (err) {
      alert(err?.data?.message || err.error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      
      {/* Minimal Logo for Auth Page */}
      <Link to="/" className="mb-12 text-4xl font-serif font-bold tracking-wider">
        APPLES
      </Link>

      <div className="w-full max-w-md p-10 bg-white shadow-xl border border-gray-100">
        <h1 className="text-2xl font-serif text-center uppercase tracking-widest mb-8">
          Sign In
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-apples-black transition-colors bg-gray-50 focus:bg-white"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-apples-black transition-colors bg-gray-50 focus:bg-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-apples-black text-white py-4 uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors text-xs"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center space-y-4">
          <div className="text-xs text-gray-500">
            New to Apples?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-apples-black font-bold underline decoration-1 underline-offset-4">
              Create an Account
            </Link>
          </div>
        </div>
      </div>

      {/* LEGAL FOOTER */}
      <div className="mt-8 flex gap-6 text-[10px] uppercase tracking-widest text-gray-400">
         <span className="cursor-pointer hover:text-gray-600">Privacy Policy</span>
         <span className="cursor-pointer hover:text-gray-600">Terms & Conditions</span>
         <span className="cursor-pointer hover:text-gray-600">Cookies</span>
      </div>

    </div>
  )
}

export default LoginScreen