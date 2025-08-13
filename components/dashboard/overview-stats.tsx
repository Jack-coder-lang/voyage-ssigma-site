import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarRange, MapPin, CreditCard, TrendingUp } from "lucide-react"

export function OverviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Voyages à venir</CardTitle>
          <CalendarRange className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+1 depuis le mois dernier</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pays visités</CardTitle>
          <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+2 depuis l'année dernière</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dépenses annuelles</CardTitle>
          <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5 280 €</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+12% depuis l'année dernière</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Points de fidélité</CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2 450</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+520 depuis le dernier voyage</p>
        </CardContent>
      </Card>
    </div>
  )
}
