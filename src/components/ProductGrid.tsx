import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product, Category } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const categories: { value: Category; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'tenis', label: 'Tênis' },
  { value: 'sapatos', label: 'Sapatos' },
  { value: 'acessorios', label: 'Acessórios' },
];

export function ProductGrid({ products, onProductSelect }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('todos');

  const filteredProducts = activeCategory === 'todos'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="produtos" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-6xl mb-4">
            NOSSOS <span className="text-gradient">PRODUTOS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Selecionamos os melhores produtos para você. Qualidade garantida!
          </p>
        </div>
        
        {/* Category Filter */}
        <div id="categorias" className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} onBuy={onProductSelect} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
}