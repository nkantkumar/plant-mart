import type { Product } from "@/types/product";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${API_BASE}/api/products?category=${encodeURIComponent(category)}`
    : `${API_BASE}/api/products`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id: number): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchCategories(): Promise<{ id: string; label: string }[]> {
  const res = await fetch(`${API_BASE}/api/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  return res.json();
}
