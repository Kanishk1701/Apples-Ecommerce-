import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      
      {/* Placeholder for Hero Section */}
      <main className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-serif text-gray-800 mb-4">The Art of Luxury</h1>
        <p className="text-gray-500 tracking-widest uppercase text-sm">Welcome to Apples</p>
      </main>
    </div>
  )
}

export default App