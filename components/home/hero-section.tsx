import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative mb-12 rounded-lg overflow-hidden">
      <div className="bg-primary/10 p-8 md:p-12 lg:p-16 rounded-lg">
        <div className="max-w-xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Spring Collection 2025</h1>
          <p className="text-lg text-gray-700">
            Discover our new arrivals and refresh your style with our latest collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/products">
                Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

