import { motion } from 'framer-motion';
import { categories } from '../data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-coffee-700 text-white shadow-lg shadow-coffee-700/20'
              : 'bg-white text-coffee-700 border border-cream-300 hover:border-coffee-300 hover:bg-cream-50'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
