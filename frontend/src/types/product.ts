export interface Product {
  id: number;
  name: string;
  description: string | null;
  category: string;
  price: number;
  image_url: string | null;
  stock: number;
}

export interface CategoryItem {
  id: string;
  label: string;
}
