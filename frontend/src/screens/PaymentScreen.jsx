import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  useEffect(() => {
    // If no shipping address, kick them back to Shipping screen
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [shippingAddress, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder') 
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-10">
      
      <CheckoutSteps step1 step2 step3 />

      <div className="w-full max-w-lg p-8">
        <h1 className="text-3xl font-serif mb-8 text-center uppercase tracking-widest">
          Payment Method
        </h1>

        <form onSubmit={submitHandler} className="space-y-8">
          <div className="space-y-4">
            <legend className="block text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold">
              Select Method
            </legend>

            <label className="flex items-center space-x-4 p-4 border border-gray-200 cursor-pointer hover:border-apples-black transition-colors">
              <input
                type="radio"
                className="accent-apples-black w-5 h-5"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="font-serif text-lg">RazorPay or Credit Card</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-apples-black text-white py-4 uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentScreen