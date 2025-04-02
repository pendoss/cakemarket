"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Upload, X, Plus, Trash2 } from "lucide-react"

// Sample product data
const product = {
  id: 1,
  name: "Chocolate Fudge Cake",
  description: "Rich chocolate cake with fudge frosting",
  price: 24.99,
  comparePrice: 29.99,
  cost: 10.5,
  inventory: 15,
  sku: "CAKE-CHO-001",
  category: "Cakes",
  status: "Active",
  weight: 1200,
  size: "Regular",
  storage: "Refrigerate after opening",
  shelfLife: 5,
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
  dietary: ["Contains Gluten", "Contains Dairy"],
  images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
}

export default function EditProductPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [productData, setProductData] = useState(product)
  const [newIngredient, setNewIngredient] = useState({ name: "", amount: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Product updated",
        description: "Your product has been updated successfully.",
      })
      router.push("/seller-dashboard/products")
    }, 1500)
  }

  const handleAddImage = () => {
    setProductData({
      ...productData,
      images: [...productData.images, "/placeholder.svg?height=300&width=300"],
    })
  }

  const handleRemoveImage = (index) => {
    const newImages = [...productData.images]
    newImages.splice(index, 1)
    setProductData({
      ...productData,
      images: newImages,
    })
  }

  const handleAddIngredient = () => {
    if (!newIngredient.name || !newIngredient.amount) return

    setProductData({
      ...productData,
      ingredients: [...productData.ingredients, { ...newIngredient }],
    })
    setNewIngredient({ name: "", amount: "" })
  }

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...productData.ingredients]
    newIngredients.splice(index, 1)
    setProductData({
      ...productData,
      ingredients: newIngredients,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Edit Product</h2>
        <p className="text-muted-foreground">Update your product information</p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-5 sm:flex">
          <TabsTrigger value="basic" className="flex-1 sm:flex-auto">
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="details" className="flex-1 sm:flex-auto">
            Details
          </TabsTrigger>
          <TabsTrigger value="ingredients" className="flex-1 sm:flex-auto">
            Ingredients
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex-1 sm:flex-auto">
            Pricing
          </TabsTrigger>
          <TabsTrigger value="images" className="flex-1 sm:flex-auto">
            Images
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="basic" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={productData.description}
                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={productData.category}
                      onValueChange={(value) => setProductData({ ...productData, category: value })}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cakes">Cakes</SelectItem>
                        <SelectItem value="Cookies">Cookies</SelectItem>
                        <SelectItem value="Pastries">Pastries</SelectItem>
                        <SelectItem value="Italian Desserts">Italian Desserts</SelectItem>
                        <SelectItem value="Chocolates">Chocolates</SelectItem>
                        <SelectItem value="Cupcakes">Cupcakes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={productData.status}
                      onValueChange={(value) => setProductData({ ...productData, status: value })}
                      required
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Hidden">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Dietary Information</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "Gluten-Free",
                      "Vegan",
                      "Dairy-Free",
                      "Contains Nuts",
                      "Contains Gluten",
                      "Contains Dairy",
                      "May Contain Nuts",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`diet-${option}`}
                          checked={productData.dietary.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setProductData({
                                ...productData,
                                dietary: [...productData.dietary, option],
                              })
                            } else {
                              setProductData({
                                ...productData,
                                dietary: productData.dietary.filter((item) => item !== option),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={`diet-${option}`} className="text-sm font-normal">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (grams)</Label>
                    <Input
                      id="weight"
                      type="number"
                      min="0"
                      value={productData.weight}
                      onChange={(e) => setProductData({ ...productData, weight: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Size</Label>
                    <Select
                      value={productData.size}
                      onValueChange={(value) => setProductData({ ...productData, size: value })}
                    >
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Small">Small</SelectItem>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storage">Storage Instructions</Label>
                  <Input
                    id="storage"
                    value={productData.storage}
                    onChange={(e) => setProductData({ ...productData, storage: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shelfLife">Shelf Life (days)</Label>
                  <Input
                    id="shelfLife"
                    type="number"
                    min="1"
                    value={productData.shelfLife}
                    onChange={(e) => setProductData({ ...productData, shelfLife: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                      <div className="col-span-6">Ingredient</div>
                      <div className="col-span-5">Amount</div>
                      <div className="col-span-1"></div>
                    </div>

                    <div className="divide-y">
                      {productData.ingredients.map((ingredient, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 p-4 items-center">
                          <div className="col-span-6">{ingredient.name}</div>
                          <div className="col-span-5">{ingredient.amount}</div>
                          <div className="col-span-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              type="button"
                              onClick={() => handleRemoveIngredient(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 items-end">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="ingredientName">Ingredient Name</Label>
                      <Input
                        id="ingredientName"
                        value={newIngredient.name}
                        onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                        placeholder="e.g. Flour"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="ingredientAmount">Amount</Label>
                      <Input
                        id="ingredientAmount"
                        value={newIngredient.amount}
                        onChange={(e) => setNewIngredient({ ...newIngredient, amount: e.target.value })}
                        placeholder="e.g. 250g"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddIngredient}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Adding ingredients helps you track what you need for each order and manage your inventory
                    efficiently.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={productData.price}
                      onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comparePrice">Compare-at Price (Optional)</Label>
                    <Input
                      id="comparePrice"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={productData.comparePrice}
                      onChange={(e) => setProductData({ ...productData, comparePrice: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost per item ($)</Label>
                    <Input
                      id="cost"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={productData.cost}
                      onChange={(e) => setProductData({ ...productData, cost: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profit">Profit</Label>
                    <Input id="profit" disabled value={`$${(productData.price - productData.cost).toFixed(2)}`} />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inventory">Inventory Quantity</Label>
                    <Input
                      id="inventory"
                      type="number"
                      min="0"
                      value={productData.inventory}
                      onChange={(e) => setProductData({ ...productData, inventory: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                    <Input
                      id="sku"
                      value={productData.sku}
                      onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="trackInventory" defaultChecked />
                    <Label htmlFor="trackInventory">Track inventory</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="lowStock" />
                    <Label htmlFor="lowStock">Email me when inventory is low</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {productData.images.map((image, index) => (
                    <div key={index} className="relative aspect-square border rounded-lg overflow-hidden group">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          Main Image
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="aspect-square border rounded-lg border-dashed flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm font-medium">Add Image</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="mt-6 flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/seller-dashboard/products")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}

