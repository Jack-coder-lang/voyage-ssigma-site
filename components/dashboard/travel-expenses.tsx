import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TravelExpensesProps {
  className?: string
}

export function TravelExpenses({ className }: TravelExpensesProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Dépenses de voyage</CardTitle>
        <CardDescription>Analyse de vos dépenses de voyage par catégorie.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="year">
          <TabsList className="mb-4">
            <TabsTrigger value="month">Mois</TabsTrigger>
            <TabsTrigger value="quarter">Trimestre</TabsTrigger>
            <TabsTrigger value="year">Année</TabsTrigger>
          </TabsList>
          <TabsContent value="month" className="space-y-4">
            <div className="h-[200px] w-full rounded-lg bg-gray-100 dark:bg-gray-800 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Graphique des dépenses mensuelles</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Total: 850 €</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Transport</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-blue-600 dark:bg-blue-400" style={{ width: "45%" }} />
                  </div>
                  <span className="text-xs font-medium">45%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Hébergement</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-green-600 dark:bg-green-400" style={{ width: "30%" }} />
                  </div>
                  <span className="text-xs font-medium">30%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Nourriture</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-yellow-600 dark:bg-yellow-400" style={{ width: "15%" }} />
                  </div>
                  <span className="text-xs font-medium">15%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Activités</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-purple-600 dark:bg-purple-400" style={{ width: "10%" }} />
                  </div>
                  <span className="text-xs font-medium">10%</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="quarter" className="space-y-4">
            <div className="h-[200px] w-full rounded-lg bg-gray-100 dark:bg-gray-800 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Graphique des dépenses trimestrielles</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Total: 2 450 €</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Transport</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-blue-600 dark:bg-blue-400" style={{ width: "40%" }} />
                  </div>
                  <span className="text-xs font-medium">40%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Hébergement</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-green-600 dark:bg-green-400" style={{ width: "35%" }} />
                  </div>
                  <span className="text-xs font-medium">35%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Nourriture</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-yellow-600 dark:bg-yellow-400" style={{ width: "15%" }} />
                  </div>
                  <span className="text-xs font-medium">15%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Activités</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-purple-600 dark:bg-purple-400" style={{ width: "10%" }} />
                  </div>
                  <span className="text-xs font-medium">10%</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="year" className="space-y-4">
            <div className="h-[200px] w-full rounded-lg bg-gray-100 dark:bg-gray-800 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Graphique des dépenses annuelles</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Total: 5 280 €</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Transport</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-blue-600 dark:bg-blue-400" style={{ width: "42%" }} />
                  </div>
                  <span className="text-xs font-medium">42%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Hébergement</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-green-600 dark:bg-green-400" style={{ width: "33%" }} />
                  </div>
                  <span className="text-xs font-medium">33%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Nourriture</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-yellow-600 dark:bg-yellow-400" style={{ width: "15%" }} />
                  </div>
                  <span className="text-xs font-medium">15%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Activités</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-purple-600 dark:bg-purple-400" style={{ width: "10%" }} />
                  </div>
                  <span className="text-xs font-medium">10%</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
