"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ActiveFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const regions = searchParams.get("regions")?.split(",") || []
  const rating = searchParams.get("rating")
  const deals = searchParams.get("deals") === "true"

  const hasActiveFilters = minPrice || maxPrice || regions.length > 0 || rating || deals

  if (!hasActiveFilters) return null

  const removeFilter = (type: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString())

    switch (type) {
      case "price":
        params.delete("minPrice")
        params.delete("maxPrice")
        break
      case "region":
        if (value && regions.length > 1) {
          const newRegions = regions.filter((r) => r !== value)
          params.set("regions", newRegions.join(","))
        } else {
          params.delete("regions")
        }
        break
      case "rating":
        params.delete("rating")
        break
      case "deals":
        params.delete("deals")
        break
    }

    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {(minPrice || maxPrice) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Prix: {minPrice || 0}€ - {maxPrice || "max"}€
          <button
            onClick={() => removeFilter("price")}
            className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Supprimer le filtre de prix</span>
          </button>
        </Badge>
      )}

      {regions.map((region) => (
        <Badge key={region} variant="secondary" className="flex items-center gap-1">
          {region}
          <button
            onClick={() => removeFilter("region", region)}
            className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Supprimer le filtre de région</span>
          </button>
        </Badge>
      ))}

      {rating && (
        <Badge variant="secondary" className="flex items-center gap-1">
          {rating}+ étoiles
          <button
            onClick={() => removeFilter("rating")}
            className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Supprimer le filtre de note</span>
          </button>
        </Badge>
      )}

      {deals && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Promotions
          <button
            onClick={() => removeFilter("deals")}
            className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Supprimer le filtre de promotions</span>
          </button>
        </Badge>
      )}
    </div>
  )
}
