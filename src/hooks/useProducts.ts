import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

const STORAGE_KEY = 'rufivendas_products';

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Air Max Thunder',
    price: 459.90,
    originalPrice: 599.90,
    category: 'tenis',
    image: '',
    description: 'Tênis esportivo com amortecimento premium',
    sizes: ['38', '39', '40', '41', '42', '43'],
    featured: true,
  },
  {
    id: '2',
    name: 'Urban Runner Pro',
    price: 389.90,
    category: 'tenis',
    image: '',
    description: 'Performance e estilo para o dia a dia',
    sizes: ['37', '38', '39', '40', '41', '42'],
    featured: true,
  },
  {
    id: '3',
    name: 'Classic Leather Oxford',
    price: 299.90,
    category: 'sapatos',
    image: '',
    description: 'Sapato social em couro legítimo',
    sizes: ['39', '40', '41', '42', '43', '44'],
    featured: false,
  },
  {
    id: '4',
    name: 'Street Force X',
    price: 529.90,
    originalPrice: 649.90,
    category: 'tenis',
    image: '',
    description: 'Edição limitada para os verdadeiros sneakerheads',
    sizes: ['38', '39', '40', '41', '42'],
    featured: true,
  },
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    saveProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    saveProducts(products.filter(p => p.id !== id));
  };

  return { products, addProduct, updateProduct, deleteProduct };
}
