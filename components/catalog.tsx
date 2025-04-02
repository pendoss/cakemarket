"use client"

import { useState } from "react"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data for sweet food items
const initialProducts = [
  {
    id: 1,
    name: "Chocolate Fudge Cake",
    description: "Rich chocolate cake with fudge frosting",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Cakes",
    dietary: ["Contains Gluten", "Contains Dairy"],
    rating: 4.8,
    seller: "Sweet Delights Bakery",
  },
  {
    id: 2,
    name: "Strawberry Cheesecake",
    description: "Creamy cheesecake with fresh strawberry topping",
    price: 22.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Cakes",
    dietary: ["Contains Gluten", "Contains Dairy"],
    rating: 4.7,
    seller: "Cheesecake Heaven",
  },
  {
    id: 3,
    name: "Assorted Macarons",
    description: "Box of 12 colorful French macarons in various flavors",
    price: 18.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Cookies",
    dietary: ["Contains Nuts", "Gluten-Free"],
    rating: 4.9,
    seller: "Parisian Delicacies",
  },
  {
    id: 4,
    name: "Cinnamon Rolls",
    description: "Freshly baked cinnamon rolls with cream cheese frosting",
    price: 16.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Pastries",
    dietary: ["Contains Gluten", "Contains Dairy"],
    rating: 4.6,
    seller: "Morning Bakery",
  },
  {
    id: 5,
    name: "Vegan Chocolate Cookies",
    description: "Plant-based chocolate chip cookies",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Cookies",
    dietary: ["Vegan", "Dairy-Free"],
    rating: 4.5,
    seller: "Green Treats",
  },
  {
    id: 6,
    name: "Tiramisu Cup",
    description: "Individual tiramisu dessert cups",
    price: 8.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Italian Desserts",
    dietary: ["Contains Gluten", "Contains Dairy"],
    rating: 4.7,
    seller: "Italian Sweets",
  },
  {
    id: 7,
    name: "Fruit Tart",
    description: "Buttery tart shell filled with custard and fresh fruits",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Tarts",
    dietary: ["Contains Gluten", "Contains Dairy"],
    rating: 4.8,
    seller: "Tart House",
  },
  {
    id: 8,
    name: "Gluten-Free Brownies",
    description: "Fudgy chocolate brownies made without gluten",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Brownies",
    dietary: ["Gluten-Free", "Contains Dairy"],
    rating: 4.6,
    seller: "Allergy-Friendly Bakery",
  },
  {
    id: 9,
    name: "Honey Baklava",
    description: "Traditional baklava with layers of phyllo, nuts, and honey",
    price: 17.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "International Desserts",
    dietary: ["Contains Gluten", "Contains Nuts"],
    rating: 4.9,
    seller: "Mediterranean Sweets",
  },
  {
    id: 10,
    name: "Lemon Meringue Pie",
    description: "Tangy lemon filling topped with fluffy meringue",
    price: 21.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Pies",
    dietary: ["Contains Gluten", "Contains Dairy"],
    rating: 4.7,
    seller: "Pie Paradise",
  },
  {
    id: 11,
    name: "Chocolate Truffles",
    description: "Assorted handmade chocolate truffles",
    price: 25.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Chocolates",
    dietary: ["Contains Dairy", "May Contain Nuts"],
    rating: 4.9,
    seller: "Truffle Artisans",
  },
  {
    id: 12,
    name: "Red Velvet Cupcakes",
    description: "Classic red velvet cupcakes with cream cheese frosting",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Cupcakes",
    dietary: ["Contains Gluten", "Contains Dairy"],
    rating: 4.8,
    seller: "Cupcake Corner",
  },
]

export function Catalog() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [products, setProducts] = useState(initialProducts)
  const [filters, setFilters] = useState({
    priceRange: [0, 30],
    categories: [],
    dietary: [],
    rating: 0,
    sellers: [],
  })

  // Apply filters to products
  const applyFilters = (newFilters) => {
    setFilters(newFilters)

    const filteredProducts = initialProducts.filter((product) => {
      // Price filter
      if (product.price < newFilters.priceRange[0] || product.price > newFilters.priceRange[1]) {
        return false
      }

      // Category filter
      if (newFilters.categories.length > 0 && !newFilters.categories.includes(product.category)) {
        return false
      }

      // Dietary filter
      if (newFilters.dietary.length > 0 && !newFilters.dietary.some((diet) => product.dietary.includes(diet))) {
        return false
      }

      // Rating filter
      if (product.rating < newFilters.rating) {
        return false
      }

      // Seller filter
      if (newFilters.sellers.length > 0 && !newFilters.sellers.includes(product.seller)) {
        return false
      }

      return true
    })

    setProducts(filteredProducts)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Mobile filter button */}
      <div className="md:hidden flex justify-end mb-4">
        <Button variant="outline" onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Filter sidebar - mobile version with overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden",
          sidebarOpen ? "block" : "hidden",
        )}
      >
        <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-background p-6 shadow-lg">
          <Button variant="ghost" className="absolute right-4 top-4" onClick={() => setSidebarOpen(false)}>
            ✕
          </Button>
          <FilterSidebar filters={filters} applyFilters={applyFilters} />
        </div>
      </div>

      {/* Filter sidebar - desktop version */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <FilterSidebar filters={filters} applyFilters={applyFilters} />
      </div>

      {/* Product grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium">No products match your filters</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filter criteria</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setFilters({
                    priceRange: [0, 30],
                    categories: [],
                    dietary: [],
                    rating: 0,
                    sellers: [],
                  })
                  setProducts(initialProducts)
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

