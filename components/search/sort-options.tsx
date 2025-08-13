"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ArrowUpDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SortOptions() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select defaultValue={searchParams.get("sort") || "recommended"} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recommended">Recommandés</SelectItem>
          <SelectItem value="price_asc">Prix croissant</SelectItem>
          <SelectItem value="price_desc">Prix décroissant</SelectItem>
          <SelectItem value="rating_desc">Meilleures notes</SelectItem>
          <SelectItem value="popularity">Popularité</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
