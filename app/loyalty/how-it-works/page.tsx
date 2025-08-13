import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Award, Gift, Calendar, TrendingUp, CreditCard, Hotel, Shield, Coffee } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto space-y-12">
              {/* En-tête */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Programme de Fidélité VoyageExplore</h1>
                <p className="text-xl text-muted-foreground">
                  Découvrez comment gagner et échanger des points pour profiter d'avantages exclusifs
                </p>
              </div>

              {/* Comment ça marche */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Comment ça marche</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <CardTitle>1. Gagnez des points</CardTitle>
                      <CardDescription>
                        Accumulez des points à chaque réservation et interaction avec VoyageExplore
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Réservez des voyages, partagez vos expériences, et participez à nos événements pour gagner des
                        points.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <Award className="h-6 w-6" />
                      </div>
                      <CardTitle>2. Montez en niveau</CardTitle>
                      <CardDescription>
                        Progressez à travers les niveaux Bronze, Silver, Gold et Platinum
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Chaque niveau vous offre des avantages supplémentaires et des privilèges exclusifs.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <Gift className="h-6 w-6" />
                      </div>
                      <CardTitle>3. Échangez vos points</CardTitle>
                      <CardDescription>
                        Utilisez vos points pour obtenir des récompenses et des avantages
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Réductions, surclassements, services exclusifs et bien plus encore vous attendent.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Comment gagner des points */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Comment gagner des points</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Réservations</h3>
                      <p className="text-sm text-muted-foreground">
                        Gagnez 10 points pour chaque euro dépensé sur vos réservations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Anniversaire</h3>
                      <p className="text-sm text-muted-foreground">
                        Recevez 500 points bonus le jour de votre anniversaire.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Parrainage</h3>
                      <p className="text-sm text-muted-foreground">
                        Gagnez 1000 points pour chaque ami parrainé qui effectue sa première réservation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Activités sur le site</h3>
                      <p className="text-sm text-muted-foreground">
                        Gagnez des points en laissant des avis, en partageant sur les réseaux sociaux, etc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Récompenses populaires */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Récompenses populaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <Percent className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Réduction de 50€</CardTitle>
                      </div>
                      <CardDescription>1000 points</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Obtenez une réduction de 50€ sur votre prochaine réservation.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <Hotel className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Surclassement chambre</CardTitle>
                      </div>
                      <CardDescription>1500 points</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Surclassement gratuit pour votre chambre d'hôtel.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <Coffee className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Accès salon VIP</CardTitle>
                      </div>
                      <CardDescription>1200 points</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Accès au salon VIP à l'aéroport pour un départ en toute tranquillité.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Assurance annulation</CardTitle>
                      </div>
                      <CardDescription>2000 points</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Assurance annulation gratuite pour votre prochain voyage.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Niveaux de fidélité */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Niveaux de fidélité</h2>
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-amber-700" />
                        <CardTitle>Bronze</CardTitle>
                      </div>
                      <CardDescription>0 - 1999 points</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Accumulation de points sur chaque réservation</li>
                        <li>Accès aux offres exclusives membres</li>
                        <li>Newsletter VIP</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-gray-400" />
                        <CardTitle>Silver</CardTitle>
                      </div>
                      <CardDescription>2000 - 3999 points</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Tous les avantages Bronze</li>
                        <li>10% de points supplémentaires sur les réservations</li>
                        <li>Priorité service client</li>
                        <li>Cadeau d'anniversaire</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <CardTitle>Gold</CardTitle>
                      </div>
                      <CardDescription>4000 - 7999 points</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Tous les avantages Silver</li>
                        <li>20% de points supplémentaires sur les réservations</li>
                        <li>Surclassement selon disponibilité</li>
                        <li>Check-in prioritaire</li>
                        <li>Concierge dédié</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-purple-500" />
                        <CardTitle>Platinum</CardTitle>
                      </div>
                      <CardDescription>8000+ points</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Tous les avantages Gold</li>
                        <li>30% de points supplémentaires sur les réservations</li>
                        <li>Garantie de disponibilité</li>
                        <li>Transferts aéroport gratuits</li>
                        <li>Expériences exclusives</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* FAQ */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Questions fréquentes</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Combien de temps mes points sont-ils valables ?</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Les points sont valables pendant 24 mois à compter de la date d'acquisition. Les points non
                      utilisés expirent après cette période.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Comment puis-je vérifier mon solde de points ?</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Vous pouvez consulter votre solde de points à tout moment en vous connectant à votre compte et en
                      visitant la section "Fidélité" de votre tableau de bord.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Puis-je transférer mes points à un autre membre ?</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Non, les points ne sont pas transférables entre les membres. Ils sont strictement personnels et
                      liés à votre compte.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Comment puis-je monter de niveau ?</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Votre niveau est déterminé par le nombre total de points que vous avez accumulés au cours des 12
                      derniers mois. Plus vous gagnez de points, plus vous montez rapidement en niveau.
                    </p>
                  </div>
                </div>
              </div>

              {/* Appel à l'action */}
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Prêt à commencer ?</h2>
                <p className="text-muted-foreground">
                  Rejoignez notre programme de fidélité dès aujourd'hui et commencez à accumuler des points pour vos
                  prochains voyages.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/auth/register">S'inscrire maintenant</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/dashboard/loyalty">Accéder à mon compte fidélité</Link>
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

function Percent(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" x2="5" y1="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  )
}
