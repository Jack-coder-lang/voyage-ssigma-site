"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, CreditCard, Users, BarChart, Settings, HelpCircle, Bell, Award } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function DashboardNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Vue d'ensemble",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Réservations",
      href: "/dashboard/bookings",
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
    {
      title: "Paiements",
      href: "/dashboard/payments",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Fidélité",
      href: "/dashboard/loyalty",
      icon: <Award className="mr-2 h-4 w-4" />,
    },
    {
      title: "Profil",
      href: "/dashboard/profile",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Analytiques",
      href: "/dashboard/analytics",
      icon: <BarChart className="mr-2 h-4 w-4" />,
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      icon: <Bell className="mr-2 h-4 w-4" />,
    },
    {
      title: "Paramètres",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
    {
      title: "Aide",
      href: "/dashboard/help",
      icon: <HelpCircle className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => (
        <Button
          key={index}
          asChild
          variant={pathname === item.href ? "default" : "ghost"}
          className={cn("justify-start", pathname === item.href && "bg-primary text-primary-foreground")}
        >
          <Link href={item.href}>
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
