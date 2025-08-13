"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Users, Hotel, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ReservationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  departureDate: string
  returnDate: string
  adults: string
  children: string
  accommodation: string
  specialRequests?: string
  destination: {
    id: string
    name: string
    country: string
  }
}

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [reservationData, setReservationData] = useState<ReservationData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupérer les données de réservation depuis sessionStorage
    const data = sessionStorage.getItem("reservationData")

    if (data) {
      const parsedData = JSON.parse(data)
      setReservationData(parsedData)
    } else {
      // Rediriger vers la page de destination si aucune donnée n'est trouvée
      router.push(`/destinations/${params.id}`)
    }

    setLoading(false)
  }, [params.id, router])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
      </div>
    )
  }

  if (!reservationData) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Aucune réservation trouvée</h1>
            <Link href={`/destinations/${params.id}`}>
              <Button>Retour à la destination</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const accommodationTypes = {
    hotel: "Hôtel",
    resort: "Resort tout inclus",
    apartment: "Appartement",
    villa: "Villa privée",
    hostel: "Auberge de jeunesse",
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold">Réservation confirmée !</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Merci pour votre réservation. Un email de confirmation a été envoyé à {reservationData.email}
                    </p>
                  </div>

                  <div className="border-t border-b dark:border-gray-700 py-6 my-6">
                    <h2 className="text-xl font-bold mb-4">Détails de la réservation</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-gray-500 dark:text-gray-400">Destination</h3>
                          <p className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                            {reservationData.destination.name}, {reservationData.destination.country}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-medium text-gray-500 dark:text-gray-400">Dates</h3>
                          <p className="flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                            Du {reservationData.departureDate} au {reservationData.returnDate}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-medium text-gray-500 dark:text-gray-400">Voyageurs</h3>
                          <p className="flex items-center mt-1">
                            <Users className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                            {reservationData.adults} adulte{Number.parseInt(reservationData.adults) > 1 ? "s" : ""}
                            {Number.parseInt(reservationData.children) > 0
                              ? `, ${reservationData.children} enfant${Number.parseInt(reservationData.children) > 1 ? "s" : ""}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-gray-500 dark:text-gray-400">Hébergement</h3>
                          <p className="flex items-center mt-1">
                            <Hotel className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                            {accommodationTypes[reservationData.accommodation as keyof typeof accommodationTypes]}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-medium text-gray-500 dark:text-gray-400">Contact</h3>
                          <p className="mt-1">
                            {reservationData.firstName} {reservationData.lastName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {reservationData.email} | {reservationData.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {reservationData.specialRequests && (
                      <div className="mt-6">
                        <h3 className="font-medium text-gray-500 dark:text-gray-400">Demandes spéciales</h3>
                        <p className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                          {reservationData.specialRequests}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Un conseiller voyage vous contactera dans les 24 heures pour finaliser votre réservation et
                      discuter des options de paiement.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/">
                        <Button variant="outline" className="w-full">
                          Retour à l'accueil
                        </Button>
                      </Link>
                      <Link href={`/destinations/${reservationData.destination.id}`}>
                        <Button className="w-full">
                          Voir la destination
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
