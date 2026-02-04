import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import VerifyScreen from './screens/VerifyScreen'
import ShippingScreen from './screens/ShippingScreen' // <--- Make sure this exists
// import PaymentScreen from './screens/PaymentScreen' <--- DELETE or COMMENT THIS OUT if it exists!

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
           {/* <Route path="/payment" element={<PaymentScreen />} /> <--- COMMENT THIS OUT */}
         </Routes>
      </main>
    </div>
  )
}

export default App