export default function Loading() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 h-9 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
        <div className="mb-8 h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex animate-pulse gap-4">
              <div className="h-32 w-32 rounded-lg bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-5 w-1/3 rounded bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
