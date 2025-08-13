import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function UsersLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Skeleton className="h-10 w-full sm:w-64" />
        <Skeleton className="h-10 w-full sm:w-40" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4">
            <div className="flex items-center border-b pb-4">
              <Skeleton className="h-5 w-24 mr-8" />
              <Skeleton className="h-5 w-16 mr-8" />
              <Skeleton className="h-5 w-16 mr-8" />
              <Skeleton className="h-5 w-32 mr-8" />
              <Skeleton className="h-5 w-16 ml-auto" />
            </div>

            {Array(10)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex items-center py-4 border-b">
                  <div className="flex items-center gap-3 w-64">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16 mr-8" />
                  <Skeleton className="h-6 w-16 mr-8" />
                  <Skeleton className="h-4 w-32 mr-8" />
                  <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-64" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  )
}
