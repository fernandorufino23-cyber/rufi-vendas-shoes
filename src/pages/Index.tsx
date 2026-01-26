import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { ProductQuickView } from '@/components/ProductQuickView';
import { useProducts } from '@/hooks/useProducts';
import { useProductModal } from '@/hooks/useProductModal';

const Index = () => {
  const { products } = useProducts();
  const { selectedProduct, isOpen, openProduct, closeProduct } = useProductModal(products);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedProducts products={products} onProductSelect={openProduct} />
      <ProductGrid products={products} onProductSelect={openProduct} />
      <Footer />
      
      {/* Global Product Quick View Modal */}
      <ProductQuickView
        product={selectedProduct}
        open={isOpen}
        onClose={closeProduct}
      />
    </div>
  );
};

export default Index;
