import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProducts, getProductStats } from "@/lib/db/products"
import { getUsers } from "@/lib/db/users"
import { getOrders, getOrderStats } from "@/lib/db/orders"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { SalesChart } from "@/components/admin/sales-chart"
import { CategoryChart } from "@/components/admin/category-chart"
import { RecentOrders } from "@/components/admin/recent-orders"
import { TopProducts } from "@/components/admin/top-products"
import { NewCustomers } from "@/components/admin/new-customers"

export default async function AdminDashboard() {
  const products = await getProducts()
  const users = await getUsers()
  const orders = await getOrders()

  const productStats = await getProductStats()
  const orderStats = await getOrderStats()

  // Calculate some stats
  const totalSales = orderStats.totalSales
  const totalOrders = orderStats.totalOrders
  const totalCustomers = users.length
  const totalProducts = products.length

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />

      {/* Stats Cards */}
      <DashboardStats
        totalSales={totalSales}
        totalOrders={totalOrders}
        totalCustomers={totalCustomers}
        totalProducts={totalProducts}
        salesGrowth={orderStats.salesGrowth}
        ordersGrowth={orderStats.ordersGrowth}
        customersGrowth={5}
        productsGrowth={-2}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart data={orderStats.monthlySales} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Categories</CardTitle>
            <CardDescription>Sales by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryChart data={productStats.categorySales} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Tabs */}
      <Tabs defaultValue="orders" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="products">Top Products</TabsTrigger>
          <TabsTrigger value="customers">New Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest transactions from your store</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentOrders orders={orders.slice(0, 5)} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling products by revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <TopProducts products={productStats.topProducts} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>New Customers</CardTitle>
              <CardDescription>Recently registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <NewCustomers users={users.slice(0, 5)} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

