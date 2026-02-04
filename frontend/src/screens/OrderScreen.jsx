import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useCreateRazorpayOrderMutation,
} from '../slices/ordersApiSlice'

const OrderScreen = () => {
  const { id: orderId } = useParams()

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
  
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation()

  const { userInfo } = useSelector((state) => state.auth)

  // 1. Load Razorpay SDK Script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  // 2. Handle Payment Click
  const handlePayment = async () => {
    const res = await loadRazorpayScript()

    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?')
      return
    }

    try {
      // A. Create Order on Backend
      const razorpayOrder = await createRazorpayOrder(orderId).unwrap()

      // B. Configure Options
      const options = {
        key: razorpayOrder.key, 
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Apples Luxury Store',
        description: `Order #${orderId}`,
        order_id: razorpayOrder.id, // The Order ID from Backend
        handler: async function (response) {
          // C. On Success -> Mark Paid in Database
          try {
            await payOrder({
              orderId,
              details: {
                id: response.razorpay_payment_id,
                status: 'COMPLETED',
                update_time: new Date().toISOString(),
                payer: { email_address: userInfo.email },
              },
            }).unwrap()
            
            refetch()
            toast.success('Payment Successful')
          } catch (err) {
            toast.error(err?.data?.message || err.error)
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: '9999999999', // You could add phone to user model later
        },
        theme: {
          color: '#111111', // Apples Black Brand Color
        },
      }

      // D. Open Popup
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
      
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return isLoading ? (
    <div className="text-center py-20">Loading...</div>
  ) : error ? (
    <div className="text-center py-20 text-red-500">{error?.data?.message}</div>
  ) : (
    <div className="container mx-auto pt-10 px-4 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif uppercase tracking-widest">
          Order <span className="text-gray-400 text-sm normal-case tracking-normal">#{order._id}</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
        {/* LEFT COLUMN */}
        <div className="flex-1 space-y-12">
           {/* ... Shipping & Payment Info (Same as before) ... */}
           <div className="pb-8 border-b border-gray-100">
            <h2 className="text-xl font-serif uppercase tracking-widest mb-4">Shipping</h2>
            <p className="text-gray-600 mb-4">
              <span className="font-bold text-apples-black">Name: </span> {order.user.name} <br />
              <span className="font-bold text-apples-black">Email: </span> {order.user.email} <br />
              <span className="font-bold text-apples-black">Address: </span>
              {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="bg-green-100 text-green-800 p-3 text-sm font-bold uppercase tracking-widest text-center">Delivered on {order.deliveredAt}</div>
            ) : (
              <div className="bg-red-50 text-red-800 p-3 text-sm font-bold uppercase tracking-widest text-center">Not Delivered</div>
            )}
          </div>

          <div className="pb-8 border-b border-gray-100">
            <h2 className="text-xl font-serif uppercase tracking-widest mb-4">Payment Method</h2>
            <p className="text-gray-600 mb-4">
              <span className="font-bold text-apples-black">Method: </span>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="bg-green-100 text-green-800 p-3 text-sm font-bold uppercase tracking-widest text-center">Paid on {order.paidAt.substring(0, 10)}</div>
            ) : (
              <div className="bg-red-50 text-red-800 p-3 text-sm font-bold uppercase tracking-widest text-center">Not Paid</div>
            )}
          </div>

          <div>
             {/* Order Items List */}
             <h2 className="text-xl font-serif uppercase tracking-widest mb-6">Order Items</h2>
             <div className="space-y-6">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover border border-gray-100 rounded-sm" />
                    <Link to={`/product/${item.product}`} className="text-sm font-bold hover:underline">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-sm text-gray-500 font-mono">
                    {item.qty} x ₹{item.price} = <span className="text-apples-black font-bold">₹{(item.qty * item.price).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-8 border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-serif uppercase tracking-widest mb-8 text-center">Order Summary</h2>
            <div className="space-y-4 text-sm mb-8">
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Items</span>
                <span className="font-mono">₹{order.itemsPrice}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Shipping</span>
                <span className="font-mono">₹{order.shippingPrice}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Tax</span>
                <span className="font-mono">₹{order.taxPrice}</span>
              </div>
              <div className="flex justify-between pt-4 text-lg font-bold">
                <span>Total</span>
                <span className="font-mono">₹{order.totalPrice}</span>
              </div>
            </div>

            {/* RAZORPAY BUTTON */}
            {!order.isPaid && (
              <button
                onClick={handlePayment}
                className="w-full bg-apples-black text-white py-4 uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors"
              >
                {loadingPay ? 'Processing...' : 'Pay with Razorpay'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderScreen