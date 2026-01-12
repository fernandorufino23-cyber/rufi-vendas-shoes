import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

// Mapeamento de cores
const colorMap: Record<string, string> = {
  preto: '#000000',
  branco: '#FFFFFF',
  vermelho: '#EF4444',
  azul: '#3B82F6',
  verde: '#22C55E',
  amarelo: '#EAB308',
  laranja: '#F97316',
  rosa: '#EC4899',
  roxo: '#A855F7',
  cinza: '#6B7280',
  marrom: '#92400E',
  bege: '#D4A574',
  dourado: '#FFD700',
  prata: '#C0C0C0',
};

function getColorValue(colorName: string): string {
  const normalized = colorName.toLowerCase().trim();
  return colorMap[normalized] || '#888888';
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
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
              const fallback = document.createElement('span');
              fallback.className = 'font-display text-4xl text-muted-foreground/30';
              fallback.textContent = 'RUFI';
              target.parentElement?.appendChild(fallback);
            }}
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
            Fazer Pedido
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

        {/* Colors Preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 mt-3">
            <span className="text-xs text-muted-foreground mr-1">Cores:</span>
            {product.colors.slice(0, 5).map(color => (
              <span
                key={color}
                className="w-5 h-5 rounded-full border border-border"
                style={{ backgroundColor: getColorValue(color) }}
                title={color}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}
        
        {/* Sizes Preview */}
        {product.sizes && product.sizes.length > 0 && (
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