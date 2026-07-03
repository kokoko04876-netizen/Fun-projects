import { products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function ProductList() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">全部手機</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
