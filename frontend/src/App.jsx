import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import CartScreen from './screens/CartScreen'
import ProductScreen from './screens/ProductScreen'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      <main className="py-3">
         <Routes>
           <Route path="/" element={<HomeScreen />} />
           <Route path="/product/:id" element={<ProductScreen />} />
           <Route path="/cart" element={<CartScreen />} />
         </Routes>
      </main>
    </div>
  )
}

export default App