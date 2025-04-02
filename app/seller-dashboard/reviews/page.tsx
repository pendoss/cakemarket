import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Sample data
const reviews = [
  {
    id: 1,
    customer: { name: "Emily Johnson", initials: "EJ" },
    product: "Chocolate Fudge Cake",
    rating: 5,
    date: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    comment:
      "Absolutely delicious! The cake was moist and the frosting was perfect. Definitely ordering again for special occasions.",
    replied: true,
    reply: "Thank you for your kind words, Emily! We're glad you enjoyed our Chocolate Fudge Cake.",
    replyDate: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: 2,
    customer: { name: "Michael Smith", initials: "MS" },
    product: "Assorted Macarons",
    rating: 4,
    date: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    comment:
      "Great flavors, though a couple were slightly cracked upon arrival. Still delicious and beautifully presented.",
    replied: false,
  },
  {
    id: 3,
    customer: { name: "Sarah Wilson", initials: "SW" },
    product: "Strawberry Cheesecake",
    rating: 5,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    comment:
      "Best cheesecake I've ever had! The strawberry topping was fresh and not too sweet. Perfect balance of flavors.",
    replied: true,
    reply:
      "We're thrilled you enjoyed our Strawberry Cheesecake, Sarah! We work hard to ensure our fruit toppings are fresh and perfectly balanced.",
    replyDate: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
  },
  {
    id: 4,
    customer: { name: "James Wilson", initials: "JW" },
    product: "Vegan Chocolate Cookies",
    rating: 3,
    date: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    comment: "The cookies had good flavor but were a bit dry. Would have preferred them to be chewier.",
    replied: true,
    reply:
      "Thank you for your feedback, James. We're sorry the cookies weren't to your liking. We're working on improving our vegan recipe for a chewier texture.",
    replyDate: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
  },
  {
    id: 5,
    customer: { name: "Olivia Johnson", initials: "OJ" },
    product: "Tiramisu Cup",
    rating: 5,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    comment:
      "The tiramisu was perfect! Just the right amount of coffee flavor and so creamy. The individual cups are a great idea for portion control.",
    replied: false,
  },
]

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Product Reviews</h2>
        <p className="text-muted-foreground">Manage and respond to customer reviews</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
        <div className="grid gap-2 w-full sm:max-w-[360px]">
          <Input placeholder="Search reviews by product or customer..." />
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="rating-desc">Highest Rating</SelectItem>
              <SelectItem value="rating-asc">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
          <TabsTrigger value="all" className="flex-1 sm:flex-auto">
            All Reviews
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1 sm:flex-auto">
            Pending Reply
          </TabsTrigger>
          <TabsTrigger value="replied" className="flex-1 sm:flex-auto">
            Replied
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="mt-4 space-y-4">
          {reviews
            .filter((r) => !r.replied)
            .map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
        </TabsContent>

        <TabsContent value="replied" className="mt-4 space-y-4">
          {reviews
            .filter((r) => r.replied)
            .map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/placeholder.svg?text=${review.customer.initials}`} alt={review.customer.name} />
              <AvatarFallback>{review.customer.initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{review.customer.name}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(review.date, { addSuffix: true })}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
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
            <Badge variant={review.replied ? "default" : "outline"}>
              {review.replied ? "Replied" : "Awaiting Reply"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Product: {review.product}</h4>
          <div className="border rounded-lg p-3 bg-muted/50">
            <p className="text-sm">{review.comment}</p>
          </div>
        </div>

        {review.replied ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Your Reply:</h4>
            <div className="border rounded-lg p-3">
              <p className="text-sm">{review.reply}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Replied {formatDistanceToNow(review.replyDate, { addSuffix: true })}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Reply to this review:</h4>
            <Textarea placeholder="Type your reply here..." className="min-h-[100px]" />
            <div className="flex gap-2">
              <Button size="sm">Send Reply</Button>
              <Button variant="outline" size="sm">
                Clear
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

