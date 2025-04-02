import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { formatDistanceToNow } from "date-fns"

// Sample data
const orders = [
  {
    id: "ORD-7652",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    customer: {
      name: "Sophie Taylor",
      email: "sophie.t@example.com",
    },
    items: [
      { name: "Chocolate Fudge Cake", quantity: 1, price: 24.99 },
      { name: "Assorted Macarons", quantity: 2, price: 18.99 },
    ],
    total: 62.97,
    status: "Processing",
    paymentStatus: "Paid",
    shippingAddress: "123 Maple St, Anytown, CA 12345",
  },
  {
    id: "ORD-7651",
    date: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    customer: {
      name: "James Wilson",
      email: "james.w@example.com",
    },
    items: [{ name: "Strawberry Cheesecake", quantity: 1, price: 22.99 }],
    total: 22.99,
    status: "Shipped",
    paymentStatus: "Paid",
    shippingAddress: "456 Oak Ave, Springfield, NY 23456",
  },
  {
    id: "ORD-7650",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    customer: {
      name: "Emma Johnson",
      email: "emma.j@example.com",
    },
    items: [
      { name: "Tiramisu Cup", quantity: 2, price: 8.99 },
      { name: "Cinnamon Rolls", quantity: 1, price: 16.99 },
    ],
    total: 34.97,
    status: "Delivered",
    paymentStatus: "Paid",
    shippingAddress: "789 Pine Rd, Westfield, IL 34567",
  },
  {
    id: "ORD-7649",
    date: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    customer: {
      name: "Noah Williams",
      email: "noah.w@example.com",
    },
    items: [
      { name: "Chocolate Fudge Cake", quantity: 1, price: 24.99 },
      { name: "Strawberry Cheesecake", quantity: 1, price: 22.99 },
      { name: "Assorted Macarons", quantity: 2, price: 18.99 },
      { name: "Cinnamon Rolls", quantity: 1, price: 16.99 },
    ],
    total: 102.95,
    status: "Delivered",
    paymentStatus: "Paid",
    shippingAddress: "101 Cedar Ln, Riverdale, TX 45678",
  },
  {
    id: "ORD-7648",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    customer: {
      name: "Olivia Brown",
      email: "olivia.b@example.com",
    },
    items: [{ name: "Vegan Chocolate Cookies", quantity: 2, price: 12.99 }],
    total: 25.98,
    status: "Delivered",
    paymentStatus: "Paid",
    shippingAddress: "202 Birch Blvd, Lakeside, FL 56789",
  },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">View and manage customer orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
        <div className="grid gap-2 w-full sm:max-w-[360px]">
          <Input placeholder="Search orders by ID or customer..." />
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Order Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="total-desc">Highest Total</SelectItem>
              <SelectItem value="total-asc">Lowest Total</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:flex">
          <TabsTrigger value="all" className="flex-1 sm:flex-auto">
            All Orders
          </TabsTrigger>
          <TabsTrigger value="processing" className="flex-1 sm:flex-auto">
            Processing
          </TabsTrigger>
          <TabsTrigger value="shipped" className="flex-1 sm:flex-auto">
            Shipped
          </TabsTrigger>
          <TabsTrigger value="delivered" className="flex-1 sm:flex-auto">
            Delivered
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>
        <TabsContent value="processing" className="mt-4 space-y-4">
          {orders
            .filter((order) => order.status === "Processing")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>
        <TabsContent value="shipped" className="mt-4 space-y-4">
          {orders
            .filter((order) => order.status === "Shipped")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>
        <TabsContent value="delivered" className="mt-4 space-y-4">
          {orders
            .filter((order) => order.status === "Delivered")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrderCard({ order }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{order.id}</CardTitle>
              <Badge
                variant={
                  order.status === "Processing" ? "outline" : order.status === "Shipped" ? "secondary" : "default"
                }
              >
                {order.status}
              </Badge>
            </div>
            <CardDescription>Placed {formatDistanceToNow(order.date, { addSuffix: true })}</CardDescription>
          </div>
          <div className="text-right">
            <div className="font-semibold">${order.total.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">
              {order.items.length} {order.items.length === 1 ? "item" : "items"}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Customer Information</h4>
            <div className="text-sm">
              <div>{order.customer.name}</div>
              <div className="text-muted-foreground">{order.customer.email}</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Order Items</h4>
            <ul className="text-sm space-y-1">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <div>
                    {item.quantity} x {item.name}
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Shipping Address</h4>
              <div className="text-sm">{order.shippingAddress}</div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Payment Status</h4>
              <Badge variant="outline" className="font-normal">
                {order.paymentStatus}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent className="border-t pt-4 flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        {order.status === "Processing" && <Button size="sm">Mark as Shipped</Button>}
        {order.status === "Shipped" && <Button size="sm">Mark as Delivered</Button>}
        <Button variant="outline" size="sm">
          Print Invoice
        </Button>
      </CardContent>
    </Card>
  )
}

