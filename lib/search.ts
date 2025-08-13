import { destinations as destinationsData, type Destination } from "@/lib/destinations"

// Fonction pour rechercher des destinations en fonction d'un terme de recherche
export function searchDestinations(query: string): Destination[] {
  if (!query) return []

  const searchTerm = query.toLowerCase().trim()

  // Vérifier que destinations existe avant d'appeler filter
  if (!destinationsData || !Array.isArray(destinationsData)) {
    console.error("Les destinations ne sont pas disponibles ou ne sont pas un tableau")
    return []
  }

  return destinationsData.filter((destination) => {
    return (
      destination.name.toLowerCase().includes(searchTerm) ||
      destination.country.toLowerCase().includes(searchTerm) ||
      destination.region.toLowerCase().includes(searchTerm) ||
      destination.tagline.toLowerCase().includes(searchTerm) ||
      destination.description.toLowerCase().includes(searchTerm)
    )
  })
}

// Termes de recherche populaires pour les suggestions
export const popularSearchTerms = [
  "Paris",
  "Plage",
  "Montagne",
  "Asie",
  "Europe",
  "Safari",
  "Îles",
  "Culture",
  "Aventure",
  "Gastronomie",
  "Historique",
  "Nature",
]

// Fonction pour obtenir des termes de recherche populaires
export function getPopularSearchTerms(): string[] {
  return popularSearchTerms
}
