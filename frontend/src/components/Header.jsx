import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { FaShoppingBag, FaHeart, FaUser, FaSearch, FaSignOutAlt } from 'react-icons/fa'
import { useState } from 'react'

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [logoutApiCall] = useLogoutMutation()
  
  // State for Dropdowns
  const [showDropdown, setShowDropdown] = useState(false)
  const [showAdminDropdown, setShowAdminDropdown] = useState(false) // <--- NEW: Admin State

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      setShowDropdown(false)
      navigate('/login')
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
          
          {/* 1. ADMIN MENU (Only shows if isAdmin is true) */}
          {userInfo && userInfo.isAdmin && (
            <div className="relative">
              <button
                onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                className="flex flex-col items-center gap-1 hover:text-black transition-colors"
              >
                <span className="font-serif text-[10px] border border-gray-300 px-2 py-1 uppercase hover:bg-black hover:text-white transition-all">
                  Admin
                </span>
              </button>

              {showAdminDropdown && (
                <div className="absolute right-0 mt-4 w-48 bg-apples-black text-white shadow-xl py-2 z-50">
                   <div className="px-6 py-2 border-b border-gray-700 mb-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Management</p>
                  </div>
                  
                  <Link 
                    to="/admin/productlist" 
                    className="block px-6 py-3 hover:bg-gray-800 text-sm"
                    onClick={() => setShowAdminDropdown(false)}
                  >
                    Products
                  </Link>
                  <Link 
                    to="/admin/userlist" 
                    className="block px-6 py-3 hover:bg-gray-800 text-sm"
                    onClick={() => setShowAdminDropdown(false)}
                  >
                    Users
                  </Link>
                  <Link 
                    to="/admin/orderlist" 
                    className="block px-6 py-3 hover:bg-gray-800 text-sm"
                    onClick={() => setShowAdminDropdown(false)}
                  >
                    Orders
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* 2. USER SECTION */}
          {userInfo ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex flex-col items-center gap-1 hover:text-black transition-colors"
              >
                <FaUser className="text-lg mb-1" />
                <span>{userInfo.name.split(' ')[0]}</span>
              </button>

              {/* USER DROPDOWN MENU */}
              {showDropdown && (
                <div className="absolute right-0 mt-4 w-48 bg-white border border-gray-100 shadow-xl py-2 z-50">
                  
                  <div className="px-6 py-4 border-b border-gray-50 mb-2">
                    <p className="text-[10px] text-gray-400">Signed in as</p>
                    <p className="text-apples-black font-bold truncate">{userInfo.email}</p>
                  </div>
                  
                  <Link 
                    to="/profile" 
                    className="w-full text-left px-6 py-3 text-gray-600 hover:bg-gray-50 flex items-center gap-2 hover:text-apples-black"
                    onClick={() => setShowDropdown(false)}
                  >
                    <FaUser className="text-sm" /> Profile
                  </Link>

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

          {/* 3. Wishlist */}
          <Link to="/wishlist" className="flex flex-col items-center gap-1 hover:text-black transition-colors">
            <FaHeart className="text-lg mb-1" />
            <span>Wishlist</span>
          </Link>

          {/* 4. Cart / Bag */}
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