import type { Destination } from "@/lib/destinations"
import { destinations } from "@/lib/destinations"

export interface SearchFilters {
  query?: string
  minPrice?: number
  maxPrice?: number
  regions?: string[]
  rating?: number
  deals?: boolean
  sort?: string
}

export function filterDestinations(filters: SearchFilters): Destination[] {
  let results = [...destinations]

  // Filtre par texte de recherche
  if (filters.query) {
    const searchTerm = filters.query.toLowerCase().trim()
    results = results.filter(
      (destination) =>
        destination.name.toLowerCase().includes(searchTerm) ||
        destination.country.toLowerCase().includes(searchTerm) ||
        destination.region.toLowerCase().includes(searchTerm) ||
        destination.tagline.toLowerCase().includes(searchTerm) ||
        destination.description.toLowerCase().includes(searchTerm),
    )
  }

  // Filtre par fourchette de prix
  if (filters.minPrice !== undefined) {
    results = results.filter((destination) => destination.price >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    results = results.filter((destination) => destination.price <= filters.maxPrice!)
  }

  // Filtre par région
  if (filters.regions && filters.regions.length > 0) {
    results = results.filter((destination) => filters.regions!.includes(destination.region))
  }

  // Filtre par note minimale
  if (filters.rating !== undefined && filters.rating > 0) {
    results = results.filter((destination) => destination.rating >= filters.rating!)
  }

  // Filtre par promotions uniquement
  if (filters.deals) {
    results = results.filter((destination) => destination.deals)
  }

  // Tri des résultats
  if (filters.sort) {
    switch (filters.sort) {
      case "price_asc":
        results.sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        results.sort((a, b) => b.price - a.price)
        break
      case "rating_desc":
        results.sort((a, b) => b.rating - a.rating)
        break
      case "popularity":
        results.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
        break
      // Par défaut: recommandés (combinaison de popularité et notes)
      default:
        results.sort((a, b) => {
          const scoreA = (a.popular ? 2 : 0) + (a.trending ? 1 : 0) + a.rating / 5
          const scoreB = (b.popular ? 2 : 0) + (b.trending ? 1 : 0) + b.rating / 5
          return scoreB - scoreA
        })
    }
  }

  return results
}
