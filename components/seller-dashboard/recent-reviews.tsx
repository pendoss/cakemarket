import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

// Sample data
const reviews = [
  {
    id: 1,
    customer: "Emily Johnson",
    initial: "EJ",
    product: "Chocolate Fudge Cake",
    rating: 5,
    comment: "Absolutely delicious! The cake was moist and the frosting was perfect.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
  },
  {
    id: 2,
    customer: "Michael Smith",
    initial: "MS",
    product: "Assorted Macarons",
    rating: 4,
    comment: "Great flavors, though a couple were slightly cracked upon arrival.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
  {
    id: 3,
    customer: "Sarah Wilson",
    initial: "SW",
    product: "Strawberry Cheesecake",
    rating: 5,
    comment: "Best cheesecake I've ever had! Will definitely order again.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
]

export function RecentReviews() {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
          <div className="flex items-center gap-4 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/placeholder.svg?text=${review.initial}`} alt={review.customer} />
              <AvatarFallback>{review.initial}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{review.customer}</p>
              <p className="text-xs text-muted-foreground">{review.product}</p>
            </div>
            <div className="ml-auto flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                  />
                ))}
            </div>
          </div>
          <p className="text-sm">{review.comment}</p>
          <p className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(review.date, { addSuffix: true })}</p>
        </div>
      ))}
    </div>
  )
}

