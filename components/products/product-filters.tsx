"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Filter } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import Form from "next/form"

export function ProductFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")

  // Get the current selected categories
  const selectedCategories = searchParams.get("category")?.split(",") || []

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category)

    const params = new URLSearchParams(searchParams.toString())

    if (newCategories.length > 0) {
      params.set("category", newCategories.join(","))
    } else {
      params.delete("category")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const handlePriceFilter = (formData: FormData) => {
    const min = formData.get("min-price") as string
    const max = formData.get("max-price") as string

    const params = new URLSearchParams(searchParams.toString())

    if (min) {
      params.set("minPrice", min)
    } else {
      params.delete("minPrice")
    }

    if (max) {
      params.set("maxPrice", max)
    } else {
      params.delete("maxPrice")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleReset = () => {
    router.push(pathname)
  }

  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Filter className="mr-2 h-5 w-5" /> Filters
          </h2>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <Label htmlFor="search" className="mb-2 block">
              Search
            </Label>
            <Input
              id="search"
              placeholder="Search products..."
              defaultValue={searchParams.get("search") || ""}
              onChange={(e) => {
                router.push(`${pathname}?${createQueryString("search", e.target.value)}`)
              }}
            />
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {["Electronics", "Clothing", "Home & Garden", "Sports", "Beauty"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category.toLowerCase())}
                    onCheckedChange={(checked) => {
                      handleCategoryChange(category.toLowerCase(), checked as boolean)
                    }}
                  />
                  <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <Form action={handlePriceFilter} className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="min-price" className="text-xs">
                  Min
                </Label>
                <Input
                  id="min-price"
                  name="min-price"
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="max-price" className="text-xs">
                  Max
                </Label>
                <Input
                  id="max-price"
                  name="max-price"
                  type="number"
                  placeholder="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <Button type="submit" className="col-span-2 w-full bg-primary hover:bg-primary/90">
                Apply
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

