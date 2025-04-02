import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { EllipsisVertical, Plus, Star } from "lucide-react"

// Sample data
const products = [
  {
    id: 1,
    name: "Chocolate Fudge Cake",
    price: 24.99,
    inventory: 15,
    category: "Cakes",
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    rating: 4.8,
    sales: 32,
  },
  {
    id: 2,
    name: "Strawberry Cheesecake",
    price: 22.99,
    inventory: 8,
    category: "Cakes",
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    rating: 4.7,
    sales: 24,
  },
  {
    id: 3,
    name: "Assorted Macarons",
    price: 18.99,
    inventory: 20,
    category: "Cookies",
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    rating: 4.9,
    sales: 21,
  },
  {
    id: 4,
    name: "Cinnamon Rolls",
    price: 16.99,
    inventory: 12,
    category: "Pastries",
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    rating: 4.6,
    sales: 18,
  },
  {
    id: 5,
    name: "Tiramisu Cup",
    price: 8.99,
    inventory: 6,
    category: "Italian Desserts",
    image: "/placeholder.svg?height=200&width=200",
    status: "Low Stock",
    rating: 4.7,
    sales: 15,
  },
  {
    id: 6,
    name: "Red Velvet Cupcakes",
    price: 15.99,
    inventory: 0,
    category: "Cupcakes",
    image: "/placeholder.svg?height=200&width=200",
    status: "Out of Stock",
    rating: 4.8,
    sales: 0,
  },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your products, inventory, and listings</p>
        </div>
        <Link href="/seller-dashboard/products/new">
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
        <div className="grid gap-2 w-full sm:max-w-[360px]">
          <Input placeholder="Search products..." />
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="out">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="cakes">Cakes</SelectItem>
              <SelectItem value="cookies">Cookies</SelectItem>
              <SelectItem value="pastries">Pastries</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="sales">Best Selling</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="grid" className="flex-1 sm:flex-auto">
            Grid
          </TabsTrigger>
          <TabsTrigger value="list" className="flex-1 sm:flex-auto">
            List
          </TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white">
                          <EllipsisVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
                        <DropdownMenuItem>Update Inventory</DropdownMenuItem>
                        <DropdownMenuItem>View Reviews</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete Product</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {product.status !== "Active" && (
                    <Badge
                      variant={product.status === "Low Stock" ? "secondary" : "outline"}
                      className="absolute bottom-2 left-2"
                    >
                      {product.status}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-medium">${product.price}</span>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Inventory:</span>
                      <span className={product.inventory === 0 ? "text-destructive" : ""}>
                        {product.inventory} units
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sales:</span>
                      <span>{product.sales} sold</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span>{product.category}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/seller-dashboard/products/${product.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Manage Product
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center p-4 gap-4">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="font-semibold">{product.name}</h3>
                        <Badge
                          variant={
                            product.status === "Active"
                              ? "default"
                              : product.status === "Low Stock"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {product.status}
                        </Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm gap-2 sm:gap-6 mt-1">
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">${product.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Inventory:</span>
                          <span className={product.inventory === 0 ? "text-destructive font-medium" : "font-medium"}>
                            {product.inventory} units
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Category:</span>
                          <span>{product.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <EllipsisVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit Product</DropdownMenuItem>
                          <DropdownMenuItem>Update Inventory</DropdownMenuItem>
                          <DropdownMenuItem>View Reviews</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete Product</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

