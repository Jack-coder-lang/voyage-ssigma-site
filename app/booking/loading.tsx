import { SiteHeader } from "@/components/site-header"

export default function BookingLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto space-y-8">
            <div className="space-y-2 text-center">
              <div className="h-10 w-2/3 mx-auto bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              <div className="h-6 w-1/2 mx-auto bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            </div>

            <div className="w-full max-w-4xl mx-auto rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                      <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                      <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                      <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                      <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <div className="h-10 w-28 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-10 w-28 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
