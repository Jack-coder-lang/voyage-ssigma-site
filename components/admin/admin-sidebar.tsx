"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  MapPin,
  CalendarRange,
  FileText,
  Settings,
  ShieldCheck,
  BarChart,
  MessageSquare,
  CreditCard,
  Award,
  Globe,
  ClipboardList,
  Database,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AdminSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Vue d'ensemble",
      href: "/admin",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Utilisateurs",
      href: "/admin/users",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Destinations",
      href: "/admin/destinations",
      icon: <MapPin className="mr-2 h-4 w-4" />,
    },
    {
      title: "Réservations",
      href: "/admin/bookings",
      icon: <CalendarRange className="mr-2 h-4 w-4" />,
    },
    {
      title: "Paiements",
      href: "/admin/payments",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Programme de fidélité",
      href: "/admin/loyalty",
      icon: <Award className="mr-2 h-4 w-4" />,
    },
    {
      title: "Contenu du site",
      href: "/admin/content",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "Analytiques",
      href: "/admin/analytics",
      icon: <BarChart className="mr-2 h-4 w-4" />,
    },
    {
      title: "Journal d'activité",
      href: "/admin/activity-log",
      icon: <ClipboardList className="mr-2 h-4 w-4" />,
    },
    {
      title: "Sauvegardes",
      href: "/admin/backups",
      icon: <Database className="mr-2 h-4 w-4" />,
    },
    {
      title: "Rôles & Permissions",
      href: "/admin/roles",
      icon: <ShieldCheck className="mr-2 h-4 w-4" />,
    },
    {
      title: "Paramètres",
      href: "/admin/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
    {
      title: "Mon Profil",
      href: "/admin/profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      title: "Site public",
      href: "/",
      icon: <Globe className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-800 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center flex-shrink-0 px-4 mb-5">
          <span className="text-xl font-bold">VoyageExplore Admin</span>
        </div>
        <div className="mt-5 flex-1 flex flex-col px-3 space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              asChild
              variant={pathname === route.href ? "default" : "ghost"}
              className={cn("justify-start", pathname === route.href && "bg-primary text-primary-foreground")}
            >
              <Link href={route.href}>
                {route.icon}
                {route.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
