import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { clearCartItems } from '../slices/cartSlice'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const [createOrder, { isLoading, error }] = useCreateOrderMutation()

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()

      dispatch(clearCartItems()) // Clear the Redux cart
      // We will create this "Order Details" page next!
      // For now, let's just alert success
      toast.success('Order Placed Successfully!')
      navigate(`/order/${res._id}`) 
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="container mx-auto pt-10 px-4 min-h-screen">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
        <div className="flex-1 space-y-12">
          
          <div className="pb-8 border-b border-gray-100">
            <h2 className="text-xl font-serif uppercase tracking-widest mb-4">Shipping</h2>
            <p className="text-gray-600">
              <span className="font-bold text-apples-black">Address: </span>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div className="pb-8 border-b border-gray-100">
            <h2 className="text-xl font-serif uppercase tracking-widest mb-4">Payment Method</h2>
            <p className="text-gray-600">
              <span className="font-bold text-apples-black">Method: </span>
              {cart.paymentMethod}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif uppercase tracking-widest mb-6">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <div className="p-4 bg-gray-50 text-gray-500 text-sm">Your cart is empty</div>
            ) : (
              <div className="space-y-6">
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover border border-gray-100 rounded-sm" />
                      <Link to={`/product/${item._id}`} className="text-sm font-bold hover:underline">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                      {item.qty} x ₹{item.price} = <span className="text-apples-black font-bold">₹{(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-8 border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-serif uppercase tracking-widest mb-8 text-center">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Items</span>
                <span className="font-mono">₹{cart.itemsPrice}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Shipping</span>
                <span className="font-mono">₹{cart.shippingPrice}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Tax</span>
                <span className="font-mono">₹{cart.taxPrice}</span>
              </div>
              <div className="flex justify-between pt-4 text-lg font-bold">
                <span>Total</span>
                <span className="font-mono">₹{cart.totalPrice}</span>
              </div>
            </div>

            {error && <div className="mt-4 text-red-500 text-xs text-center">{error.data?.message}</div>}

            <button
              type="button"
              className="w-full bg-apples-black text-white py-4 mt-8 uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
              disabled={cart.cartItems.length === 0 || isLoading}
              onClick={placeOrderHandler}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen