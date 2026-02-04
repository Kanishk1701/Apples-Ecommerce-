import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useProfileMutation } from '../slices/usersApiSlice'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const { data: orders, isLoading, error } = useGetMyOrdersQuery()
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [userInfo.name, userInfo.email])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      // Send only name and email (Backend handles keeping the old password)
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
      }).unwrap()
      dispatch(setCredentials({ ...res }))
      toast.success('Profile Updated Successfully')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="container mx-auto pt-10 px-4 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* LEFT COLUMN: User Profile */}
        <div className="lg:w-1/4">
          <h2 className="text-2xl font-serif uppercase tracking-widest mb-6">User Profile</h2>
          
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border-b border-gray-200 p-3 focus:outline-none focus:border-apples-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border-b border-gray-200 p-3 focus:outline-none focus:border-apples-black transition-colors"
              />
            </div>

            <button
              type="submit"
              className="bg-apples-black text-white px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              {loadingUpdateProfile ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: My Orders */}
        <div className="lg:w-3/4">
          <h2 className="text-2xl font-serif uppercase tracking-widest mb-6">My Orders</h2>
          
          {isLoading ? (
            <div>Loading Orders...</div>
          ) : error ? (
            <div className="text-red-500">{error?.data?.message || error.error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 font-serif uppercase tracking-widest">ID</th>
                    <th className="py-4 font-serif uppercase tracking-widest">Date</th>
                    <th className="py-4 font-serif uppercase tracking-widest">Total</th>
                    <th className="py-4 font-serif uppercase tracking-widest">Paid</th>
                    <th className="py-4 font-serif uppercase tracking-widest">Delivered</th>
                    <th className="py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 font-mono text-xs text-gray-500">{order._id}</td>
                      <td className="py-4">{order.createdAt.substring(0, 10)}</td>
                      <td className="py-4 font-mono">₹{order.totalPrice}</td>
                      <td className="py-4">
                        {order.isPaid ? (
                          <span className="text-green-600 font-bold text-xs uppercase bg-green-50 px-2 py-1">
                            {order.paidAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="text-red-600 font-bold text-xs uppercase bg-red-50 px-2 py-1">
                            Not Paid
                          </span>
                        )}
                      </td>
                      <td className="py-4">
                        {order.isDelivered ? (
                          <span className="text-green-600 font-bold text-xs uppercase bg-green-50 px-2 py-1">
                            {order.deliveredAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="text-gray-400 font-bold text-xs uppercase px-2 py-1">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        <Link to={`/order/${order._id}`}>
                          <button className="text-xs uppercase tracking-widest font-bold border border-gray-200 px-4 py-2 hover:bg-apples-black hover:text-white transition-colors">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen