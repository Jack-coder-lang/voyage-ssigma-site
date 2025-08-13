import type { Metadata } from "next"
import ReservationForm from "@/components/reservation-form-flight"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Réservation de Vol | VoyageExplore",
  description: "Réservez votre prochain vol avec VoyageExplore",
}

export default function ReservationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Réservation de Vol</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                Trouvez et réservez votre prochain vol aux meilleurs tarifs
              </p>
            </div>
            <ReservationForm />
          </div>
        </div>
      </main>
    </div>
  )
}
