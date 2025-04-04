import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CategoryBanner() {
  return (
    <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-primary/10 rounded-lg p-6 flex flex-col justify-between min-h-[200px]">
        <h3 className="text-xl font-bold">Electronics</h3>
        <Button asChild variant="outline" className="self-start mt-4">
          <Link href="/products?category=electronics">Shop Now</Link>
        </Button>
      </div>
      <div className="bg-secondary/10 rounded-lg p-6 flex flex-col justify-between min-h-[200px]">
        <h3 className="text-xl font-bold">Clothing</h3>
        <Button asChild variant="outline" className="self-start mt-4">
          <Link href="/products?category=clothing">Shop Now</Link>
        </Button>
      </div>
      <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between min-h-[200px]">
        <h3 className="text-xl font-bold">Home & Garden</h3>
        <Button asChild variant="outline" className="self-start mt-4">
          <Link href="/products?category=home">Shop Now</Link>
        </Button>
      </div>
    </section>
  )
}

