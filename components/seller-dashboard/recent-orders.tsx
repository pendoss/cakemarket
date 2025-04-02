import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Sample data
const orders = [
  {
    id: "ORD-7652",
    customer: "Sophie Taylor",
    initial: "ST",
    items: 3,
    total: "$87.97",
    status: "Processing",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "ORD-7651",
    customer: "James Wilson",
    initial: "JW",
    items: 1,
    total: "$24.99",
    status: "Shipped",
    date: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
  },
  {
    id: "ORD-7650",
    customer: "Emma Johnson",
    initial: "EJ",
    items: 2,
    total: "$43.98",
    status: "Delivered",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "ORD-7649",
    customer: "Noah Williams",
    initial: "NW",
    items: 5,
    total: "$112.95",
    status: "Delivered",
    date: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
  },
  {
    id: "ORD-7648",
    customer: "Olivia Brown",
    initial: "OB",
    items: 2,
    total: "$37.98",
    status: "Delivered",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
]

export function RecentOrders() {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?text=${order.initial}`} alt={order.customer} />
            <AvatarFallback>{order.initial}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{order.customer}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{order.id}</span>
              <span>•</span>
              <span>{order.items} items</span>
              <span>•</span>
              <span>{formatDistanceToNow(order.date, { addSuffix: true })}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-medium">{order.total}</span>
            <Badge
              variant={order.status === "Processing" ? "outline" : order.status === "Shipped" ? "secondary" : "default"}
              className="text-xs"
            >
              {order.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

