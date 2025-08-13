import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/ui/page-transition"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDestinationsByRegion, getAllRegions } from "@/lib/destinations"
import { DestinationWeather } from "@/components/weather/destination-weather"

export const metadata: Metadata = {
  title: "Météo et saisons | VoyageExplore",
  description: "Consultez la météo et les saisons touristiques pour planifier votre voyage au meilleur moment",
}

export default function WeatherSeasonsPage() {
  const regions = getAllRegions()

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Météo et saisons</h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">
              Consultez les conditions météorologiques et les saisons touristiques pour planifier votre voyage au
              meilleur moment
            </p>
          </div>

          <Tabs defaultValue={regions[0]} className="w-full">
            <TabsList className="flex flex-wrap justify-center mb-8">
              {regions.map((region) => (
                <TabsTrigger key={region} value={region} className="text-sm md:text-base">
                  {region}
                </TabsTrigger>
              ))}
            </TabsList>

            {regions.map((region) => (
              <TabsContent key={region} value={region} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {getDestinationsByRegion(region)
                    .slice(0, 4)
                    .map((destination) => (
                      <Card key={destination.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle>
                            <Link href={`/destinations/${destination.id}`} className="hover:underline">
                              {destination.name}, {destination.country}
                            </Link>
                          </CardTitle>
                          <CardDescription>{destination.tagline}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <DestinationWeather destinationId={destination.id} />
                        </CardContent>
                      </Card>
                    ))}
                </div>

                <div className="text-center">
                  <Link
                    href={`/search?region=${encodeURIComponent(region)}`}
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 dark:bg-blue-500 px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 dark:hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
                  >
                    Voir toutes les destinations en {region}
                  </Link>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-12 bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Comprendre les saisons touristiques</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-red-500">Haute saison</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Période la plus populaire pour visiter une destination, généralement pendant les vacances scolaires ou
                  lorsque les conditions météorologiques sont optimales.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Prix plus élevés pour l'hébergement et les vols</li>
                  <li>Attractions touristiques bondées</li>
                  <li>Réservation à l'avance fortement recommandée</li>
                  <li>Ambiance animée et nombreuses activités disponibles</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-amber-500">Saison intermédiaire</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Période juste avant ou après la haute saison, offrant un bon équilibre entre conditions
                  météorologiques favorables et affluence modérée.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Prix plus raisonnables que pendant la haute saison</li>
                  <li>Moins de foules aux attractions principales</li>
                  <li>Météo généralement agréable avec quelques variations</li>
                  <li>Excellent compromis pour la plupart des voyageurs</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-500">Basse saison</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Période la moins fréquentée, souvent en raison de conditions météorologiques moins favorables ou hors
                  des périodes de vacances.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Prix significativement réduits pour l'hébergement et les vols</li>
                  <li>Expérience plus authentique avec les habitants</li>
                  <li>Peu d'attente aux attractions touristiques</li>
                  <li>Certaines activités peuvent être limitées ou indisponibles</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  )
}
