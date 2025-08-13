import { SiteHeader } from "@/components/site-header"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoyaltyLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <SiteHeader />
      <div className="flex-1">
        <DashboardHeader />
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] px-4 md:px-6 py-6">
          <aside className="hidden md:block">
            <DashboardNav />
          </aside>
          <main className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-10 w-36" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-64 md:col-span-2" />
                <Skeleton className="h-64" />
              </div>

              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
