import { SiteHeader } from "@/components/site-header"

export default function BookingConfirmationLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 mb-4 animate-pulse"></div>
              <div className="h-10 w-2/3 mx-auto bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              <div className="h-6 w-1/2 mx-auto bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-4"></div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden mb-8">
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="h-7 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
                </div>
                <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                          <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                        <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="p-6 border-t flex flex-col sm:flex-row gap-4 sm:justify-between">
                <div className="h-10 w-full sm:w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
