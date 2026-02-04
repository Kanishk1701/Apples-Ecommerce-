import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment') // Move to next step
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-10">
      
      {/* The Progress Bar */}
      <CheckoutSteps step1 step2 />

      <div className="w-full max-w-lg p-8">
        <h1 className="text-3xl font-serif mb-8 text-center uppercase tracking-widest">
          Shipping Address
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          
          {/* Address */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Address</label>
            <input
              type="text"
              required
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-apples-black transition-colors"
              placeholder="123 Luxury Lane"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">City</label>
            <input
              type="text"
              required
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-apples-black transition-colors"
              placeholder="New York"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Postal Code</label>
            <input
              type="text"
              required
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-apples-black transition-colors"
              placeholder="10001"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Country</label>
            <input
              type="text"
              required
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-apples-black transition-colors"
              placeholder="United States"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-apples-black text-white py-4 uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors mt-8"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  )
}

export default ShippingScreen