import { useState, useMemo } from 'react';
import { products, Product } from './data/products';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart, { CartItem } from './components/Cart';
import Checkout from './components/Checkout';
import CategoryFilter from './components/CategoryFilter';
import { motion } from 'framer-motion';
import { Coffee, Truck, Shield, Heart } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flavor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Tümü' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showNotification(`${product.name} sepete eklendi! ☕`);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setTimeout(() => setIsCheckoutOpen(true), 300);
  };

  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    showNotification('Siparişiniz başarıyla tamamlandı! 🎉');
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-coffee-800 via-coffee-700 to-coffee-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-coffee-300 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-coffee-400 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Coffee size={28} className="text-coffee-300" />
              <span className="text-coffee-300 text-sm font-medium tracking-widest uppercase">Premium Kahve Deneyimi</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Her Yudumda<br />
              <span className="text-coffee-300">Bir Hikaye</span>
            </h1>
            <p className="text-coffee-200 text-base md:text-lg max-w-xl mx-auto mb-8">
              Dünyanın en seçkin kahve bölgelerinden özenle seçilmiş, taze kavrulmuş özel kahvelerimizi keşfedin.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-coffee-300" />
                <span>200₺ Üzeri Ücretsiz Kargo</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-coffee-300" />
                <span>Tazelik Garantisi</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-coffee-300" />
                <span>%100 Organik</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-coffee-900 mb-4">Kahve Koleksiyonumuz</h2>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Coffee size={64} className="text-coffee-300 mx-auto mb-4" />
            <p className="text-xl text-coffee-600 font-medium">Aradığınız kahveyi bulamadık</p>
            <p className="text-coffee-400 mt-1">Farklı bir arama terimi veya kategori deneyin</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  onViewDetail={(p) => {
                    setSelectedProduct(p);
                    setIsDetailOpen(true);
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-coffee-900 text-white py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Coffee size={24} className="text-coffee-300" />
                <span className="text-lg font-bold">Artisan Coffee</span>
              </div>
              <p className="text-coffee-300 text-sm">
                Her bir kahve çekirdeği, dünyanın en iyi kahve bölgelerinden özenle seçilir ve taze kavrulur.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-coffee-200">İletişim</h3>
              <p className="text-coffee-400 text-sm">info@artisancoffee.com</p>
              <p className="text-coffee-400 text-sm">+90 212 555 0000</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-coffee-200">Çalışma Saatleri</h3>
              <p className="text-coffee-400 text-sm">Pazartesi - Cumartesi: 08:00 - 22:00</p>
              <p className="text-coffee-400 text-sm">Pazar: 09:00 - 20:00</p>
            </div>
          </div>
          <div className="border-t border-coffee-800 mt-8 pt-6 text-center text-coffee-500 text-sm">
            © 2026 Artisan Coffee. Tüm hakları saklıdır. ☕
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={addToCart}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onComplete={handleCheckoutComplete}
      />

      {/* Notification Toast */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-6 left-1/2 bg-coffee-800 text-white px-6 py-3 rounded-xl shadow-2xl z-50 text-sm font-medium"
        >
          {notification}
        </motion.div>
      )}
    </div>
  );
}

export default App;
