export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  origin: string;
  roast: string;
  flavor: string;
  image: string;
  weight: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Etiyopya Yirgacheffe",
    description: "Çiçeksi ve meyveli notalarla zenginleştirilmiş, parlak asiditeye sahip özel bir Etiyopya kahvesi. Mavi dağ çiçekleri ve bergamot aromaları hissedilir.",
    price: 189,
    category: "Tek Kökenli",
    origin: "Etiyopya",
    roast: "Açık Kavrum",
    flavor: "Meyveli, Çiçeksi",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    weight: "250g"
  },
  {
    id: 2,
    name: "Kolombiya Supremo",
    description: "Karamel ve çikolata notalarıyla dengeli bir gövdeye sahip, orta gövdeli bir Kolombiya kahvesi. Her yudumda yumuşak bir tat deneyimi sunar.",
    price: 159,
    category: "Tek Kökenli",
    origin: "Kolombiya",
    roast: "Orta Kavrum",
    flavor: "Karamel, Çikolata",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=400&h=400&fit=crop",
    weight: "250g"
  },
  {
    id: 3,
    name: "İtalyan Espresso Harmanı",
    description: "Geleneksel İtalyan espresso kültüründen ilham alan, yoğun ve kremsi bir harman. Koyu çikolata ve fındık notalarıyla damakta iz bırakır.",
    price: 175,
    category: "Harman",
    origin: "Brezilya & Endonezya",
    roast: "Koyu Kavrum",
    flavor: "Koyu Çikolata, Fındık",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=400&h=400&fit=crop",
    weight: "250g"
  },
  {
    id: 4,
    name: "Sumatra Mandheling",
    description: "Topraksı ve baharatlı karakteriyle bilinen, düşük asiditeli ve yoğun gövdeli bir Endonezya kahvesi. Sedir ağacı ve kakao aromaları ön planda.",
    price: 199,
    category: "Tek Kökenli",
    origin: "Endonezya",
    roast: "Orta-Koyu Kavrum",
    flavor: "Topraksı, Baharatlı",
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=400&fit=crop",
    weight: "250g"
  },
  {
    id: 5,
    name: "Sabah Harmanı",
    description: "Güne başlamak için ideal, dengeli ve yumuşak bir harman. Hafif tatlılık ve pürüzsüz bir bitiş ile her sabahın vazgeçilmezi olacak.",
    price: 139,
    category: "Harman",
    origin: "Brezilya & Guatemala",
    roast: "Orta Kavrum",
    flavor: "Hafif Tatlı, Pürüzsüz",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=400&fit=crop",
    weight: "250g"
  },
  {
    id: 6,
    name: "Guatemala Antigua",
    description: "Volkanik topraklarda yetişen bu kahve, kakao ve hafif baharat notalarıyla zengin bir tat profiline sahiptir. Orta gövdeli ve kompleks bir deneyim sunar.",
    price: 179,
    category: "Premium",
    origin: "Guatemala",
    roast: "Orta Kavrum",
    flavor: "Kakao, Baharat",
    image: "https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?w=400&h=400&fit=crop",
    weight: "250g"
  }
];

export const categories = ["Tümü", "Tek Kökenli", "Harman", "Premium"];
