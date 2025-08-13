import type { Metadata } from "next"
import { BookingForm } from "@/components/booking/booking-form"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Réservation en ligne | VoyageExplore",
  description: "Réservez votre prochain voyage en quelques clics avec VoyageExplore",
}

export default function BookingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Réservation en ligne</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                Réservez votre prochain voyage en quelques clics et bénéficiez de nos offres exclusives
              </p>
            </div>
            <BookingForm />
          </div>
        </div>
      </main>
    </div>
  )
}
