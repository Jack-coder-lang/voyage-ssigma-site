import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function RolesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-48" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center border-b pb-2">
              <Skeleton className="h-5 w-24 mr-8" />
              <Skeleton className="h-5 w-48 mr-8" />
              <Skeleton className="h-5 w-24 mr-8" />
              <Skeleton className="h-5 w-16 ml-auto" />
            </div>

            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex items-center py-2">
                  <Skeleton className="h-5 w-32 mr-8" />
                  <Skeleton className="h-4 w-64 mr-8" />
                  <Skeleton className="h-4 w-16 mr-8" />
                  <div className="ml-auto flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="space-y-6">
              <div className="flex gap-8">
                <Skeleton className="h-5 w-32" />
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-5 w-24" />
                  ))}
              </div>

              {Array(10)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex gap-8 items-center">
                    <div className="w-32">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    {Array(5)
                      .fill(null)
                      .map((_, j) => (
                        <Skeleton key={j} className="h-4 w-4 rounded-sm" />
                      ))}
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Skeleton className="h-10 w-48" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
