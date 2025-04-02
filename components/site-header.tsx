import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image src="/placeholder.svg" alt="Sweet Treats Logo" fill className="object-cover" />
          </div>
          <span className="hidden font-bold sm:inline-block">Sweet Treats</span>
        </Link>
        <div className="hidden md:flex">
          <MainNav />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full max-w-xs lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="w-full pl-8" />
            </div>
          </div>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                3
              </span>
            </Button>
          </Link>
          <UserNav />
        </div>
      </div>
      <div className="container md:hidden">
        <div className="overflow-x-auto py-2">
          <MainNav className="inline-flex" />
        </div>
      </div>
    </header>
  )
}

