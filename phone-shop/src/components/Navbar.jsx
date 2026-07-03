import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { totalCount } = useCart()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          📱 手機商店
        </Link>
        <Link to="/cart" className="relative flex items-center gap-1 text-gray-700 hover:text-indigo-600">
          <span className="text-2xl">🛒</span>
          {totalCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
