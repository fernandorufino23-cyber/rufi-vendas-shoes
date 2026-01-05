import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

const STORAGE_KEY = 'rufivendas_products';

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Sapatilha Confort Angola',
    price: 15500,
    originalPrice: 19900,
    category: 'tenis',
    image: '',
    description: 'Sapatilha confortável para o dia a dia angolano',
    sizes: ['38', '39', '40', '41', '42', '43'],
    featured: true,
  },
  {
    id: '2',
    name: 'Ténis Urban Luanda',
    price: 12900,
    category: 'tenis',
    image: '',
    description: 'Estilo urbano perfeito para as ruas de Luanda',
    sizes: ['37', '38', '39', '40', '41', '42'],
    featured: true,
  },
  {
    id: '3',
    name: 'Sapato Social Clássico',
    price: 22500,
    category: 'sapatos',
    image: '',
    description: 'Sapato social em couro legítimo angolano',
    sizes: ['39', '40', '41', '42', '43', '44'],
    featured: false,
  },
  {
    id: '4',
    name: 'Ténis Sport Benguela',
    price: 18900,
    originalPrice: 24500,
    category: 'tenis',
    image: '',
    description: 'Edição especial para os amantes de desporto',
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
