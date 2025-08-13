import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { HoverCard } from "@/components/ui/hover-card"

const featuredDestinations = [
  {
    id: "dakar",
    name: "Dakar",
    country: "Sénégal",
    image: "/dakar.jpg?height=300&width=400",
    price: 350000,
    rating: 4.8,
    reviews: 127,
    tag: "Populaire",
    description: "Capitale vibrante avec des plages magnifiques",
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Maroc",
    image: "/placeholder.svg?height=300&width=400",
    price: 420000,
    rating: 4.9,
    reviews: 203,
    tag: "Coup de cœur",
    description: "Ville impériale aux mille couleurs",
  },
  {
    id: "cape-town",
    name: "Le Cap",
    country: "Afrique du Sud",
    image: "/placeholder.svg?height=300&width=400",
    price: 580000,
    rating: 4.7,
    reviews: 156,
    tag: "Aventure",
    description: "Entre océan et montagne, une beauté saisissante",
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    country: "Tanzanie",
    image: "/placeholder.svg?height=300&width=400",
    price: 650000,
    rating: 4.6,
    reviews: 89,
    tag: "Détente",
    description: "Île paradisiaque aux eaux cristallines",
  },
  {
    id: "dubai",
    name: "Dubaï",
    country: "Émirats Arabes Unis",
    image: "/placeholder.svg?height=300&width=400",
    price: 750000,
    rating: 4.8,
    reviews: 312,
    tag: "Luxe",
    description: "Ville futuriste aux expériences uniques",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonésie",
    image: "/placeholder.svg?height=300&width=400",
    price: 680000,
    rating: 4.9,
    reviews: 245,
    tag: "Spirituel",
    description: "Île des dieux aux paysages enchanteurs",
  },
]

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(price)
}

export function FeaturedDestinations() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Destinations populaires</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez nos destinations les plus prisées, soigneusement sélectionnées pour vous offrir des expériences
              inoubliables
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredDestinations.map((destination, index) => (
            <AnimatedSection key={destination.id} delay={index * 0.1} direction="up">
              <HoverCard>
                <Card className="overflow-hidden h-full">
                  <div className="relative">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-blue-600 text-white">{destination.tag}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{destination.country}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{destination.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{destination.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({destination.reviews} avis)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">{formatPrice(destination.price)}</span>
                        <span className="text-sm text-gray-500 ml-1">/ personne</span>
                      </div>
                      <Link href={`/destinations/${destination.id}`}>
                        <Button size="sm">Découvrir</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </HoverCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6}>
          <div className="text-center">
            <Link href="/destinations">
              <Button size="lg" variant="outline">
                Voir toutes les destinations
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
