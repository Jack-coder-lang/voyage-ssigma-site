import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PopularDestinationsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PopularDestinations({ className, ...props }: PopularDestinationsProps) {
  // Données fictives pour les destinations populaires
  const popularDestinations = [
    {
      id: "1",
      name: "Paris, France",
      bookings: 124,
      trend: "up",
      percentage: 12,
    },
    {
      id: "2",
      name: "Rome, Italie",
      bookings: 98,
      trend: "up",
      percentage: 8,
    },
    {
      id: "3",
      name: "Barcelone, Espagne",
      bookings: 87,
      trend: "down",
      percentage: 3,
    },
    {
      id: "4",
      name: "Londres, Royaume-Uni",
      bookings: 76,
      trend: "up",
      percentage: 5,
    },
    {
      id: "5",
      name: "Amsterdam, Pays-Bas",
      bookings: 65,
      trend: "down",
      percentage: 2,
    },
  ]

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Destinations populaires</CardTitle>
        <CardDescription>Les destinations les plus réservées ce mois-ci.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularDestinations.map((destination) => (
            <div key={destination.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium leading-none">{destination.name}</p>
                <p className="text-xs text-muted-foreground">{destination.bookings} réservations</p>
              </div>
              <Badge variant={destination.trend === "up" ? "default" : "secondary"}>
                {destination.trend === "up" ? "+" : "-"}
                {destination.percentage}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
