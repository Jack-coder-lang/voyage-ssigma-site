"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SearchBar } from "@/components/search-bar"
import { AdvancedFilters } from "@/components/search/advanced-filters"
import { ActiveFilters } from "@/components/search/active-filters"
import { SortOptions } from "@/components/search/sort-options"
import { filterDestinations } from "@/lib/search-utils"
import type { Destination } from "@/lib/destinations"
import { Button } from "@/components/ui/button"
import { MapPin, Search, Star } from "lucide-react"
import { popularSearchTerms } from "@/lib/search"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const minPrice = searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined
  const maxPrice = searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined
  const regions = searchParams.get("regions")?.split(",") || []
  const rating = searchParams.get("rating") ? Number.parseFloat(searchParams.get("rating")!) : undefined
  const deals = searchParams.get("deals") === "true"
  const sort = searchParams.get("sort") || "recommended"

  const [results, setResults] = useState<Destination[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Simuler un délai de chargement pour une meilleure UX
    const timer = setTimeout(() => {
      setResults(
        filterDestinations({
          query,
          minPrice,
          maxPrice,
          regions,
          rating,
          deals,
          sort,
        }),
      )
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [query, minPrice, maxPrice, regions, rating, deals, sort])

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Recherche de destinations</h1>
        <SearchBar defaultValue={query} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-6">
            <AdvancedFilters
              minPrice={0}
              maxPrice={3000}
              selectedRegions={regions}
              minRating={rating}
              onlyDeals={deals}
            />
          </div>

          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <ActiveFilters />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {results.length === 0
                    ? "Aucun résultat trouvé"
                    : `${results.length} résultat${results.length > 1 ? "s" : ""} trouvé${results.length > 1 ? "s" : ""}`}
                </p>
              </div>
              <SortOptions />
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex animate-pulse gap-4">
                    <div className="h-40 w-60 rounded-lg bg-gray-200 dark:bg-gray-800"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-5 w-1/3 rounded bg-gray-200 dark:bg-gray-800"></div>
                      <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800"></div>
                      <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800"></div>
                      <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6">
                {results.map((destination) => (
                  <Link
                    key={destination.id}
                    href={`/destinations/${destination.id}`}
                    className="flex flex-col sm:flex-row gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <div className="relative h-40 sm:w-60 w-full overflow-hidden rounded-lg">
                      <Image
                        src={destination.image || "/placeholder.svg?height=400&width=600"}
                        alt={destination.name}
                        fill
                        className="object-cover"
                      />
                      {destination.deals && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          PROMO
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold">{destination.name}</h2>
                          <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <MapPin className="h-3 w-3" />
                            {destination.country}, {destination.region}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{destination.price} €</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">par personne</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{destination.tagline}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{destination.rating.toFixed(1)}</span>
                          </div>
                          <span className="mx-2 text-gray-300">•</span>
                          <div className="flex flex-wrap gap-2">
                            {destination.features.slice(0, 3).map((feature, index) => (
                              <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button size="sm" className="hidden sm:flex">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </div>
                <h2 className="mb-2 text-xl font-semibold">Aucun résultat trouvé</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  Essayez avec d'autres termes ou parcourez nos destinations populaires.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {popularSearchTerms.slice(0, 6).map((term) => (
                    <Link key={term} href={`/search?q=${encodeURIComponent(term)}`}>
                      <Button variant="outline" size="sm">
                        {term}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
