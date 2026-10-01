import { Product } from '../data/products';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetail: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetail }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <span className="bg-coffee-100 text-coffee-800 text-xs font-semibold px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onViewDetail(product)}
            className="flex-1 bg-white/90 backdrop-blur-sm text-coffee-800 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors flex items-center justify-center gap-1"
          >
            <Eye size={16} />
            Detay
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-coffee-700 text-white py-2 rounded-lg text-sm font-medium hover:bg-coffee-800 transition-colors flex items-center justify-center gap-1"
          >
            <ShoppingCart size={16} />
            Sepete Ekle
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-coffee-900 mb-1">{product.name}</h3>
        <p className="text-sm text-coffee-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-cream-200 text-coffee-700 px-2 py-1 rounded-md">{product.roast}</span>
            <span className="text-xs text-coffee-500">{product.weight}</span>
          </div>
          <span className="text-xl font-bold text-coffee-700">₺{product.price}</span>
        </div>
      </div>
    </motion.div>
  );
}
