import { TrendingUp } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export function FeaturedProducts({ products, onProductSelect }: FeaturedProductsProps) {
  const featured = products.filter(p => p.featured).slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-primary" />
          <span className="text-primary font-semibold uppercase tracking-wider">Em Alta</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-center mb-12">
          PRODUTOS <span className="text-gradient">DESTAQUE</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featured.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <ProductCard product={product} onBuy={onProductSelect} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
