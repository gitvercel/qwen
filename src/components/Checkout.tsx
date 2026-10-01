import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import { CartItem } from './Cart';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

type Step = 'info' | 'payment' | 'success';

export default function Checkout({ isOpen, onClose, items, onComplete }: CheckoutProps) {
  const [step, setStep] = useState<Step>('info');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = total > 200 ? 0 : 25;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      onComplete();
      setStep('info');
      setFormData({
        name: '', email: '', address: '', city: '', phone: '',
        cardNumber: '', cardExpiry: '', cardCvv: '', cardName: ''
      });
    }, 3000);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep('info'), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-cream-200 flex items-center justify-between bg-cream-50 rounded-t-3xl">
              <div className="flex items-center gap-3">
                {step !== 'info' && step !== 'success' && (
                  <button onClick={() => setStep('info')} className="p-1 hover:bg-cream-200 rounded-full">
                    <ArrowLeft size={20} className="text-coffee-700" />
                  </button>
                )}
                <h2 className="text-xl font-bold text-coffee-900">
                  {step === 'info' && 'Teslimat Bilgileri'}
                  {step === 'payment' && 'Ödeme'}
                  {step === 'success' && 'Sipariş Onayı'}
                </h2>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-cream-200 rounded-full transition-colors">
                <X size={20} className="text-coffee-700" />
              </button>
            </div>

            {/* Progress */}
            {step !== 'success' && (
              <div className="px-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className={`flex-1 h-1 rounded-full ${step === 'info' ? 'bg-coffee-300' : 'bg-coffee-700'}`} />
                  <div className={`flex-1 h-1 rounded-full ${step === 'payment' ? 'bg-coffee-700' : 'bg-cream-200'}`} />
                </div>
              </div>
            )}

            <div className="p-6">
              {/* Step 1: Info */}
              {step === 'info' && (
                <form onSubmit={handleSubmitInfo} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Ad Soyad</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none transition-all bg-cream-50"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">E-posta</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none transition-all bg-cream-50"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none transition-all bg-cream-50"
                      placeholder="0555 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Adres</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none transition-all bg-cream-50 resize-none"
                      placeholder="Mahalle, sokak, bina no, daire no"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Şehir</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none transition-all bg-cream-50"
                      placeholder="İstanbul"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-coffee-700 hover:bg-coffee-800 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 mt-6"
                  >
                    <Truck size={20} />
                    Ödemeye Geç
                  </button>
                </form>
              )}

              {/* Step 2: Payment */}
              {step === 'payment' && (
                <form onSubmit={handleSubmitPayment} className="space-y-4">
                  <div className="bg-cream-100 rounded-xl p-4 mb-4">
                    <h3 className="font-semibold text-coffee-800 mb-2">Sipariş Özeti</h3>
                    {items.map(item => (
                      <div key={item.product.id} className="flex justify-between text-sm text-coffee-600 py-1">
                        <span>{item.product.name} x{item.quantity}</span>
                        <span>₺{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="border-t border-coffee-200 mt-2 pt-2 flex justify-between text-sm">
                      <span className="text-coffee-600">Kargo</span>
                      <span className="text-coffee-600">{shipping === 0 ? 'Ücretsiz' : `₺${shipping}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-coffee-900 mt-1">
                      <span>Toplam</span>
                      <span>₺{total + shipping}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Kart Üzerindeki İsim</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none transition-all bg-cream-50"
                      placeholder="AD SOYAD"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Kart Numarası</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none transition-all bg-cream-50 font-mono"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-coffee-700 mb-1">Son Kullanma</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        required
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none transition-all bg-cream-50 font-mono"
                        placeholder="AA/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-coffee-700 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        required
                        maxLength={3}
                        className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none transition-all bg-cream-50 font-mono"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-coffee-700 hover:bg-coffee-800 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 mt-6"
                  >
                    <CreditCard size={20} />
                    ₺{total + shipping} Öde
                  </button>
                </form>
              )}

              {/* Step 3: Success */}
              {step === 'success' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-coffee-900 mb-2">Siparişiniz Alındı!</h3>
                  <p className="text-coffee-600">
                    Sipariş numaranız: <span className="font-bold text-coffee-800">#AC{Math.floor(Math.random() * 90000 + 10000)}</span>
                  </p>
                  <p className="text-sm text-coffee-500 mt-2">
                    Kahveniz özenle hazırlanıp kargoya verilecektir.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-coffee-500">
                    <span className="animate-pulse">☕</span>
                    <span className="text-sm">Afiyet olsun!</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
