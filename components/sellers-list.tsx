import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

// Sample seller data
const sellers = [
  {
    id: 1,
    name: "Sweet Delights Bakery",
    description: "Specializing in artisanal cakes and pastries made with organic ingredients",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    productsCount: 24,
    location: "New York, NY",
    specialties: ["Cakes", "Pastries", "Organic"],
    joinedDate: "June 2020",
  },
  {
    id: 2,
    name: "Cheesecake Heaven",
    description:
      "Premium cheesecakes in a variety of flavors, from classic New York style to innovative fusion creations",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    productsCount: 18,
    location: "Chicago, IL",
    specialties: ["Cheesecakes", "Gluten-Free Options"],
    joinedDate: "August 2021",
  },
  {
    id: 3,
    name: "Parisian Delicacies",
    description: "Authentic French pastries and macarons made by classically trained pastry chefs",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    productsCount: 32,
    location: "San Francisco, CA",
    specialties: ["Macarons", "French Pastries", "Croissants"],
    joinedDate: "January 2019",
  },
  {
    id: 4,
    name: "Morning Bakery",
    description: "Family-owned bakery specializing in breakfast pastries and cinnamon rolls",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    productsCount: 15,
    location: "Austin, TX",
    specialties: ["Cinnamon Rolls", "Breakfast Pastries"],
    joinedDate: "March 2022",
  },
  {
    id: 5,
    name: "Green Treats",
    description: "Plant-based and vegan desserts that are as delicious as they are sustainable",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    productsCount: 22,
    location: "Portland, OR",
    specialties: ["Vegan", "Plant-Based", "Sustainable"],
    joinedDate: "May 2021",
  },
  {
    id: 6,
    name: "Italian Sweets",
    description: "Traditional Italian desserts made with authentic recipes passed down through generations",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    productsCount: 28,
    location: "Boston, MA",
    specialties: ["Tiramisu", "Cannoli", "Italian Desserts"],
    joinedDate: "October 2020",
  },
]

export function SellersList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sellers.map((seller) => (
        <Card key={seller.id} className="overflow-hidden">
          <div className="aspect-[3/2] relative">
            <Image src={seller.image || "/placeholder.svg"} alt={seller.name} fill className="object-cover" />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{seller.name}</CardTitle>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{seller.rating}</span>
              </div>
            </div>
            <CardDescription>{seller.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Location:</span>
                <span>{seller.location}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Products:</span>
                <span>{seller.productsCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Joined:</span>
                <span>{seller.joinedDate}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {seller.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View Products</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

