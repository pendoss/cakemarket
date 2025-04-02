"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Package, List, CheckCircle } from "lucide-react"

// Sample data for orders with ingredients
const orders = [
  {
    id: "ORD-7652",
    customer: "Sophie Taylor",
    status: "Processing",
    items: [
      {
        name: "Chocolate Fudge Cake",
        quantity: 1,
        ingredients: [
          { name: "All-purpose flour", amount: "250g" },
          { name: "Cocoa powder", amount: "75g" },
          { name: "Sugar", amount: "300g" },
          { name: "Butter", amount: "200g" },
          { name: "Eggs", amount: "4" },
          { name: "Milk", amount: "120ml" },
          { name: "Dark chocolate", amount: "150g" },
          { name: "Vanilla extract", amount: "5ml" },
        ],
      },
      {
        name: "Assorted Macarons",
        quantity: 2,
        ingredients: [
          { name: "Almond flour", amount: "200g" },
          { name: "Powdered sugar", amount: "200g" },
          { name: "Egg whites", amount: "100g" },
          { name: "Granulated sugar", amount: "100g" },
          { name: "Food coloring", amount: "various" },
          { name: "Butter", amount: "150g" },
          { name: "Vanilla extract", amount: "5ml" },
        ],
      },
    ],
  },
  {
    id: "ORD-7651",
    customer: "James Wilson",
    status: "Processing",
    items: [
      {
        name: "Strawberry Cheesecake",
        quantity: 1,
        ingredients: [
          { name: "Graham crackers", amount: "200g" },
          { name: "Butter", amount: "100g" },
          { name: "Cream cheese", amount: "500g" },
          { name: "Sugar", amount: "150g" },
          { name: "Eggs", amount: "3" },
          { name: "Vanilla extract", amount: "10ml" },
          { name: "Fresh strawberries", amount: "300g" },
          { name: "Strawberry jam", amount: "100g" },
        ],
      },
    ],
  },
  {
    id: "ORD-7650",
    customer: "Emma Johnson",
    status: "Shipped",
    items: [
      {
        name: "Tiramisu Cup",
        quantity: 2,
        ingredients: [
          { name: "Mascarpone cheese", amount: "250g" },
          { name: "Eggs", amount: "2" },
          { name: "Sugar", amount: "100g" },
          { name: "Ladyfinger cookies", amount: "100g" },
          { name: "Espresso coffee", amount: "120ml" },
          { name: "Cocoa powder", amount: "20g" },
          { name: "Rum", amount: "30ml" },
        ],
      },
      {
        name: "Cinnamon Rolls",
        quantity: 1,
        ingredients: [
          { name: "All-purpose flour", amount: "500g" },
          { name: "Butter", amount: "100g" },
          { name: "Milk", amount: "240ml" },
          { name: "Sugar", amount: "150g" },
          { name: "Cinnamon", amount: "30g" },
          { name: "Yeast", amount: "10g" },
          { name: "Eggs", amount: "1" },
          { name: "Cream cheese", amount: "100g" },
          { name: "Powdered sugar", amount: "150g" },
        ],
      },
    ],
  },
]

export default function IngredientsPage() {
  const [activeOrders, setActiveOrders] = useState([])
  const [allIngredients, setAllIngredients] = useState({})
  const [checkedIngredients, setCheckedIngredients] = useState({})
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Filter only processing orders
    const processingOrders = orders.filter((order) => order.status === "Processing")
    setActiveOrders(processingOrders)

    // Calculate all ingredients needed
    const ingredients = {}

    processingOrders.forEach((order) => {
      order.items.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          item.ingredients.forEach((ingredient) => {
            if (!ingredients[ingredient.name]) {
              ingredients[ingredient.name] = {
                amounts: [],
                orders: new Set(),
              }
            }
            ingredients[ingredient.name].amounts.push(ingredient.amount)
            ingredients[ingredient.name].orders.add(order.id)
          })
        }
      })
    })

    setAllIngredients(ingredients)

    // Initialize checked state for all ingredients
    const initialCheckedState = {}
    Object.keys(ingredients).forEach((ingredient) => {
      initialCheckedState[ingredient] = false
    })
    setCheckedIngredients(initialCheckedState)
  }, [])

  const toggleIngredientCheck = (ingredient) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [ingredient]: !prev[ingredient],
    }))
  }

  const filteredIngredients = Object.keys(allIngredients)
    .filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort()

  const getCompletionPercentage = () => {
    const total = Object.keys(checkedIngredients).length
    if (total === 0) return 0
    const checked = Object.values(checkedIngredients).filter(Boolean).length
    return Math.round((checked / total) * 100)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Ingredients Manager</h2>
        <p className="text-muted-foreground">Track ingredients needed for your pending orders</p>
      </div>

      <Tabs defaultValue="shopping-list" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
          <TabsTrigger value="shopping-list" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Shopping List
          </TabsTrigger>
          <TabsTrigger value="by-order" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            By Order
          </TabsTrigger>
          <TabsTrigger value="all-ingredients" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            All Ingredients
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shopping-list" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Shopping List</CardTitle>
                  <CardDescription>All ingredients needed for pending orders</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">Completion: {getCompletionPercentage()}%</div>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${getCompletionPercentage()}%` }} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex justify-between mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newState = {}
                    Object.keys(checkedIngredients).forEach((key) => {
                      newState[key] = true
                    })
                    setCheckedIngredients(newState)
                  }}
                >
                  Check All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newState = {}
                    Object.keys(checkedIngredients).forEach((key) => {
                      newState[key] = false
                    })
                    setCheckedIngredients(newState)
                  }}
                >
                  Uncheck All
                </Button>
              </div>

              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {filteredIngredients.map((ingredient) => (
                    <div
                      key={ingredient}
                      className={`flex items-start p-3 rounded-lg border ${
                        checkedIngredients[ingredient] ? "bg-muted/50 border-muted" : "bg-card"
                      }`}
                    >
                      <Checkbox
                        id={`check-${ingredient}`}
                        checked={checkedIngredients[ingredient]}
                        onCheckedChange={() => toggleIngredientCheck(ingredient)}
                        className="mt-1"
                      />
                      <div className="ml-3 flex-1">
                        <Label
                          htmlFor={`check-${ingredient}`}
                          className={`font-medium ${checkedIngredients[ingredient] ? "line-through text-muted-foreground" : ""}`}
                        >
                          {ingredient}
                        </Label>
                        <div className="text-sm text-muted-foreground mt-1">
                          <span>Needed for {allIngredients[ingredient].orders.size} orders</span>
                          <div className="mt-1">
                            {allIngredients[ingredient].amounts.map((amount, i) => (
                              <Badge key={i} variant="outline" className="mr-1 mb-1">
                                {amount}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredIngredients.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">No ingredients match your search</div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-order" className="mt-4 space-y-4">
          {activeOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle>{order.id}</CardTitle>
                    <CardDescription>Customer: {order.customer}</CardDescription>
                  </div>
                  <Badge>{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="font-medium mb-2">
                        {item.name} × {item.quantity}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                        {item.ingredients.map((ingredient, ingredientIndex) => (
                          <div key={ingredientIndex} className="flex items-center p-2 rounded-md border bg-muted/30">
                            <div className="flex-1">
                              <div className="font-medium text-sm">{ingredient.name}</div>
                              <div className="text-xs text-muted-foreground">{ingredient.amount}</div>
                            </div>
                            <Checkbox
                              checked={checkedIngredients[ingredient.name] || false}
                              onCheckedChange={() => toggleIngredientCheck(ingredient.name)}
                            />
                          </div>
                        ))}
                      </div>
                      {itemIndex < order.items.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {activeOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <CheckCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No active orders</h3>
              <p className="text-muted-foreground mt-1">All current orders have been processed</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all-ingredients" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ingredient Inventory</CardTitle>
              <CardDescription>Manage your ingredient inventory and set low stock alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input placeholder="Search ingredients..." />
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                  <div className="col-span-5">Ingredient</div>
                  <div className="col-span-2">In Stock</div>
                  <div className="col-span-2">Unit</div>
                  <div className="col-span-2">Alert Level</div>
                  <div className="col-span-1">Status</div>
                </div>

                <div className="divide-y">
                  {[
                    { name: "All-purpose flour", stock: 5, unit: "kg", alert: 2, status: "ok" },
                    { name: "Almond flour", stock: 1.2, unit: "kg", alert: 1, status: "low" },
                    { name: "Butter", stock: 3, unit: "kg", alert: 1, status: "ok" },
                    { name: "Cocoa powder", stock: 0.5, unit: "kg", alert: 1, status: "low" },
                    { name: "Cream cheese", stock: 2, unit: "kg", alert: 1, status: "ok" },
                    { name: "Dark chocolate", stock: 0.2, unit: "kg", alert: 0.5, status: "low" },
                    { name: "Eggs", stock: 24, unit: "pcs", alert: 12, status: "ok" },
                    { name: "Fresh strawberries", stock: 0, unit: "kg", alert: 1, status: "out" },
                    { name: "Milk", stock: 4, unit: "L", alert: 2, status: "ok" },
                    { name: "Sugar", stock: 7, unit: "kg", alert: 3, status: "ok" },
                    { name: "Vanilla extract", stock: 0.3, unit: "L", alert: 0.1, status: "ok" },
                  ].map((ingredient, i) => (
                    <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center">
                      <div className="col-span-5 font-medium">{ingredient.name}</div>
                      <div className="col-span-2">{ingredient.stock}</div>
                      <div className="col-span-2">{ingredient.unit}</div>
                      <div className="col-span-2">{ingredient.alert}</div>
                      <div className="col-span-1">
                        {ingredient.status === "ok" && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            OK
                          </Badge>
                        )}
                        {ingredient.status === "low" && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Low
                          </Badge>
                        )}
                        {ingredient.status === "out" && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Out
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline">Export Inventory</Button>
                <Button>Add Ingredient</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

