import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify' // <--- 1. Import Container
import 'react-toastify/dist/ReactToastify.css'  // <--- 2. Import CSS

import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import VerifyScreen from './screens/VerifyScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'

function App() {
  const location = useLocation()
  const hideHeaderRoutes = ['/login', '/register', '/verify']
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname)

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {shouldShowHeader && <Header />}
      
      <main className={shouldShowHeader ? "py-3" : ""}>
         <Routes>
           <Route path="/" element={<HomeScreen />} />
           <Route path="/product/:id" element={<ProductScreen />} />
           <Route path="/cart" element={<CartScreen />} />
           <Route path="/login" element={<LoginScreen />} />
           <Route path="/register" element={<RegisterScreen />} />
           <Route path="/verify" element={<VerifyScreen />} />
           <Route path="/shipping" element={<ShippingScreen />} />
           <Route path="/payment" element={<PaymentScreen />} />
           <Route path="/placeorder" element={<PlaceOrderScreen />} />
         </Routes>
      </main>

      {/* 3. Add the Container here so popups work everywhere */}
      <ToastContainer />
    </div>
  )
}

export default App