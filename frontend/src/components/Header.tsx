import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-leaf-200 bg-leaf-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-leaf-800 sm:text-2xl"
        >
          Far.
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-leaf-700 transition hover:text-leaf-600"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-leaf-700 transition hover:text-leaf-600"
          >
            All Products
          </Link>
          <Link
            href="/products?category=gardening_equipment"
            className="text-sm font-medium text-leaf-700 transition hover:text-leaf-600"
          >
            Equipment
          </Link>
          <Link
            href="/products?category=flowers"
            className="text-sm font-medium text-leaf-700 transition hover:text-leaf-600"
          >
            Flowers
          </Link>
          <Link
            href="/products?category=pots"
            className="text-sm font-medium text-leaf-700 transition hover:text-leaf-600"
          >
            Pots
          </Link>
        </nav>
      </div>
    </header>
  );
}
