import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface RecentBookingsProps {
  className?: string
}

export function RecentBookings({ className }: RecentBookingsProps) {
  const bookings = [
    {
      id: "B-1234",
      destination: "Paris, France",
      image: "/placeholder.svg?height=40&width=40",
      dates: "15 - 22 juin 2024",
      status: "confirmé",
      price: "1 250 €",
    },
    {
      id: "B-1235",
      destination: "Rome, Italie",
      image: "/placeholder.svg?height=40&width=40",
      dates: "3 - 10 août 2024",
      status: "en attente",
      price: "1 480 €",
    },
    {
      id: "B-1236",
      destination: "Bali, Indonésie",
      image: "/placeholder.svg?height=40&width=40",
      dates: "12 - 26 septembre 2024",
      status: "confirmé",
      price: "2 350 €",
    },
    {
      id: "B-1237",
      destination: "New York, USA",
      image: "/placeholder.svg?height=40&width=40",
      dates: "5 - 12 novembre 2024",
      status: "en attente",
      price: "1 890 €",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Réservations récentes</CardTitle>
        <CardDescription>Vous avez effectué 4 réservations ce mois-ci.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={booking.image || "/placeholder.svg"} alt={booking.destination} />
                  <AvatarFallback>{booking.destination.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{booking.destination}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{booking.dates}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={booking.status === "confirmé" ? "default" : "outline"}>{booking.status}</Badge>
                <span className="text-sm font-medium">{booking.price}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
