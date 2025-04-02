"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function ProductCard({ product }) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation() // Prevent opening the modal when clicking the add to cart button

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <>
      <Card
        className="overflow-hidden transition-all duration-200 hover:shadow-md group relative"
        onClick={() => setIsOpen(true)}
      >
        <div className="aspect-square relative">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          <Button
            size="sm"
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
            <Badge variant="outline" className="ml-2 shrink-0">
              {product.category}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{product.description}</p>
          <div className="flex items-center gap-1 text-sm mb-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{product.rating}</span>
          </div>
          <p className="text-sm text-muted-foreground">Seller: {product.seller}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="font-semibold">${product.price.toFixed(2)}</div>
          <div className="flex flex-wrap gap-1">
            {product.dietary.slice(0, 2).map((diet, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {diet}
              </Badge>
            ))}
            {product.dietary.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{product.dietary.length - 2}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>

      <ProductDetailDialog product={product} isOpen={isOpen} setIsOpen={setIsOpen} onAddToCart={handleAddToCart} />
    </>
  )
}

function ProductDetailDialog({ product, isOpen, setIsOpen, onAddToCart }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <DialogClose className="absolute right-4 top-4 z-10">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          <div className="p-6 overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                  <DialogDescription className="text-sm">By {product.seller}</DialogDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-medium">{product.rating}</span>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-6">
              <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Dietary Information</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.dietary.map((diet, index) => (
                      <Badge key={index} variant="secondary">
                        {diet}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Size</h4>
                  <RadioGroup defaultValue="regular">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="size-small" />
                        <Label htmlFor="size-small">Small</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="regular" id="size-regular" />
                        <Label htmlFor="size-regular">Regular</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="large" id="size-large" />
                        <Label htmlFor="size-large">Large</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Tabs defaultValue="details" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <p>
                    {product.name} is a delicious treat made with the finest ingredients. Perfect for any occasion, this
                    sweet delight will satisfy your cravings.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shelf Life:</span>
                      <span className="font-medium">3-5 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="font-medium">Refrigerated</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Made in:</span>
                      <span className="font-medium">USA</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ingredients" className="space-y-4 mt-4">
                  <p className="text-sm">
                    Ingredients may include: flour, sugar, butter, eggs, milk, vanilla extract, and other natural
                    flavors.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Allergen information: May contain wheat, dairy, eggs, and nuts. Produced in a facility that
                    processes nuts.
                  </p>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    {[
                      { name: "Sarah L.", rating: 5, comment: "Absolutely delicious! Will definitely order again." },
                      { name: "Michael T.", rating: 4, comment: "Great flavor and texture. Arrived fresh." },
                      { name: "Jessica R.", rating: 5, comment: "Perfect sweetness level and beautiful presentation." },
                    ].map((review, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{review.name}</span>
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                                />
                              ))}
                          </div>
                        </div>
                        <p className="text-sm mt-1">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex gap-4">
                <Button className="flex-1" onClick={onAddToCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="flex-1">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

