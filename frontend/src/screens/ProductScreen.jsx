import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft, FaStar } from 'react-icons/fa'

const ProductScreen = () => {
  const [product, setProduct] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`)
      setProduct(data)
    }

    fetchProduct()
  }, [id])

  return (
    <div className="container mx-auto px-12 py-12">
      {/* BACK BUTTON */}
      <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors uppercase tracking-widest">
        <FaArrowLeft /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* LEFT COLUMN: THE IMAGERY */}
        <div className="bg-gray-50 flex items-center justify-center p-8 h-[600px]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain mix-blend-multiply"
          />
        </div>

        {/* RIGHT COLUMN: THE DETAILS */}
        <div className="space-y-6">
          <div className="space-y-2">
             <h3 className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                {product.brand}
             </h3>
             <h1 className="text-4xl font-serif text-gray-900 leading-tight">
                {product.name}
             </h1>
          </div>

          <div className="text-2xl font-medium text-gray-900">
             ₹{product.price?.toLocaleString('en-IN')}
          </div>

          <p className="text-gray-600 leading-relaxed font-sans text-sm tracking-wide border-t border-b border-gray-100 py-6">
            {product.description}
          </p>

          {/* STOCK STATUS */}
          <div className="text-xs uppercase tracking-widest font-bold">
            Status: 
            <span className={product.countInStock > 0 ? 'text-green-700 ml-2' : 'text-red-700 ml-2'}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* ADD TO BAG BUTTON */}
          <button 
            className="w-full bg-apples-black text-white py-4 uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={product.countInStock === 0}
          >
            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Shopping Bag'}
          </button>
          
          <div className="text-xs text-gray-400 text-center pt-4">
             Free Delivery & Returns available on all orders.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen