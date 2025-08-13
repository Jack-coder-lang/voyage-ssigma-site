import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface RecentBookingsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentBookings({ className, ...props }: RecentBookingsProps) {
  // Données fictives pour les réservations récentes
  const recentBookings = [
    {
      id: "B-1234",
      destination: "Paris, France",
      customer: "Jean Dupont",
      date: "12/05/2023",
      amount: "€1,250",
      status: "confirmed",
    },
    {
      id: "B-1235",
      destination: "Rome, Italie",
      customer: "Marie Leroy",
      date: "14/05/2023",
      amount: "€980",
      status: "pending",
    },
    {
      id: "B-1236",
      destination: "Barcelone, Espagne",
      customer: "Pierre Martin",
      date: "15/05/2023",
      amount: "€850",
      status: "confirmed",
    },
    {
      id: "B-1237",
      destination: "Londres, Royaume-Uni",
      customer: "Sophie Dubois",
      date: "16/05/2023",
      amount: "€1,100",
      status: "cancelled",
    },
    {
      id: "B-1238",
      destination: "Amsterdam, Pays-Bas",
      customer: "Thomas Bernard",
      date: "18/05/2023",
      amount: "€920",
      status: "confirmed",
    },
  ]

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Réservations récentes</CardTitle>
        <CardDescription>{recentBookings.length} réservations effectuées récemment.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium p-2">ID</th>
                <th className="text-left font-medium p-2">Destination</th>
                <th className="text-left font-medium p-2">Client</th>
                <th className="text-left font-medium p-2">Date</th>
                <th className="text-left font-medium p-2">Montant</th>
                <th className="text-left font-medium p-2">Statut</th>
                <th className="text-left font-medium p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="p-2">{booking.id}</td>
                  <td className="p-2">{booking.destination}</td>
                  <td className="p-2">{booking.customer}</td>
                  <td className="p-2">{booking.date}</td>
                  <td className="p-2">{booking.amount}</td>
                  <td className="p-2">
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {booking.status === "confirmed"
                        ? "Confirmée"
                        : booking.status === "pending"
                          ? "En attente"
                          : "Annulée"}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Voir les détails</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
