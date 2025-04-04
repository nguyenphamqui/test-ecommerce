import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { CategoryBanner } from "@/components/home/category-banner"
import { NewArrivals } from "@/components/home/new-arrivals"
import { Newsletter } from "@/components/home/newsletter"
import { getProducts } from "@/lib/db/products"

export default async function Home() {
  const products = await getProducts()
  const featuredProducts = products.slice(0, 4)
  const newArrivals = products.slice(4, 8)

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <CategoryBanner />
      <NewArrivals products={newArrivals} />
      <Newsletter />
    </div>
  )
}
