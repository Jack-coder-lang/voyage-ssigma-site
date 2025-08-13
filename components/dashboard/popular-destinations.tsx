import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface PopularDestinationsProps {
  className?: string
}

export function PopularDestinations({ className }: PopularDestinationsProps) {
  const destinations = [
    {
      id: "santorini",
      name: "Santorin",
      country: "Grèce",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "bali",
      name: "Bali",
      country: "Indonésie",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "tokyo",
      name: "Tokyo",
      country: "Japon",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "new-york",
      name: "New York",
      country: "USA",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Destinations populaires</CardTitle>
        <CardDescription>Basé sur vos préférences et les tendances actuelles.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.id}`}
              className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-md">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{destination.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{destination.country}</p>
              </div>
            </Link>
          ))}
          <Button variant="outline" size="sm" className="w-full mt-2">
            Voir toutes les destinations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
