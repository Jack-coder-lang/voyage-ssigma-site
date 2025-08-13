import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export default function BookingsLoading() {
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
                <div className="h-9 w-1/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-2"></div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="h-10 w-full sm:w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="h-10 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-2"></div>
                  </div>

                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <div className="h-5 w-1/12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                        <div className="h-5 w-1/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                        <div className="h-5 w-1/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                        <div className="h-5 w-1/12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                        <div className="h-5 w-1/12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                        <div className="h-5 w-1/12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                      </div>

                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex justify-between py-2">
                          <div className="h-5 w-1/12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                          <div className="h-5 w-1/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                          <div className="h-5 w-1/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                          <div className="h-5 w-1/12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                          <div className="h-5 w-1/12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                          <div className="h-5 w-1/12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t flex justify-between">
                    <div className="h-5 w-1/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-9 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
