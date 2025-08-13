"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Calendar, MapPin, Users, CreditCard, Download, Share2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSection } from "@/components/ui/animated-section"

type BookingData = {
  bookingId: string
  bookingDate: string
  destination: string
  departureDate: string
  returnDate: string
  adults: string
  children: string
  travelType: string
  accommodation?: string
  transportType?: string
  mealPlan?: string
  activities?: string[]
  firstName: string
  lastName: string
  email: string
  phone: string
  paymentMethod: string
  status: string
}

export default function BookingConfirmationPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupérer les données de réservation depuis sessionStorage
    const storedData = sessionStorage.getItem("bookingData")

    if (storedData) {
      setBookingData(JSON.parse(storedData))
    } else {
      // Rediriger vers la page de réservation si aucune donnée n'est trouvée
      router.push("/booking")
    }

    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
      </div>
    )
  }

  if (!bookingData) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Aucune réservation trouvée</h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Nous n'avons pas trouvé de détails de réservation. Veuillez retourner à la page de réservation.
              </p>
              <Button asChild className="mt-6">
                <Link href="/booking">Faire une réservation</Link>
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
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Réservation confirmée !</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Votre réservation a été confirmée. Un email de confirmation a été envoyé à {bookingData.email}.
                </p>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Détails de la réservation</span>
                    <span className="text-sm font-normal px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full">
                      {bookingData.status}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Référence: {bookingData.bookingId} | Réservé le: {bookingData.bookingDate}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Destination</h3>
                          <p>{bookingData.destination}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Dates du voyage</h3>
                          <p>
                            {bookingData.departureDate} - {bookingData.returnDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Voyageurs</h3>
                          <p>
                            {bookingData.adults} adulte(s)
                            {Number.parseInt(bookingData.children) > 0 ? `, ${bookingData.children} enfant(s)` : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Type de voyage</h3>
                        <p>
                          {bookingData.travelType === "package"
                            ? "Forfait tout inclus"
                            : bookingData.travelType === "flight"
                              ? "Vol seulement"
                              : bookingData.travelType === "hotel"
                                ? "Hébergement seulement"
                                : "Voyage sur mesure"}
                        </p>
                      </div>

                      {bookingData.accommodation && (
                        <div>
                          <h3 className="font-medium">Hébergement</h3>
                          <p>
                            {bookingData.accommodation === "hotel"
                              ? "Hôtel"
                              : bookingData.accommodation === "resort"
                                ? "Resort tout inclus"
                                : bookingData.accommodation === "apartment"
                                  ? "Appartement"
                                  : bookingData.accommodation === "villa"
                                    ? "Villa privée"
                                    : "Auberge de jeunesse"}
                          </p>
                        </div>
                      )}

                      <div className="flex items-start space-x-3">
                        <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Méthode de paiement</h3>
                          <p>
                            {bookingData.paymentMethod === "card"
                              ? "Carte bancaire"
                              : bookingData.paymentMethod === "transfer"
                                ? "Virement bancaire"
                                : bookingData.paymentMethod === "mobile"
                                  ? "Mobile Money"
                                  : "Paiement à l'agence"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Coordonnées du voyageur principal</h3>
                    <p>
                      {bookingData.firstName} {bookingData.lastName}
                    </p>
                    <p>{bookingData.email}</p>
                    <p>{bookingData.phone}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
                  <Button variant="outline" className="w-full sm:w-auto" asChild>
                    <Link href="/dashboard">Voir mes réservations</Link>
                  </Button>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="#" onClick={(e) => e.preventDefault()}>
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="#" onClick={(e) => e.preventDefault()}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Partager
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold">Que faire ensuite ?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Préparez votre voyage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Consultez nos conseils pour préparer votre séjour
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full" asChild>
                        <Link href="#">Voir les conseils</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Contactez-nous</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Des questions ? Notre équipe est à votre disposition
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full" asChild>
                        <Link href="/contact">Nous contacter</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Explorez d'autres destinations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Découvrez nos autres destinations populaires
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full" asChild>
                        <Link href="/#destinations">Voir les destinations</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  )
}
