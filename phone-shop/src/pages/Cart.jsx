import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">購物車是空的。</p>
        <Link to="/" className="text-indigo-600 underline mt-4 inline-block">
          去逛逛商品
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">購物車</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{item.name}</p>
              <p className="text-indigo-600 font-medium mt-1">NT$ {item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <p className="w-24 text-right font-semibold text-gray-800 hidden sm:block">
              NT$ {(item.price * item.quantity).toLocaleString()}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-400 hover:text-red-500 text-sm"
              aria-label="移除商品"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-gray-500 text-sm">總金額</p>
          <p className="text-2xl font-bold text-indigo-600">NT$ {totalAmount.toLocaleString()}</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/"
            className="border border-gray-300 text-gray-600 rounded-lg px-5 py-3 text-center hover:bg-gray-50"
          >
            繼續購物
          </Link>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-indigo-600 text-white rounded-lg px-5 py-3 font-medium hover:bg-indigo-700"
          >
            前往結帳
          </button>
        </div>
      </div>
    </div>
  )
}
