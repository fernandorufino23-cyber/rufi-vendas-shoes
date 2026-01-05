import { Star, TrendingUp } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { useToast } from '@/hooks/use-toast';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { toast } = useToast();
  const featured = products.filter(p => p.featured).slice(0, 3);

  if (featured.length === 0) return null;

  const handleBuy = (product: Product) => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no produto:\n\n*${product.name}*\nPreço: ${product.price.toLocaleString('pt-AO')} Kz\n\nGostaria de mais informações!`
    );
    window.open(`https://wa.me/244935126871?text=${message}`, '_blank');
    toast({
      title: "Redirecionando...",
      description: "Você será direcionado para o WhatsApp.",
    });
  };

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
              <ProductCard product={product} onBuy={handleBuy} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
