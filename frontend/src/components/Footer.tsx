import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-leaf-200 bg-leaf-800 text-leaf-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              Far.
            </Link>
            <p className="mt-2 max-w-sm text-sm text-leaf-200">
              Gardening equipment, flowers, and pots for every garden. Grow with us.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-leaf-300">
                Shop
              </h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/products?category=gardening_equipment" className="text-sm hover:text-white">
                    Equipment
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=flowers" className="text-sm hover:text-white">
                    Flowers
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=pots" className="text-sm hover:text-white">
                    Pots
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-leaf-300">
                Company
              </h3>
              <ul className="mt-3 space-y-2">
                <li><Link href="/" className="text-sm hover:text-white">About</Link></li>
                <li><Link href="/" className="text-sm hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-leaf-700 pt-6 text-center text-sm text-leaf-300">
          © {new Date().getFullYear()} Far. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
