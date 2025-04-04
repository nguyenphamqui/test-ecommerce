// Mock data for the e-commerce site

// Products
export async function getProducts() {
  // In a real app, this would fetch from a database or API
  return [
    {
      id: 1,
      name: "Wireless Bluetooth Earbuds",
      description:
        "High-quality wireless earbuds with noise cancellation and long battery life.",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      stock: 45,
    },
    {
      id: 2,
      name: "Smart Fitness Tracker",
      description:
        "Track your fitness goals, heart rate, and sleep patterns with this advanced fitness tracker.",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      stock: 32,
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      description:
        "Comfortable and eco-friendly t-shirt made from 100% organic cotton.",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Clothing",
      stock: 78,
    },
    {
      id: 4,
      name: "Stainless Steel Water Bottle",
      description:
        "Durable and insulated water bottle that keeps your drinks cold for 24 hours or hot for 12 hours.",
      price: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home & Garden",
      stock: 56,
    },
    {
      id: 5,
      name: "Bamboo Cutting Board Set",
      description:
        "Eco-friendly bamboo cutting board set with three different sizes for all your kitchen needs.",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home & Garden",
      stock: 23,
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      description:
        "Fast wireless charging pad compatible with all Qi-enabled devices.",
      price: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      stock: 67,
    },
    {
      id: 7,
      name: "Yoga Mat with Carrying Strap",
      description:
        "Non-slip yoga mat with alignment lines and a convenient carrying strap.",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Sports",
      stock: 41,
    },
    {
      id: 8,
      name: "Ceramic Plant Pot Set",
      description:
        "Set of three ceramic plant pots in different sizes with drainage holes and saucers.",
      price: 44.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home & Garden",
      stock: 19,
    },
  ];
}

export async function getProductById(id: number) {
  const products = await getProducts();
  return products.find((product) => product.id === id);
}

// Users
export async function getUsers() {
  return [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      orders: 5,
      spent: 349.95,
      lastOrder: "2023-04-15T10:30:00",
      isAdmin: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      orders: 3,
      spent: 124.97,
      lastOrder: "2023-04-10T14:20:00",
      isAdmin: false,
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      orders: 8,
      spent: 589.92,
      lastOrder: "2023-04-18T09:15:00",
      isAdmin: false,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      orders: 2,
      spent: 79.98,
      lastOrder: "2023-04-05T16:45:00",
      isAdmin: false,
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      orders: 6,
      spent: 429.94,
      lastOrder: "2023-04-20T11:30:00",
      isAdmin: false,
    },
  ];
}

export async function getUserById(id: number) {
  const users = await getUsers();
  return users.find((user) => user.id === id);
}

// Orders
export async function getOrders() {
  return [
    {
      id: 10001,
      customer: "John Doe",
      date: "2023-04-15T10:30:00",
      status: "completed",
      total: 124.97,
      items: [
        { productId: 1, quantity: 1, price: 79.99 },
        { productId: 3, quantity: 1, price: 24.99 },
        { productId: 6, quantity: 1, price: 19.99 },
      ],
    },
    {
      id: 10002,
      customer: "Jane Smith",
      date: "2023-04-10T14:20:00",
      status: "processing",
      total: 74.98,
      items: [
        { productId: 3, quantity: 2, price: 24.99 },
        { productId: 6, quantity: 1, price: 19.99 },
      ],
    },
    {
      id: 10003,
      customer: "Robert Johnson",
      date: "2023-04-18T09:15:00",
      status: "completed",
      total: 164.97,
      items: [
        { productId: 2, quantity: 1, price: 49.99 },
        { productId: 4, quantity: 1, price: 34.99 },
        { productId: 5, quantity: 1, price: 29.99 },
        { productId: 6, quantity: 1, price: 19.99 },
        { productId: 8, quantity: 1, price: 44.99 },
      ],
    },
    {
      id: 10004,
      customer: "Emily Davis",
      date: "2023-04-05T16:45:00",
      status: "pending",
      total: 79.98,
      items: [{ productId: 7, quantity: 2, price: 39.99 }],
    },
    {
      id: 10005,
      customer: "Michael Wilson",
      date: "2023-04-20T11:30:00",
      status: "cancelled",
      total: 129.97,
      items: [
        { productId: 1, quantity: 1, price: 79.99 },
        { productId: 6, quantity: 1, price: 19.99 },
        { productId: 3, quantity: 1, price: 24.99 },
      ],
    },
  ];
}

export async function getOrderById(id: number) {
  const orders = await getOrders();
  return orders.find((order) => order.id === id);
}
