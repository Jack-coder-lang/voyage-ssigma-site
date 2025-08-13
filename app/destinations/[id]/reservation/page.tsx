import { notFound } from "next/navigation"
import { getDestinationById } from "@/lib/destinations"
import { SiteHeader } from "@/components/site-header"
import { ReservationForm } from "@/components/reservation-form"
import { AnimatedSection } from "@/components/ui/animated-section"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ReservationPage({ params }: { params: { id: string } }) {
  const destination = getDestinationById(params.id)

  if (!destination) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[30vh]">
          <div className="absolute inset-0 z-0">
            <Image
              src={destination.imageUrl || "/placeholder.svg"}
              alt={destination.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="container relative z-10 flex flex-col justify-end h-full px-4 pb-6 md:px-6">
            <AnimatedSection direction="up">
              <div className="max-w-3xl">
                <Link
                  href={`/destinations/${destination.id}`}
                  className="inline-flex items-center text-white mb-4 hover:underline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à la destination
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                  Réservation pour {destination.name}
                </h1>
                <p className="mt-2 text-lg text-white/90">
                  Complétez le formulaire ci-dessous pour réserver votre voyage
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Reservation Form Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <ReservationForm destination={destination} />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
