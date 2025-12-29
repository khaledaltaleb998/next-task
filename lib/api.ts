const API = 'https://fakestoreapi.com';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

export const categoryNameById = (id: number) => {
  const map: Record<number, string> = {
    1: 'electronics',
    2: 'jewelery',
    3: "men's clothing",
    4: "women's clothing",
  };
  return map[id];
};

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductsByCategoryId(id: number): Promise<Product[]> {
  const name = categoryNameById(id);
  if (!name) throw new Error('Invalid category id');
  const res = await fetch(`${API}/products/category/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}
