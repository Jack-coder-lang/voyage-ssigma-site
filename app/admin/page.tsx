import { AdminStats } from "@/components/admin/admin-stats"
import { RecentUsers } from "@/components/admin/recent-users"
import { RecentBookings } from "@/components/admin/recent-bookings"
import { PopularDestinations } from "@/components/admin/popular-destinations"
import { RevenueChart } from "@/components/admin/revenue-chart"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord administrateur</h1>
      </div>

      <AdminStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <RecentUsers className="md:col-span-1 lg:col-span-3" />
        <RecentBookings className="md:col-span-1 lg:col-span-4" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <PopularDestinations className="md:col-span-1 lg:col-span-3" />
        <RevenueChart className="md:col-span-1 lg:col-span-4" />
      </div>
    </div>
  )
}
