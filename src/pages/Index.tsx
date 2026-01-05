import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';

const Index = () => {
  const { products } = useProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedProducts products={products} />
      <ProductGrid products={products} />
      <Footer />
    </div>
  );
};

export default Index;
