"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { getAllRegions } from "@/lib/destinations"

interface AdvancedFiltersProps {
  minPrice?: number
  maxPrice?: number
  selectedRegions?: string[]
  minRating?: number
  onlyDeals?: boolean
  className?: string
}

export function AdvancedFilters({
  minPrice = 0,
  maxPrice = 3000,
  selectedRegions = [],
  minRating = 0,
  onlyDeals = false,
  className,
}: AdvancedFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number.parseInt(searchParams.get("minPrice") || minPrice.toString()),
    Number.parseInt(searchParams.get("maxPrice") || maxPrice.toString()),
  ])
  const [regions, setRegions] = useState<string[]>(searchParams.get("regions")?.split(",") || selectedRegions)
  const [rating, setRating] = useState<number>(Number.parseInt(searchParams.get("rating") || minRating.toString()))
  const [deals, setDeals] = useState<boolean>(searchParams.get("deals") === "true" || onlyDeals)

  const allRegions = getAllRegions()

  const toggleRegion = (region: string) => {
    if (regions.includes(region)) {
      setRegions(regions.filter((r) => r !== region))
    } else {
      setRegions([...regions, region])
    }
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Prix
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    // Régions
    if (regions.length > 0) {
      params.set("regions", regions.join(","))
    } else {
      params.delete("regions")
    }

    // Note minimale
    if (rating > 0) {
      params.set("rating", rating.toString())
    } else {
      params.delete("rating")
    }

    // Promotions uniquement
    if (deals) {
      params.set("deals", "true")
    } else {
      params.delete("deals")
    }

    router.push(`/search?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([minPrice, maxPrice])
    setRegions([])
    setRating(0)
    setDeals(false)

    const query = searchParams.get("q") || ""
    if (query) {
      router.push(`/search?q=${query}`)
    } else {
      router.push("/search")
    }
  }

  const activeFiltersCount =
    (priceRange[0] > minPrice || priceRange[1] < maxPrice ? 1 : 0) +
    (regions.length > 0 ? 1 : 0) +
    (rating > 0 ? 1 : 0) +
    (deals ? 1 : 0)

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtres avancés
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
          {isOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
        </Button>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm">
            <X className="h-3 w-3 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="p-4 mb-6 grid gap-6">
          <div>
            <h3 className="font-medium mb-3">Prix (€)</h3>
            <div className="px-2">
              <Slider
                defaultValue={priceRange}
                min={minPrice}
                max={maxPrice}
                step={50}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mb-6"
              />
              <div className="flex items-center justify-between text-sm">
                <span>{priceRange[0]} €</span>
                <span>{priceRange[1]} €</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Régions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {allRegions.map((region) => (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox
                    id={`region-${region}`}
                    checked={regions.includes(region)}
                    onCheckedChange={() => toggleRegion(region)}
                  />
                  <label htmlFor={`region-${region}`} className="text-sm cursor-pointer">
                    {region}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Note minimale</h3>
            <div className="flex items-center space-x-2">
              {[0, 3, 3.5, 4, 4.5].map((value) => (
                <Button
                  key={value}
                  variant={rating === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRating(value)}
                  className="min-w-[40px]"
                >
                  {value > 0 ? `${value}+` : "Tous"}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <Checkbox id="deals-only" checked={deals} onCheckedChange={(checked) => setDeals(checked as boolean)} />
              <label htmlFor="deals-only" className="font-medium cursor-pointer">
                Promotions uniquement
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={resetFilters}>
              Réinitialiser
            </Button>
            <Button onClick={applyFilters}>Appliquer les filtres</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
