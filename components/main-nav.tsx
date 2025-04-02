import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }) {
  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/categories",
      label: "Categories",
    },
    {
      href: "/sellers",
      label: "Sellers",
    },
    {
      href: "/new-arrivals",
      label: "New Arrivals",
    },
    {
      href: "/deals",
      label: "Special Deals",
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <Link key={route.href} href={route.href} className="text-sm font-medium transition-colors hover:text-primary">
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

