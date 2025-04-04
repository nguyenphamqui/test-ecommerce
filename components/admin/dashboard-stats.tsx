import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

interface DashboardStatsProps {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  salesGrowth: number
  ordersGrowth: number
  customersGrowth: number
  productsGrowth: number
}

export function DashboardStats({
  totalSales,
  totalOrders,
  totalCustomers,
  totalProducts,
  salesGrowth,
  ordersGrowth,
  customersGrowth,
  productsGrowth,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold">${totalSales.toFixed(2)}</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            {salesGrowth > 0 ? (
              <>
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">{salesGrowth}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">{Math.abs(salesGrowth)}%</span>
              </>
            )}
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold">{totalOrders}</h3>
            </div>
            <div className="bg-secondary/10 p-3 rounded-full">
              <ShoppingCart className="h-6 w-6 text-secondary" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            {ordersGrowth > 0 ? (
              <>
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">{ordersGrowth}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">{Math.abs(ordersGrowth)}%</span>
              </>
            )}
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <h3 className="text-2xl font-bold">{totalCustomers}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            {customersGrowth > 0 ? (
              <>
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">{customersGrowth}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">{Math.abs(customersGrowth)}%</span>
              </>
            )}
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold">{totalProducts}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            {productsGrowth > 0 ? (
              <>
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">{productsGrowth}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">{Math.abs(productsGrowth)}%</span>
              </>
            )}
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

