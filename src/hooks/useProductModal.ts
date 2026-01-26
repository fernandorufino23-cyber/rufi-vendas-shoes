import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Product } from '@/types/product';

export function useProductModal(products: Product[]) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Check URL for product parameter on mount and when URL changes
  useEffect(() => {
    const productId = searchParams.get('product');
    console.log('useProductModal: checking URL, productId =', productId, 'products count =', products.length);
    
    if (productId && products.length > 0) {
      const product = products.find(p => p.id === productId);
      console.log('useProductModal: found product =', product?.name);
      if (product) {
        setSelectedProduct(product);
      }
    } else if (!productId) {
      setSelectedProduct(null);
    }
  }, [searchParams, products]);

  const openProduct = useCallback((product: Product) => {
    console.log('useProductModal: openProduct called for', product.name, product.id);
    
    // Update URL with product parameter
    navigate(`/?product=${product.id}`, { replace: false });
    setSelectedProduct(product);
  }, [navigate]);

  const closeProduct = useCallback(() => {
    console.log('useProductModal: closeProduct called');
    // Remove product from URL
    navigate('/', { replace: false });
    setSelectedProduct(null);
  }, [navigate]);

  return {
    selectedProduct,
    isOpen: !!selectedProduct,
    openProduct,
    closeProduct,
  };
}
