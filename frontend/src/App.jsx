import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import AdminRoute from './components/AdminRoute' // <--- 1. Import This

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import VerifyScreen from './screens/VerifyScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import ProfileScreen from './screens/ProfileScreen'

function App() {
  const location = useLocation()
  const hideHeaderRoutes = ['/login', '/register', '/verify', '/shipping', '/payment', '/placeorder']
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname)

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {shouldShowHeader && <Header />}
      
      <main className={shouldShowHeader ? "py-3" : ""}>
         <Routes>
           {/* Public Routes */}
           <Route path="/" element={<HomeScreen />} />
           <Route path="/product/:id" element={<ProductScreen />} />
           <Route path="/cart" element={<CartScreen />} />
           <Route path="/login" element={<LoginScreen />} />
           <Route path="/register" element={<RegisterScreen />} />
           <Route path="/verify" element={<VerifyScreen />} />

           {/* Private Routes (Logged In Users) */}
           <Route path="/shipping" element={<ShippingScreen />} />
           <Route path="/payment" element={<PaymentScreen />} />
           <Route path="/placeorder" element={<PlaceOrderScreen />} />
           <Route path="/order/:id" element={<OrderScreen />} />
           <Route path="/profile" element={<ProfileScreen />} />

           {/* ADMIN ROUTES (Managers Only) */}
           <Route path="" element={<AdminRoute />}>
              {/* We will create this file in the next step! */}
              {/* <Route path="/admin/productlist" element={<ProductListScreen />} /> */}
           </Route>

         </Routes>
      </main>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
        toastClassName="premium-toast"
      />
    </div>
  )
}

export default App