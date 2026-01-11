export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'tenis' | 'sapatos' | 'acessorios';
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  featured: boolean;
}

export type Category = 'todos' | 'tenis' | 'sapatos' | 'acessorios';
