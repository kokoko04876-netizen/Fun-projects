import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout() {
  const { items, totalAmount, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', address: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  if (items.length === 0 && !submitted) {
    return <Navigate to="/cart" replace />
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = '請輸入姓名'
    if (!form.address.trim()) nextErrors.address = '請輸入地址'
    if (!form.phone.trim()) nextErrors.phone = '請輸入電話'
    else if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) nextErrors.phone = '電話格式不正確'
    return nextErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setOrderNumber(`ORD${Date.now().toString().slice(-8)}`)
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-sm p-10 mt-10">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-800">訂單已送出</h1>
        <p className="text-gray-500 mt-2">訂單編號：{orderNumber}</p>
        <p className="text-gray-500 mt-1">感謝您的購買，我們會盡快與您聯絡。</p>
        <Link
          to="/"
          className="inline-block mt-6 bg-indigo-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-indigo-700"
        >
          回到商品列表
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">結帳資訊</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl shadow-sm p-6" noValidate>
          <div>
            <label className="block text-sm text-gray-600 mb-1">姓名</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">地址</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">電話</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-lg py-3 font-medium hover:bg-indigo-700"
          >
            送出訂單
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">訂單明細</h2>
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.name} x {item.quantity}
              </span>
              <span className="text-gray-800">NT$ {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
            <span>總金額</span>
            <span className="text-indigo-600">NT$ {totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
