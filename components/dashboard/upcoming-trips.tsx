import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"

interface UpcomingTripsProps {
  className?: string
}

export function UpcomingTrips({ className }: UpcomingTripsProps) {
  const trips = [
    {
      id: 1,
      destination: "Paris, France",
      startDate: "15 juin 2024",
      endDate: "22 juin 2024",
      daysLeft: 42,
    },
    {
      id: 2,
      destination: "Rome, Italie",
      startDate: "3 août 2024",
      endDate: "10 août 2024",
      daysLeft: 91,
    },
    {
      id: 3,
      destination: "Bali, Indonésie",
      startDate: "12 septembre 2024",
      endDate: "26 septembre 2024",
      daysLeft: 131,
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Voyages à venir</CardTitle>
        <CardDescription>Vous avez 3 voyages planifiés dans les prochains mois.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trips.map((trip) => (
            <div key={trip.id} className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{trip.destination}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {trip.startDate} - {trip.endDate}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-sm font-medium">{trip.daysLeft} jours</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">restants</div>
                </div>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-2 rounded-full bg-blue-600 dark:bg-blue-400"
                  style={{
                    width: `${Math.max(5, Math.min(100, 100 - (trip.daysLeft / 180) * 100))}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
