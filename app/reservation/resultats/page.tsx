"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { ArrowRight, ArrowLeft, Plane, Calendar, Users } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/ui/animated-section"

// Type pour les données de réservation
type FlightReservation = {
  tripType: "aller-retour" | "aller-simple" | "multi-destinations"
  departureCity: string
  arrivalCity: string
  departureDate: string
  returnDate?: string
  travelClass: "economy" | "premium" | "business" | "premiere"
  passengers: {
    baby: number
    child: number
    youth12to17: number
    youth18to24: number
    student: number
    adult: number
    senior: number
  }
}

// Données fictives pour les vols
const mockFlights = [
  {
    id: "AF1234",
    airline: "Air France",
    departureTime: "08:25",
    arrivalTime: "10:45",
    duration: "2h 20m",
    price: 160750, // Prix en XOF (environ 245€)
    direct: true,
  },
  {
    id: "LH5678",
    airline: "Lufthansa",
    departureTime: "10:15",
    arrivalTime: "12:30",
    duration: "2h 15m",
    price: 180375, // Prix en XOF (environ 275€)
    direct: true,
  },
  {
    id: "BA9012",
    airline: "British Airways",
    departureTime: "13:40",
    arrivalTime: "16:10",
    duration: "2h 30m",
    price: 150700, // Prix en XOF (environ 230€)
    direct: true,
  },
  {
    id: "IB3456",
    airline: "Iberia",
    departureTime: "15:20",
    arrivalTime: "18:05",
    duration: "2h 45m",
    price: 137550, // Prix en XOF (environ 210€)
    direct: false,
    stopover: "Madrid",
    stopoversTime: "1h 15m",
  },
  {
    id: "KL7890",
    airline: "KLM",
    departureTime: "18:30",
    arrivalTime: "20:45",
    duration: "2h 15m",
    price: 173575, // Prix en XOF (environ 265€)
    direct: true,
  },
]

export default function ResultatsPage() {
  const router = useRouter()
  const [reservation, setReservation] = useState<FlightReservation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupérer les données de réservation du sessionStorage
    const storedData = sessionStorage.getItem("flightReservation")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setReservation(parsedData)
      } catch (error) {
        console.error("Erreur lors de la récupération des données de réservation:", error)
      }
    }

    // Simuler un chargement
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "EEEE d MMMM yyyy", { locale: fr })
    } catch (error) {
      return dateString
    }
  }

  // Fonction pour obtenir le nombre total de passagers
  const getTotalPassengers = () => {
    if (!reservation) return 0

    return Object.values(reservation.passengers).reduce((sum, count) => sum + count, 0)
  }

  // Fonction pour afficher le résumé des passagers
  const getPassengersSummary = () => {
    if (!reservation) return ""

    const { passengers } = reservation
    const parts = []

    if (passengers.adult > 0) parts.push(`${passengers.adult} Adulte${passengers.adult > 1 ? "s" : ""}`)
    if (passengers.senior > 0) parts.push(`${passengers.senior} Senior${passengers.senior > 1 ? "s" : ""}`)
    if (passengers.youth12to17 > 0 || passengers.youth18to24 > 0) {
      const youthCount = passengers.youth12to17 + passengers.youth18to24
      parts.push(`${youthCount} Jeune${youthCount > 1 ? "s" : ""}`)
    }
    if (passengers.student > 0) parts.push(`${passengers.student} Étudiant${passengers.student > 1 ? "s" : ""}`)
    if (passengers.child > 0) parts.push(`${passengers.child} Enfant${passengers.child > 1 ? "s" : ""}`)
    if (passengers.baby > 0) parts.push(`${passengers.baby} Bébé${passengers.baby > 1 ? "s" : ""}`)

    return parts.join(", ")
  }

  // Fonction pour traduire la classe de voyage
  const translateTravelClass = (travelClass: string) => {
    const classes = {
      economy: "Économique",
      premium: "Premium",
      business: "Affaires",
      premiere: "La Première",
    }
    return classes[travelClass as keyof typeof classes] || travelClass
  }

  // Fonction pour formater le prix en XOF
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF", maximumFractionDigits: 0 }).format(
      price,
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-lg">Recherche des meilleurs vols...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!reservation) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <h2 className="text-2xl font-bold">Aucune recherche en cours</h2>
              <p className="mt-2 text-gray-500">Veuillez effectuer une nouvelle recherche de vol</p>
              <Button className="mt-4" onClick={() => router.push("/reservation")}>
                Nouvelle recherche
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <AnimatedSection>
            <div className="mb-8">
              <Button variant="outline" onClick={() => router.push("/reservation")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Modifier la recherche
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Itinéraire</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{reservation.departureCity.split(",")[0]}</div>
                    {reservation.tripType === "aller-retour" ? (
                      <div className="flex items-center text-gray-500">
                        <ArrowRight className="h-4 w-4 mx-1" />
                        <ArrowLeft className="h-4 w-4 mx-1" />
                      </div>
                    ) : (
                      <ArrowRight className="h-4 w-4 text-gray-500" />
                    )}
                    <div className="font-medium">{reservation.arrivalCity.split(",")[0]}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Dates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Départ</div>
                      <div>{formatDate(reservation.departureDate)}</div>
                    </div>
                  </div>
                  {reservation.tripType === "aller-retour" && reservation.returnDate && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Retour</div>
                        <div>{formatDate(reservation.returnDate)}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Voyageurs et classe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Passagers</div>
                      <div>
                        {getTotalPassengers()} ({getPassengersSummary()})
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Plane className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Classe</div>
                      <div>{translateTravelClass(reservation.travelClass)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mb-6">Vols aller - {formatDate(reservation.departureDate)}</h2>

            <div className="space-y-4">
              {mockFlights.map((flight) => (
                <Card key={flight.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="p-6 flex items-center">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
                          {flight.airline.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium">{flight.airline}</div>
                          <div className="text-sm text-gray-500">{flight.id}</div>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xl font-bold">{flight.departureTime}</div>
                          <div className="text-sm text-gray-500 mx-2">{flight.duration}</div>
                          <div className="text-xl font-bold">{flight.arrivalTime}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm">{reservation.departureCity.split(",")[0]}</div>
                          <div className="flex-1 mx-2 border-t border-dashed border-gray-300 dark:border-gray-600 relative">
                            {!flight.direct && (
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 text-xs text-gray-500">
                                {flight.stopover}
                              </div>
                            )}
                          </div>
                          <div className="text-sm">{reservation.arrivalCity.split(",")[0]}</div>
                        </div>
                        {!flight.direct && (
                          <div className="mt-2 text-xs text-gray-500">
                            1 escale · {flight.stopoversTime} à {flight.stopover}
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col justify-center">
                        {flight.direct ? (
                          <Badge className="w-fit">Vol direct</Badge>
                        ) : (
                          <Badge variant="outline" className="w-fit">
                            1 escale
                          </Badge>
                        )}
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Classe:</span> {translateTravelClass(reservation.travelClass)}
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="font-medium">Bagages:</span> 1 bagage cabine inclus
                        </div>
                      </div>

                      <div className="p-6 flex flex-col justify-center items-end">
                        <div className="text-2xl font-bold mb-2">{formatPrice(flight.price)}</div>
                        <Button>Sélectionner</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {reservation.tripType === "aller-retour" && reservation.returnDate && (
              <>
                <h2 className="text-2xl font-bold mt-12 mb-6">Vols retour - {formatDate(reservation.returnDate)}</h2>

                <div className="space-y-4">
                  {mockFlights
                    .slice()
                    .reverse()
                    .map((flight, index) => (
                      <Card key={`return-${flight.id}-${index}`} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="p-6 flex items-center">
                              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
                                {flight.airline.substring(0, 2)}
                              </div>
                              <div>
                                <div className="font-medium">{flight.airline}</div>
                                <div className="text-sm text-gray-500">{flight.id}</div>
                              </div>
                            </div>

                            <div className="p-6 flex flex-col justify-center">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-xl font-bold">{flight.departureTime}</div>
                                <div className="text-sm text-gray-500 mx-2">{flight.duration}</div>
                                <div className="text-xl font-bold">{flight.arrivalTime}</div>
                              </div>
                              <div className="flex items-center">
                                <div className="text-sm">{reservation.arrivalCity.split(",")[0]}</div>
                                <div className="flex-1 mx-2 border-t border-dashed border-gray-300 dark:border-gray-600 relative">
                                  {!flight.direct && (
                                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 text-xs text-gray-500">
                                      {flight.stopover}
                                    </div>
                                  )}
                                </div>
                                <div className="text-sm">{reservation.departureCity.split(",")[0]}</div>
                              </div>
                              {!flight.direct && (
                                <div className="mt-2 text-xs text-gray-500">
                                  1 escale · {flight.stopoversTime} à {flight.stopover}
                                </div>
                              )}
                            </div>

                            <div className="p-6 flex flex-col justify-center">
                              {flight.direct ? (
                                <Badge className="w-fit">Vol direct</Badge>
                              ) : (
                                <Badge variant="outline" className="w-fit">
                                  1 escale
                                </Badge>
                              )}
                              <div className="mt-2 text-sm">
                                <span className="font-medium">Classe:</span>{" "}
                                {translateTravelClass(reservation.travelClass)}
                              </div>
                              <div className="mt-1 text-sm">
                                <span className="font-medium">Bagages:</span> 1 bagage cabine inclus
                              </div>
                            </div>

                            <div className="p-6 flex flex-col justify-center items-end">
                              <div className="text-2xl font-bold mb-2">{formatPrice(flight.price)}</div>
                              <Button>Sélectionner</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </>
            )}
          </AnimatedSection>
        </div>
      </main>
    </div>
  )
}
