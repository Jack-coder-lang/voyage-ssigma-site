import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Award, Check, ChevronRight } from "lucide-react"

export default function LoyaltyLevelsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto space-y-8">
              {/* En-tête */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Niveaux de Fidélité</h1>
                <p className="text-xl text-muted-foreground">
                  Découvrez les avantages exclusifs de chaque niveau de fidélité
                </p>
              </div>

              {/* Tableau comparatif des niveaux */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Bronze */}
                <Card className="border-amber-200 dark:border-amber-800">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900">
                        <Award className="h-8 w-8 text-amber-700 dark:text-amber-500" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Bronze</CardTitle>
                    <CardDescription className="text-center">0 - 1999 points</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Accumulation de points sur chaque réservation</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Accès aux offres exclusives membres</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Newsletter VIP</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/loyalty">
                        Voir mon statut
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Silver */}
                <Card className="border-gray-300 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                        <Award className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Silver</CardTitle>
                    <CardDescription className="text-center">2000 - 3999 points</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Tous les avantages Bronze</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>10% de points supplémentaires sur les réservations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Priorité service client</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Cadeau d'anniversaire</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/loyalty">
                        Voir mon statut
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Gold */}
                <Card className="border-yellow-300 dark:border-yellow-800">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900">
                        <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Gold</CardTitle>
                    <CardDescription className="text-center">4000 - 7999 points</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Tous les avantages Silver</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>20% de points supplémentaires sur les réservations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Surclassement selon disponibilité</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Check-in prioritaire</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Concierge dédié</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/loyalty">
                        Voir mon statut
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Platinum */}
                <Card className="border-purple-300 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                        <Award className="h-8 w-8 text-purple-600 dark:text-purple-500" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Platinum</CardTitle>
                    <CardDescription className="text-center">8000+ points</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Tous les avantages Gold</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>30% de points supplémentaires sur les réservations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Garantie de disponibilité</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Transferts aéroport gratuits</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                        <span>Expériences exclusives</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/loyalty">
                        Voir mon statut
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Comment gagner des points */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Comment gagner des points</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Réservations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Gagnez 10 points pour chaque euro dépensé sur vos réservations. Plus vous voyagez, plus vous
                        gagnez de points !
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Parrainage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Parrainez vos amis et gagnez 1000 points pour chaque ami qui effectue sa première réservation
                        avec votre code.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Avis et partages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Partagez vos expériences de voyage et gagnez des points supplémentaires. 100 points pour chaque
                        avis publié.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Anniversaire</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Recevez 500 points bonus le jour de votre anniversaire. Un cadeau pour célébrer votre journée
                        spéciale !
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Événements spéciaux</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Participez à nos événements spéciaux et gagnez des points bonus. Consultez notre calendrier
                        d'événements.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Promotions saisonnières</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Profitez de nos promotions saisonnières pour gagner des points supplémentaires sur vos
                        réservations.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Appel à l'action */}
              <div className="text-center space-y-4 pt-6">
                <h2 className="text-2xl font-bold tracking-tight">Commencez à gagner des points dès maintenant</h2>
                <p className="text-muted-foreground">
                  Rejoignez notre programme de fidélité et profitez d'avantages exclusifs pour vos voyages.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/booking">Réserver un voyage</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/loyalty/how-it-works">En savoir plus</Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  )
}
