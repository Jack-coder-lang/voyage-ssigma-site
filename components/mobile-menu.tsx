"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  links: { name: string; href: string }[]
}

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col space-y-4 mt-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                pathname === link.href ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300",
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t pt-4 space-y-2">
            <Link href="/auth/login" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Connexion
              </Button>
            </Link>
            <Link href="/auth/register" onClick={() => setOpen(false)}>
              <Button className="w-full">Inscription</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
