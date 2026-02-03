import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen' // <--- IMPORT THIS
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      <main className="py-3">
         <Routes>
           <Route path="/" element={<HomeScreen />} />
           <Route path="/product/:id" element={<ProductScreen />} /> {/* <--- ADD THIS */}
         </Routes>
      </main>
    </div>
  )
}

export default App