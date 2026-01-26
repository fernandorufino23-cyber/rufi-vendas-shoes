import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '@/types/product';

export function useProductModal(products: Product[]) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Check URL for product parameter on mount and when URL changes
  useEffect(() => {
    const productId = searchParams.get('product');
    if (productId && products.length > 0) {
      const product = products.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
      }
    } else {
      setSelectedProduct(null);
    }
  }, [searchParams, products]);

  const openProduct = (product: Product) => {
    // Create slug from product name
    const slug = product.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Update URL with product parameter
    navigate(`/?product=${product.id}`, { replace: false });
    setSelectedProduct(product);
  };

  const closeProduct = () => {
    // Remove product from URL
    navigate('/', { replace: false });
    setSelectedProduct(null);
  };

  return {
    selectedProduct,
    isOpen: !!selectedProduct,
    openProduct,
    closeProduct,
  };
}
