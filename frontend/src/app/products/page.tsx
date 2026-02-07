import { Suspense } from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";

async function ProductGrid({
  category,
}: {
  category?: string;
}) {
  const products = await fetchProducts(category);
  if (products.length === 0) {
    return (
      <p className="text-center text-leaf-600">
        No products found. Try another category or check back later.
      </p>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <Link key={p.id} href={`/products/${p.id}`} className="card block overflow-hidden p-0">
          <div className="h-48 bg-gradient-to-br from-leaf-200 to-leaf-300" />
          <div className="p-4">
            <span className="text-xs font-medium uppercase tracking-wider text-leaf-500">
              {p.category.replace("_", " ")}
            </span>
            <h3 className="mt-1 text-lg font-semibold text-leaf-800">{p.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-leaf-600">{p.description}</p>
            <p className="mt-3 text-lg font-bold text-leaf-700">${p.price.toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CategoryTabs({ current }: { current?: string }) {
  const tabs = [
    { id: undefined, label: "All" },
    { id: "gardening_equipment", label: "Equipment" },
    { id: "flowers", label: "Flowers" },
    { id: "pots", label: "Pots" },
  ];
  return (
    <div className="flex flex-wrap gap-2 border-b border-leaf-200 pb-4">
      {tabs.map((tab) => {
        const isActive =
          (current === undefined && tab.id === undefined) || current === tab.id;
        const href = tab.id ? `/products?category=${tab.id}` : "/products";
        return (
          <Link
            key={tab.id ?? "all"}
            href={href}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-leaf-600 text-white"
                : "bg-leaf-100 text-leaf-700 hover:bg-leaf-200"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-leaf-800">Products</h1>
      <CategoryTabs current={category} />
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card h-72 animate-pulse p-4">
                  <div className="h-40 rounded bg-leaf-200" />
                  <div className="mt-3 h-4 rounded bg-leaf-200" />
                  <div className="mt-2 h-4 w-2/3 rounded bg-leaf-200" />
                  <div className="mt-3 h-6 w-1/4 rounded bg-leaf-200" />
                </div>
              ))}
            </div>
          }
        >
          <ProductGrid category={category} />
        </Suspense>
      </div>
    </div>
  );
}
