import { Catalog } from "@/components/catalog"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Sweet Treats Catalog</h1>
        <p className="text-muted-foreground mb-8">Browse our delicious selection of sweet treats from our sellers</p>
        <Catalog />
      </div>
    </main>
  )
}

