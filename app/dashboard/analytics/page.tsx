import { SiteHeader } from "@/components/site-header"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview"

export default function AnalyticsPage() {
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
            <AnalyticsOverview />
          </main>
        </div>
      </div>
    </div>
  )
}
