import { useState } from 'react';
import { ShoppingCart, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

// Mapeamento de nomes de cores para valores hex
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

export function ProductQuickView({ product, open, onClose }: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!product) return null;

  const handleBuy = () => {
    const sizeText = selectedSize ? `Tamanho: ${selectedSize}` : 'Tamanho: Não especificado';
    const colorText = selectedColor ? `Cor: ${selectedColor}` : 'Cor: Não especificada';
    
    // Primeiro envia a imagem como link separado para preview
    const imageMessage = product.image 
      ? `📸 *VER IMAGEM DO PRODUTO:*\n${product.image}\n\n---\n\n`
      : '';
    
    const message = encodeURIComponent(
      imageMessage +
      `🛒 *NOVO PEDIDO*\n\n` +
      `🛍️ *Produto:* ${product.name}\n` +
      `💰 *Preço:* ${product.price.toLocaleString('pt-AO')} Kz\n` +
      `📏 *${sizeText}*\n` +
      `🎨 *${colorText}*\n\n` +
      `✅ Gostaria de finalizar esta compra!`
    );
    
    window.open(`https://wa.me/244935126871?text=${message}`, '_blank');
    onClose();
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden">
            {discount && (
              <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
                -{discount}%
              </div>
            )}
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-4xl text-muted-foreground/30">RUFI</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="font-display text-3xl text-gradient">
              {product.price.toLocaleString('pt-AO')} Kz
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {product.originalPrice.toLocaleString('pt-AO')} Kz
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-muted-foreground">{product.description}</p>
          )}

          {/* Colors Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                🎨 Selecione a Cor
                {selectedColor && (
                  <span className="text-primary text-sm font-normal">({selectedColor})</span>
                )}
              </Label>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-3"
              >
                {product.colors.map((color) => (
                  <div key={color} className="relative">
                    <RadioGroupItem
                      value={color}
                      id={`color-${color}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`color-${color}`}
                      className={`
                        w-10 h-10 rounded-full cursor-pointer flex items-center justify-center
                        border-2 transition-all duration-200
                        ${selectedColor === color 
                          ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                      style={{ backgroundColor: getColorValue(color) }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <Check 
                          className={`w-5 h-5 ${
                            getColorValue(color) === '#FFFFFF' || getColorValue(color) === '#FFD700'
                              ? 'text-gray-800' 
                              : 'text-white'
                          }`} 
                        />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Sizes Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                📏 Selecione o Tamanho
                {selectedSize && (
                  <span className="text-primary text-sm font-normal">({selectedSize})</span>
                )}
              </Label>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-2"
              >
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className={`
                        px-4 py-2 rounded-lg cursor-pointer font-medium
                        border transition-all duration-200
                        ${selectedSize === size 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-secondary text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                        }
                      `}
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Buy Button */}
          <Button
            onClick={handleBuy}
            className="w-full bg-gradient-primary hover:opacity-90 shadow-glow h-12 text-lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Comprar via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}