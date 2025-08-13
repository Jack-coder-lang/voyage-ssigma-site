import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { CurrencyConverter } from "@/components/currency/currency-converter"
import { PageTransition } from "@/components/ui/page-transition"

export const metadata: Metadata = {
  title: "Convertisseur de devises | VoyageExplore",
  description: "Convertissez facilement entre différentes devises pour planifier votre budget voyage",
}

export default function CurrencyConverterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Convertisseur de devises</h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">
              Planifiez votre budget voyage en convertissant facilement entre différentes devises
            </p>
          </div>

          <CurrencyConverter />

          <div className="mt-12 bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Conseils pour la gestion de votre budget voyage</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Avant votre voyage</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Vérifiez les taux de change actuels et leur évolution récente</li>
                  <li>Comparez les frais de conversion de différentes banques et services</li>
                  <li>Envisagez d'obtenir une carte bancaire sans frais à l'étranger</li>
                  <li>Prévoyez un budget quotidien dans la devise locale</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Pendant votre voyage</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Payez dans la devise locale plutôt qu'en euros lors des transactions par carte</li>
                  <li>Évitez les bureaux de change dans les zones touristiques (taux défavorables)</li>
                  <li>Gardez une petite somme en espèces locales pour les petites dépenses</li>
                  <li>Conservez vos reçus pour suivre vos dépenses</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  )
}
