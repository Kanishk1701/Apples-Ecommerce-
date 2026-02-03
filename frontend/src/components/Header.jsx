import { FaSearch, FaRegHeart, FaShoppingBag, FaUser } from 'react-icons/fa'
import { useState } from 'react'

const Header = () => {
  // Simple state to simulate different dropdown content
  const [activeCategory, setActiveCategory] = useState(null)

  const navLinks = [
    { name: 'New & Trending', sub: ['Latest Drops', 'Best Sellers', 'Summer Collection', 'Exclusives'] },
    { name: 'Designers', sub: ['Gucci', 'Prada', 'Burberry', 'Saint Laurent', 'Versace'] },
    { name: 'Men', sub: ['Clothing', 'Shoes', 'Watches', 'Accessories', 'Grooming'] },
    { name: 'Women', sub: ['Dresses', 'Handbags', 'Jewelry', 'Shoes', 'Beauty'] },
    { name: 'Beauty', sub: ['Fragrance', 'Makeup', 'Skincare', 'Men\'s Grooming'] },
    { name: 'Watches', sub: ['Rolex', 'Patek Philippe', 'Omega', 'Cartier'] },
    { name: 'Home', sub: ['Decor', 'Furniture', 'Kitchen', 'Tech'] },
  ]

  return (
    <header className="w-full bg-white border-b border-gray-100 relative z-50">
      {/* 1. TOP UTILITY BAR (Like Harrods: Currency, Country) */}
      <div className="bg-apples-black text-white text-xs py-2 px-8 flex justify-between tracking-widest">
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-gray-300">🇮🇳 India (INR)</span>
          <span className="cursor-pointer hover:text-gray-300">Customer Service</span>
        </div>
        <div>
          <span className="cursor-pointer hover:text-gray-300">Find a Store</span>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo & Icons) */}
      <div className="container mx-auto px-12 py-6 flex justify-between items-center">
        {/* Search */}
        <div className="flex items-center gap-2 border-b border-gray-300 pb-1 w-1/4">
          <FaSearch className="text-gray-500 text-sm" />
          <input 
            type="text" 
            placeholder="Search Apples..." 
            className="w-full outline-none text-sm placeholder-gray-400 font-sans"
          />
        </div>

        {/* LOGO - The "Harrods" Vibe */}
        <div className="text-4xl font-serif font-bold tracking-wider text-center w-1/2 cursor-pointer">
          APPLES
        </div>

        {/* ICONS (Account, Wishlist, Bag) */}
        <div className="flex justify-end gap-6 w-1/4 text-gray-700">
          <div className="flex flex-col items-center cursor-pointer hover:text-black">
            <FaUser className="text-lg mb-1" />
            <span className="text-[10px] uppercase tracking-wider font-bold">Sign In</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-black">
            <FaRegHeart className="text-lg mb-1" />
            <span className="text-[10px] uppercase tracking-wider font-bold">Wishlist</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-black">
            <FaShoppingBag className="text-lg mb-1" />
            <span className="text-[10px] uppercase tracking-wider font-bold">Bag</span>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR (The Mega Menu) */}
      <nav className="border-t border-gray-100">
        <ul className="flex justify-center gap-8 py-4 text-sm font-bold tracking-widest uppercase text-gray-800">
          {navLinks.map((link) => (
            <li 
              key={link.name} 
              className="group relative cursor-pointer"
            >
              <span className="hover:text-apples-gold transition-colors py-4 block">
                {link.name}
              </span>

              {/* THE HOVER DROPDOWN (Mega Menu) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-[600px] bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-8 flex justify-between">
                
                {/* Column 1: Categories */}
                <div className="w-1/3">
                  <h4 className="font-serif text-lg mb-4 border-b border-gray-200 pb-2">Shop {link.name}</h4>
                  <ul className="space-y-2">
                    {link.sub.map((item) => (
                      <li key={item} className="text-gray-500 hover:text-black text-xs font-sans capitalize transition-colors">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Featured Image (Dummy) */}
                <div className="w-2/3 pl-8">
                   <div className="bg-gray-100 h-full flex items-center justify-center text-gray-400 text-xs italic">
                     [Featured {link.name} Collection Image]
                   </div>
                </div>

              </div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header