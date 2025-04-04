"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import type { Product } from "../../lib/db/models/product"

interface ProductTabsProps {
  product: Product
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="mb-12">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
        <TabsTrigger
          value="description"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="specifications"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          Reviews (24)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="pt-4">
        <div className="prose max-w-none">
          <p>{product.description}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl
            nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl
            nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
          </p>
          <p>
            Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
            Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="specifications" className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Product Specifications</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Brand</span>
                <span>GreenCart</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Model</span>
                <span>GC-{product._id.toString().substring(0, 6)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Weight</span>
                <span>0.5 kg</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Dimensions</span>
                <span>10 x 5 x 2 cm</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Shipping Information</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span>2-4 business days</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free over $50</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Returns</span>
                <span>30 days</span>
              </li>
            </ul>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="reviews" className="pt-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Customer Reviews (24)</h3>
            <Button>Write a Review</Button>
          </div>

          {/* Sample Reviews */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${j < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p>Great product! Exactly as described and arrived quickly. Would definitely recommend.</p>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

