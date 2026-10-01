import { Product } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-cream-200 flex items-center justify-between bg-cream-50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-coffee-700" size={24} />
                <h2 className="text-xl font-bold text-coffee-900">Sepetim</h2>
                {totalItems > 0 && (
                  <span className="bg-coffee-700 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-cream-200 rounded-full transition-colors"
              >
                <X size={20} className="text-coffee-700" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-coffee-400">
                  <ShoppingBag size={64} className="mb-4 opacity-50" />
                  <p className="text-lg font-medium">Sepetiniz boş</p>
                  <p className="text-sm mt-1">Kahvelerimizi keşfedin!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 bg-cream-50 rounded-xl p-3"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-coffee-900 text-sm">{item.product.name}</h3>
                          <p className="text-xs text-coffee-500">{item.product.weight}</p>
                          <p className="text-coffee-700 font-bold mt-1">₺{item.product.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-white border border-coffee-200 flex items-center justify-center hover:bg-coffee-100 transition-colors"
                            >
                              <Minus size={14} className="text-coffee-700" />
                            </button>
                            <span className="text-sm font-semibold text-coffee-800 w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-white border border-coffee-200 flex items-center justify-center hover:bg-coffee-100 transition-colors"
                            >
                              <Plus size={14} className="text-coffee-700" />
                            </button>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="ml-auto p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} className="text-red-400 hover:text-red-600" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-cream-200 bg-cream-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-coffee-600">Toplam</span>
                  <span className="text-2xl font-bold text-coffee-900">₺{total}</span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full bg-coffee-700 hover:bg-coffee-800 text-white py-4 rounded-xl font-semibold transition-colors shadow-lg shadow-coffee-700/20"
                >
                  Siparişi Tamamla
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
