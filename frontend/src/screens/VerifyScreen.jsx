import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useVerifyMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const VerifyScreen = () => {
  const [otp, setOtp] = useState('')
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  // Get email passed from Register Screen
  const email = location.state?.email 

  const [verify, { isLoading }] = useVerifyMutation()
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    // If already logged in, go home
    if (userInfo) {
      navigate('/')
    }
    // If no email (user tried to skip registration), go back to register
    if (!email) {
      navigate('/register')
    }
  }, [navigate, userInfo, email])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await verify({ email, otp }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/')
    } catch (err) {
      alert(err?.data?.message || err.error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <Link to="/" className="mb-12 text-4xl font-serif font-bold tracking-wider">
        APPLES
      </Link>

      <div className="w-full max-w-md p-10 bg-white shadow-xl border border-gray-100 text-center">
        <h1 className="text-2xl font-serif uppercase tracking-widest mb-4">
          Verify It's You
        </h1>
        <p className="text-xs text-gray-500 mb-8">
          We've sent a verification code to <span className="font-bold text-apples-black">{email}</span>.
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <input
              type="text"
              className="w-full border border-gray-200 p-4 text-center text-2xl tracking-[1em] font-serif focus:outline-none focus:border-apples-black transition-colors bg-gray-50 focus:bg-white"
              placeholder="000000"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-apples-black text-white py-4 uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors text-xs"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerifyScreen