import type { Metadata } from "next"
import { BookingsList } from "@/components/dashboard/bookings-list"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export const metadata: Metadata = {
  title: "Mes Réservations | VoyageExplore",
  description: "Gérez vos réservations de voyage",
}

export default function BookingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <MobileNav />
          <div className="py-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Mes Réservations</h1>
                <p className="text-muted-foreground">Consultez et gérez vos réservations de voyage</p>
              </div>
              <BookingsList />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
