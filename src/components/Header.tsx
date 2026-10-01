import { motion } from 'framer-motion';
import { Search, ShoppingBag, Coffee } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ cartCount, onCartClick, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-cream-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="bg-coffee-700 p-2 rounded-xl">
              <Coffee size={24} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-coffee-900 leading-tight">Artisan Coffee</h1>
              <p className="text-xs text-coffee-500">Premium Kahve Deneyimi</p>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 max-w-md"
          >
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" />
              <input
                type="text"
                placeholder="Kahve ara..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none transition-all text-sm"
              />
            </div>
          </motion.div>

          {/* Cart Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={onCartClick}
            className="relative bg-coffee-700 hover:bg-coffee-800 text-white p-3 rounded-xl transition-colors shrink-0"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
