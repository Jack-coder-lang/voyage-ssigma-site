"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LayoutDashboard, CalendarRange, MapPin, CreditCard, Settings, HelpCircle, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Vue d'ensemble",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mes voyages",
    href: "/dashboard/trips",
    icon: CalendarRange,
  },
  {
    title: "Destinations",
    href: "/dashboard/destinations",
    icon: MapPin,
  },
  {
    title: "Paiements",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Aide",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden mr-4">
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Ouvrir le menu</span>
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white dark:bg-gray-900 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>VoyageExplore</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Fermer le menu</span>
              </Button>
            </div>
            <nav className="grid gap-2 text-sm">
              {items.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2 font-normal",
                      pathname === item.href && "bg-gray-100 dark:bg-gray-800 font-medium",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
