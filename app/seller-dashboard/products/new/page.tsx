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
import { Upload, X } from "lucide-react"

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState(["/placeholder.svg?height=300&width=300"])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Product created",
        description: "Your product has been created successfully.",
      })
      router.push("/seller-dashboard/products")
    }, 1500)
  }

  const handleAddImage = () => {
    setImages([...images, "/placeholder.svg?height=300&width=300"])
  }

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Add New Product</h2>
        <p className="text-muted-foreground">Create a new product to list in your store</p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:flex">
          <TabsTrigger value="basic" className="flex-1 sm:flex-auto">
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="details" className="flex-1 sm:flex-auto">
            Details
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
                  <Input id="productName" placeholder="Enter product name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your product" className="min-h-[120px]" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cakes">Cakes</SelectItem>
                        <SelectItem value="cookies">Cookies</SelectItem>
                        <SelectItem value="pastries">Pastries</SelectItem>
                        <SelectItem value="italian-desserts">Italian Desserts</SelectItem>
                        <SelectItem value="chocolates">Chocolates</SelectItem>
                        <SelectItem value="cupcakes">Cupcakes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="active" required>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="hidden">Hidden</SelectItem>
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
                  <Label htmlFor="ingredients">Ingredients</Label>
                  <Textarea id="ingredients" placeholder="List all ingredients" className="min-h-[120px]" />
                </div>

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
                        <Checkbox id={`diet-${option}`} />
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
                    <Input id="weight" type="number" min="0" placeholder="e.g. 250" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Size</Label>
                    <Select>
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storage">Storage Instructions</Label>
                  <Input id="storage" placeholder="e.g. Store in refrigerator" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shelfLife">Shelf Life (days)</Label>
                  <Input id="shelfLife" type="number" min="1" placeholder="e.g. 5" />
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
                    <Input id="price" type="number" min="0.01" step="0.01" placeholder="e.g. 19.99" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comparePrice">Compare-at Price (Optional)</Label>
                    <Input id="comparePrice" type="number" min="0.01" step="0.01" placeholder="e.g. 24.99" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost per item ($)</Label>
                    <Input id="cost" type="number" min="0.01" step="0.01" placeholder="e.g. 8.50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profit">Profit</Label>
                    <Input id="profit" disabled placeholder="$0.00" />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inventory">Inventory Quantity</Label>
                    <Input id="inventory" type="number" min="0" placeholder="e.g. 25" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                    <Input id="sku" placeholder="e.g. CAKE-CHO-001" />
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
                  {images.map((image, index) => (
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
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}

