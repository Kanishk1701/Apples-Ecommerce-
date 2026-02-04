import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux' // To read user info
import { useLogoutMutation } from '../slices/usersApiSlice' // To call backend
import { logout } from '../slices/authSlice' // To clear local memory
import { FaShoppingBag, FaHeart, FaUser, FaSearch, FaSignOutAlt } from 'react-icons/fa'
import { useState } from 'react'

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [logoutApiCall] = useLogoutMutation()
  const [showDropdown, setShowDropdown] = useState(false) // Toggle for the menu

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap() // 1. Tell Backend to kill cookie
      dispatch(logout())             // 2. Clear Frontend memory
      setShowDropdown(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
      {/* Top Bar - Utility */}
      <div className="bg-apples-black text-white text-[10px] py-2 uppercase tracking-widest text-center font-bold">
        Complimentary Shipping & Returns on all orders
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-12 py-6 flex justify-between items-center">
        
        {/* Search (Left) */}
        <div className="flex items-center gap-4 flex-1">
           <FaSearch className="text-gray-400 text-sm" />
           <input 
             type="text" 
             placeholder="Search Apples..." 
             className="text-sm border-b border-transparent focus:border-gray-300 focus:outline-none transition-all w-48 placeholder-gray-400 font-light"
           />
        </div>

        {/* Logo (Center) */}
        <div className="flex-1 text-center">
          <Link to="/" className="text-4xl font-serif font-bold tracking-wider text-apples-black">
            APPLES
          </Link>
        </div>

        {/* Icons (Right) */}
        <div className="flex items-center justify-end gap-8 flex-1 text-xs font-bold uppercase tracking-widest text-gray-600">
          
          {/* USER SECTION */}
          {userInfo ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex flex-col items-center gap-1 hover:text-black transition-colors"
              >
                <FaUser className="text-lg mb-1" />
                <span>{userInfo.name.split(' ')[0]}</span> {/* Show First Name */}
              </button>

              {/* DROPDOWN MENU */}
              {/* DROPDOWN MENU */}
              {showDropdown && (
                <div className="absolute right-0 mt-4 w-48 bg-white border border-gray-100 shadow-xl py-2 z-50">
                  
                  {/* 1. User Email Info */}
                  <div className="px-6 py-4 border-b border-gray-50 mb-2">
                    <p className="text-[10px] text-gray-400">Signed in as</p>
                    <p className="text-apples-black font-bold truncate">{userInfo.email}</p>
                  </div>
                  
                  {/* 2. NEW: Profile Link */}
                  <Link 
                    to="/profile" 
                    className="w-full text-left px-6 py-3 text-gray-600 hover:bg-gray-50 flex items-center gap-2 hover:text-apples-black"
                    onClick={() => setShowDropdown(false)} // Close menu when clicked
                  >
                    <FaUser className="text-sm" /> Profile
                  </Link>

                  {/* 3. Sign Out Button */}
                  <button 
                    onClick={logoutHandler}
                    className="w-full text-left px-6 py-3 text-red-600 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex flex-col items-center gap-1 hover:text-black transition-colors">
              <FaUser className="text-lg mb-1" />
              <span>Sign In</span>
            </Link>
          )}

          <Link to="/wishlist" className="flex flex-col items-center gap-1 hover:text-black transition-colors">
            <FaHeart className="text-lg mb-1" />
            <span>Wishlist</span>
          </Link>

          <Link to="/cart" className="flex flex-col items-center gap-1 hover:text-black transition-colors relative">
            <FaShoppingBag className="text-lg mb-1" />
            <span>Bag</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-apples-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header