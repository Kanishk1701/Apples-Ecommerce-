import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

const Product = ({ product }) => {
  return (
    <div className="group cursor-pointer">
      {/* IMAGE CONTAINER (Overflow hidden for zoom effect) */}
      <div className="relative overflow-hidden mb-4 bg-gray-50 h-[300px] flex items-center justify-center">
         <Link to={`/product/${product._id}`}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
         </Link>
         {/* Quick Add Button (Appears on Hover) */}
         <div className="absolute bottom-0 w-full bg-apples-black text-white text-center py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 uppercase text-xs tracking-widest font-bold">
            Quick View
         </div>
      </div>

      {/* TEXT DETAILS */}
      <div className="text-center space-y-1">
        <div className="text-xs text-gray-500 uppercase tracking-widest">{product.brand}</div>
        <Link to={`/product/${product._id}`}>
            <h3 className="text-sm font-serif font-bold text-gray-900 group-hover:text-apples-gold transition-colors">
            {product.name}
            </h3>
        </Link>
        <div className="text-sm font-medium text-gray-800">
           ₹{product.price.toLocaleString('en-IN')}
        </div>
      </div>
    </div>
  )
}

export default Product