import { Routes, Route, useLocation } from 'react-router-dom' // Import useLocation
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import VerifyScreen from './screens/VerifyScreen'

function App() {
  const location = useLocation()
  
  // List of routes where we want to hide the Header
  const hideHeaderRoutes = ['/login', '/register', '/verify']
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname)

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Only show Header if we are NOT on login/register page */}
      {shouldShowHeader && <Header />}
      
      <main className={shouldShowHeader ? "py-3" : ""}>
         <Routes>
           <Route path="/" element={<HomeScreen />} />
           <Route path="/product/:id" element={<ProductScreen />} />
           <Route path="/cart" element={<CartScreen />} />
           <Route path="/login" element={<LoginScreen />} />
           <Route path="/register" element={<RegisterScreen />} />
           <Route path="/verify" element={<VerifyScreen />} />
         </Routes>
      </main>
    </div>
  )
}

export default App