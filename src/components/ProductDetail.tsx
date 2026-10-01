import { Product } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, MapPin, Flame, Coffee } from 'lucide-react';

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ product, isOpen, onClose, onAddToCart }: ProductDetailProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-md"
              >
                <X size={20} className="text-coffee-800" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-coffee-700 text-white text-sm font-semibold px-4 py-2 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-coffee-900">{product.name}</h2>
                <span className="text-2xl md:text-3xl font-bold text-coffee-700">₺{product.price}</span>
              </div>
              <p className="text-coffee-600 text-base md:text-lg leading-relaxed mb-6">{product.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-cream-100 rounded-xl p-3 text-center">
                  <MapPin size={20} className="text-coffee-500 mx-auto mb-1" />
                  <p className="text-xs text-coffee-500">Köken</p>
                  <p className="text-sm font-semibold text-coffee-800">{product.origin}</p>
                </div>
                <div className="bg-cream-100 rounded-xl p-3 text-center">
                  <Flame size={20} className="text-coffee-500 mx-auto mb-1" />
                  <p className="text-xs text-coffee-500">Kavrum</p>
                  <p className="text-sm font-semibold text-coffee-800">{product.roast}</p>
                </div>
                <div className="bg-cream-100 rounded-xl p-3 text-center">
                  <Coffee size={20} className="text-coffee-500 mx-auto mb-1" />
                  <p className="text-xs text-coffee-500">Aroma</p>
                  <p className="text-sm font-semibold text-coffee-800">{product.flavor}</p>
                </div>
                <div className="bg-cream-100 rounded-xl p-3 text-center">
                  <span className="text-coffee-500 text-lg">⚖️</span>
                  <p className="text-xs text-coffee-500">Ağırlık</p>
                  <p className="text-sm font-semibold text-coffee-800">{product.weight}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full bg-coffee-700 hover:bg-coffee-800 text-white py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-coffee-700/20"
              >
                <ShoppingCart size={22} />
                Sepete Ekle - ₺{product.price}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
