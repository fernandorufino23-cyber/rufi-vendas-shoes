import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

export function ProductCard({ product, onBuy }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-glow">
      {/* Badge */}
      {discount && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
          -{discount}%
        </div>
      )}
      
      {/* Image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl text-muted-foreground/30">RUFI</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <Button
            onClick={() => onBuy(product)}
            className="bg-gradient-primary hover:opacity-90 shadow-glow"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Comprar
          </Button>
        </div>
      </div>
      
      {/* Info */}
      <div className="p-5">
        <span className="text-xs uppercase tracking-wider text-primary font-semibold">
          {product.category === 'tenis' ? 'Tênis' : product.category === 'sapatos' ? 'Sapatos' : 'Acessórios'}
        </span>
        <h3 className="font-display text-xl mt-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-3 mt-4">
          <span className="font-display text-2xl text-gradient">
            {product.price.toLocaleString('pt-AO')} Kz
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice.toLocaleString('pt-AO')} Kz
            </span>
          )}
        </div>
        
        {product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.sizes.slice(0, 5).map(size => (
              <span key={size} className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground">
                {size}
              </span>
            ))}
            {product.sizes.length > 5 && (
              <span className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground">
                +{product.sizes.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
