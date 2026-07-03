import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = products.find((p) => p.id === id)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">找不到這個商品。</p>
        <Link to="/" className="text-indigo-600 underline mt-4 inline-block">
          回到商品列表
        </Link>
      </div>
    )
  }

  function handleAddToCart() {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleBuyNow() {
    addToCart(product, quantity)
    navigate('/cart')
  }

  return (
    <div>
      <Link to="/" className="text-sm text-indigo-600 hover:underline">
        ← 回商品列表
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div>
          <img
            src={product.images[activeImage]}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-xl shadow-sm"
          />
          <div className="flex gap-2 mt-3">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  activeImage === index ? 'border-indigo-600' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.brand}</p>
          <p className="text-3xl font-bold text-indigo-600 mt-4">NT$ {product.price.toLocaleString()}</p>

          <table className="w-full text-sm mt-6 border-t border-gray-200">
            <tbody>
              {Object.entries(product.specs).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-500 w-28 align-top">{key}</td>
                  <td className="py-2 text-gray-800">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center gap-3 mt-6">
            <span className="text-gray-600 text-sm">數量</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-10 text-center">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="w-9 h-9 text-gray-600 hover:bg-gray-100">
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white rounded-lg py-3 font-medium hover:bg-indigo-700"
            >
              {added ? '已加入購物車 ✓' : '加入購物車'}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 border border-indigo-600 text-indigo-600 rounded-lg py-3 font-medium hover:bg-indigo-50"
            >
              直接購買
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
