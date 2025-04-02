"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus } from "lucide-react"
import { useRouter } from "next/navigation"

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Chocolate Fudge Cake",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 1,
    seller: "Sweet Delights Bakery",
  },
  {
    id: 3,
    name: "Assorted Macarons",
    price: 18.99,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 2,
    seller: "Parisian Delicacies",
  },
  {
    id: 5,
    name: "Vegan Chocolate Cookies",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 1,
    seller: "Green Treats",
  },
]

export function ShoppingCart() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.trim() === "") return
    setPromoApplied(true)
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any sweet treats to your cart yet.</p>
        <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-32 h-32 relative">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 p-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Seller: {item.seller}</p>
                  </div>
                  <div className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => router.push("/")}>
            Continue Shopping
          </Button>
          <Button variant="ghost" onClick={() => setCartItems([])}>
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {promoApplied && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount (10%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="pt-4">
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                <Button variant="outline" onClick={applyPromoCode} disabled={promoApplied || promoCode.trim() === ""}>
                  Apply
                </Button>
              </div>

              {promoApplied && <div className="text-sm text-green-600 mb-4">Promo code applied successfully!</div>}

              <Button className="w-full">Proceed to Checkout</Button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            <p>By proceeding to checkout, you agree to our terms of service and privacy policy.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

