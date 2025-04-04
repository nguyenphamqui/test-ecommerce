import { ProductFilters } from "@/components/products/product-filters"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductSort } from "@/components/products/product-sort"
import { getFilteredProducts } from "@/lib/db/products"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = searchParams.category as string | undefined
  const minPrice = searchParams.minPrice ? Number.parseFloat(searchParams.minPrice as string) : undefined
  const maxPrice = searchParams.maxPrice ? Number.parseFloat(searchParams.maxPrice as string) : undefined
  const sort = searchParams.sort as string | undefined
  const page = searchParams.page ? Number.parseInt(searchParams.page as string) : 1

  const { products, totalProducts } = await getFilteredProducts({
    category,
    minPrice,
    maxPrice,
    sort,
    page,
    limit: 12,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <ProductFilters />

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort and View Options */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <ProductSort />
            <div className="text-sm text-gray-500">
              Showing {products.length} of {totalProducts} products
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid products={products} />

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-1">
              <button className="px-4 py-2 border rounded-md" disabled={page === 1}>
                &lt;
              </button>
              <button className="px-4 py-2 border rounded-md bg-primary text-white">{page}</button>
              <button className="px-4 py-2 border rounded-md">{page + 1}</button>
              <button className="px-4 py-2 border rounded-md">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

