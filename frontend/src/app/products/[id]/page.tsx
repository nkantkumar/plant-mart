import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProduct } from "@/lib/api";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(Number(id));
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/products"
        className="text-sm font-medium text-leaf-600 hover:text-leaf-700"
      >
        ← Back to products
      </Link>
      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="h-72 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-leaf-200 to-leaf-400 lg:h-96 lg:w-96" />
        <div className="flex-1">
          <span className="text-xs font-medium uppercase tracking-wider text-leaf-500">
            {product.category.replace("_", " ")}
          </span>
          <h1 className="mt-2 text-3xl font-bold text-leaf-800">{product.name}</h1>
          <p className="mt-4 text-lg font-bold text-leaf-700">
            ${product.price.toFixed(2)}
          </p>
          {product.description && (
            <p className="mt-4 text-leaf-700">{product.description}</p>
          )}
          <p className="mt-2 text-sm text-leaf-600">
            {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
          </p>
          <button
            type="button"
            className="btn-primary mt-6"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Add to cart" : "Out of stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
