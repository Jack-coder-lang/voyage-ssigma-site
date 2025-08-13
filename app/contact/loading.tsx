import { Skeleton } from "@/components/ui/skeleton"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ContactLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <Skeleton className="h-12 w-[300px] mx-auto" />
                <Skeleton className="h-6 w-[600px] mx-auto" />
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-[200px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <Skeleton className="h-[180px] w-full" />
                  <Skeleton className="h-[180px] w-full" />
                  <Skeleton className="h-[180px] w-full" />
                </div>

                <Skeleton className="h-[500px] w-full" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
