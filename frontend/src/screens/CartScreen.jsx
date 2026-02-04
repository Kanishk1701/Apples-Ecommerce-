import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash, FaArrowRight } from 'react-icons/fa'
import { addToCart, removeFromCart } from '../slices/cartSlice'

const CartScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <div className="container mx-auto px-12 py-16">
            <h1 className="text-3xl font-serif mb-12 uppercase tracking-widest text-center">
                Shopping Bag
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500">
                    Your bag is empty. <Link to="/" className="text-apples-black underline font-bold">Start Shopping</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* LEFT COLUMN: Items */}
                    <div className="md:col-span-2 space-y-8">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex gap-6 border-b border-gray-100 pb-8 items-center">
                                {/* Image */}
                                <div className="w-24 h-24 bg-gray-50 p-2">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 space-y-1">
                                    <Link to={`/product/${item._id}`} className="font-serif text-lg text-gray-900 hover:text-apples-gold transition-colors">
                                        {item.name}
                                    </Link>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">{item.brand}</p>
                                </div>

                                {/* Price */}
                                <div className="font-medium text-gray-900 w-32 text-right">
                                    ₹{item.price.toLocaleString('en-IN')}
                                </div>

                                {/* Quantity */}
                                <select
                                    className="border border-gray-300 p-2 text-sm outline-none cursor-pointer"
                                    value={item.qty}
                                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>

                                {/* NEW: Remove Button */}
                                <button
                                    onClick={() => removeFromCartHandler(item._id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors ml-4 p-2"
                                    title="Remove Item"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: Summary */}
                    <div className="bg-gray-50 p-8 h-fit">
                        <h2 className="text-lg font-serif mb-6 uppercase tracking-widest">Order Summary</h2>
                        <div className="flex justify-between mb-4 text-sm">
                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                            <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-sm">
                            <span>Delivery</span>
                            <span>Free</span>
                        </div>
                        <div className="border-t border-gray-200 my-4"></div>
                        <div className="flex justify-between mb-8 text-lg font-bold">
                            <span>Total</span>
                            <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}</span>
                        </div>
                        <button
                            onClick={checkoutHandler}
                            className="w-full bg-apples-black text-white py-4 uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
                        >
                            Checkout <FaArrowRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartScreen