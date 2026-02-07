import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-leaf-600 via-leaf-700 to-sage-700 px-4 py-24 text-white sm:px-6 sm:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Grow your garden with Far.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-leaf-100">
            Quality gardening equipment, beautiful flowers, and pots for every space. Everything you need to bring your outdoor space to life.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="btn-primary rounded-lg bg-white px-6 py-3 text-leaf-800 hover:bg-leaf-50">
              Shop all products
            </Link>
            <Link href="/products?category=flowers" className="btn-secondary border-white text-white hover:bg-white/10">
              Browse flowers
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-leaf-800 sm:text-3xl">
          Shop by category
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Link
            href="/products?category=gardening_equipment"
            className="card group flex flex-col overflow-hidden p-0"
          >
            <div className="h-40 bg-gradient-to-br from-leaf-200 to-leaf-300 transition group-hover:from-leaf-300 group-hover:to-leaf-400" />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold text-leaf-800">Gardening Equipment</h3>
              <p className="mt-1 text-sm text-leaf-600">Tools, shears, trowels, and more.</p>
              <span className="mt-3 text-sm font-medium text-leaf-600 group-hover:text-leaf-700">
                Shop equipment →
              </span>
            </div>
          </Link>
          <Link
            href="/products?category=flowers"
            className="card group flex flex-col overflow-hidden p-0"
          >
            <div className="h-40 bg-gradient-to-br from-leaf-300 to-sage-500 transition group-hover:from-leaf-400 group-hover:to-sage-600" />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold text-leaf-800">Flowers</h3>
              <p className="mt-1 text-sm text-leaf-600">Seeds, plants, and bouquets.</p>
              <span className="mt-3 text-sm font-medium text-leaf-600 group-hover:text-leaf-700">
                Shop flowers →
              </span>
            </div>
          </Link>
          <Link
            href="/products?category=pots"
            className="card group flex flex-col overflow-hidden p-0"
          >
            <div className="h-40 bg-gradient-to-br from-sage-500 to-leaf-700 transition group-hover:from-sage-600 group-hover:to-leaf-800" />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold text-leaf-800">Pots & Planters</h3>
              <p className="mt-1 text-sm text-leaf-600">Terracotta, ceramic, and baskets.</p>
              <span className="mt-3 text-sm font-medium text-leaf-600 group-hover:text-leaf-700">
                Shop pots →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-t border-leaf-200 bg-leaf-100/50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-leaf-800">Why Far?</h2>
          <p className="mt-4 text-leaf-700">
            We stock only what we’d use in our own gardens—durable equipment, vibrant flowers, and pots that last. Your one stop for growing.
          </p>
        </div>
      </section>
    </div>
  );
}
