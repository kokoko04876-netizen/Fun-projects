import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`}>
        <img src={product.images[0]} alt={product.name} className="w-full aspect-square object-cover" />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="font-semibold text-gray-800 hover:text-indigo-600">
          {product.name}
        </Link>
        <p className="text-sm text-gray-500 mt-1">{product.shortSpec}</p>
        <p className="text-lg font-bold text-indigo-600 mt-2">NT$ {product.price.toLocaleString()}</p>
        <div className="mt-auto pt-3 flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center text-sm border border-indigo-600 text-indigo-600 rounded-lg py-2 hover:bg-indigo-50"
          >
            查看詳情
          </Link>
          <button
            onClick={() => addToCart(product, 1)}
            className="flex-1 text-sm bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  )
}
