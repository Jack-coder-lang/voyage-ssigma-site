import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TravelMapProps {
  className?: string
}

export function TravelMap({ className }: TravelMapProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Carte de vos voyages</CardTitle>
            <CardDescription>Vous avez visité 12 pays sur 195.</CardDescription>
          </div>
          <Badge variant="outline">6% du monde</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 relative">
          {/* Ici, on utiliserait normalement une vraie carte interactive */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Carte interactive des voyages</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Pays visités: France, Italie, Espagne, Royaume-Uni, Grèce, Allemagne, États-Unis, Canada, Japon,
                Thaïlande, Maroc, Égypte
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
