import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SellersList } from "@/components/sellers-list"
import { BecomeSellerForm } from "@/components/become-seller-form"

export default function SellersPage() {
  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Our Sellers</h1>
          <p className="text-muted-foreground">Discover our curated selection of artisan bakers and confectioners</p>
        </div>
        <div className="w-full md:w-auto">
          <Input placeholder="Search sellers..." className="md:w-[250px]" />
        </div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="browse">Browse Sellers</TabsTrigger>
          <TabsTrigger value="become">Become a Seller</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <SellersList />
        </TabsContent>

        <TabsContent value="become">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Join Our Marketplace</h2>
              <p className="text-muted-foreground">
                Share your sweet creations with our community and grow your business
              </p>
            </div>
            <BecomeSellerForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

