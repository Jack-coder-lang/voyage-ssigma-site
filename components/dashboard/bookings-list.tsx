"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar, MapPin, MoreHorizontal, Search, Filter, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Données de réservation fictives
const bookings = [
  {
    id: "BK-123456",
    destination: "Paris, France",
    departureDate: new Date(2023, 11, 15),
    returnDate: new Date(2023, 11, 22),
    travelers: 2,
    status: "confirmé",
    price: "1250 €",
    type: "Forfait tout inclus",
  },
  {
    id: "BK-123457",
    destination: "Bali, Indonésie",
    departureDate: new Date(2024, 1, 10),
    returnDate: new Date(2024, 1, 24),
    travelers: 2,
    status: "en attente",
    price: "2800 €",
    type: "Voyage sur mesure",
  },
  {
    id: "BK-123458",
    destination: "New York, USA",
    departureDate: new Date(2024, 3, 5),
    returnDate: new Date(2024, 3, 12),
    travelers: 1,
    status: "confirmé",
    price: "1800 €",
    type: "Vol + Hôtel",
  },
  {
    id: "BK-123459",
    destination: "Rome, Italie",
    departureDate: new Date(2023, 9, 20),
    returnDate: new Date(2023, 9, 27),
    travelers: 4,
    status: "terminé",
    price: "3200 €",
    type: "Forfait tout inclus",
  },
  {
    id: "BK-123460",
    destination: "Tokyo, Japon",
    departureDate: new Date(2024, 5, 15),
    returnDate: new Date(2024, 5, 30),
    travelers: 2,
    status: "confirmé",
    price: "4500 €",
    type: "Voyage sur mesure",
  },
]

// Fonction pour obtenir la couleur du badge en fonction du statut
function getStatusColor(status: string) {
  switch (status) {
    case "confirmé":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "en attente":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "terminé":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    case "annulé":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  }
}

export function BookingsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filtrer les réservations en fonction des critères de recherche  = useState("all")

  // Filtrer les réservations en fonction des critères de recherche
  const filteredBookings = bookings.filter((booking) => {
    // Filtrer par terme de recherche
    const searchMatch =
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtrer par statut
    const statusMatch = statusFilter === "all" || booking.status === statusFilter

    return searchMatch && statusMatch
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="confirmé">Confirmé</SelectItem>
              <SelectItem value="en attente">En attente</SelectItem>
              <SelectItem value="terminé">Terminé</SelectItem>
              <SelectItem value="annulé">Annulé</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="cards">Cartes</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Mes réservations</CardTitle>
              <CardDescription>Gérez vos réservations de voyage et accédez à vos documents</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.destination}</TableCell>
                        <TableCell>
                          {format(booking.departureDate, "dd/MM/yyyy", { locale: fr })} -{" "}
                          {format(booking.returnDate, "dd/MM/yyyy", { locale: fr })}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)} variant="outline">
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{booking.price}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir les détails
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Télécharger les documents
                              </DropdownMenuItem>
                              {booking.status !== "terminé" && booking.status !== "annulé" && (
                                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                  Annuler la réservation
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        Aucune réservation trouvée
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <div className="text-sm text-muted-foreground">Affichage de {filteredBookings.length} réservation(s)</div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/booking">Nouvelle réservation</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{booking.destination}</CardTitle>
                      <Badge className={getStatusColor(booking.status)} variant="outline">
                        {booking.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {booking.id} | {booking.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {format(booking.departureDate, "dd/MM/yyyy", { locale: fr })} -{" "}
                          {format(booking.returnDate, "dd/MM/yyyy", { locale: fr })}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{booking.destination}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Prix: </span>
                        <span>{booking.price}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="#">Voir les détails</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-6 text-muted-foreground">Aucune réservation trouvée</div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" asChild>
              <Link href="/booking">Nouvelle réservation</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
