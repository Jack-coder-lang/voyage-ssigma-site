"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, BarChart, PieChart } from "@/components/dashboard/charts"
import { Users, Globe, MousePointer, Clock } from "lucide-react"

export function AnalyticsOverview() {
  const [period, setPeriod] = useState("7d")

  // Données simulées pour les statistiques
  const stats = {
    "7d": {
      visitors: 1254,
      pageViews: 4872,
      bounceRate: "42%",
      avgSessionTime: "3m 24s",
      countries: [
        { name: "Côte d'Ivoire", value: 35 },
        { name: "France", value: 25 },
        { name: "Sénégal", value: 15 },
        { name: "Cameroun", value: 10 },
        { name: "Autres", value: 15 },
      ],
      devices: [
        { name: "Mobile", value: 65 },
        { name: "Desktop", value: 30 },
        { name: "Tablet", value: 5 },
      ],
      dailyVisitors: [
        { date: "Lun", value: 145 },
        { date: "Mar", value: 156 },
        { date: "Mer", value: 183 },
        { date: "Jeu", value: 192 },
        { date: "Ven", value: 210 },
        { date: "Sam", value: 215 },
        { date: "Dim", value: 153 },
      ],
      topPages: [
        { page: "/", views: 1245 },
        { page: "/destinations", views: 876 },
        { page: "/reservation", views: 654 },
        { page: "/destinations/paris", views: 432 },
        { page: "/destinations/bali", views: 321 },
      ],
    },
    "30d": {
      visitors: 5432,
      pageViews: 18765,
      bounceRate: "38%",
      avgSessionTime: "3m 52s",
      countries: [
        { name: "Côte d'Ivoire", value: 32 },
        { name: "France", value: 28 },
        { name: "Sénégal", value: 14 },
        { name: "Cameroun", value: 12 },
        { name: "Autres", value: 14 },
      ],
      devices: [
        { name: "Mobile", value: 68 },
        { name: "Desktop", value: 27 },
        { name: "Tablet", value: 5 },
      ],
      dailyVisitors: [
        { date: "Sem 1", value: 1045 },
        { date: "Sem 2", value: 1156 },
        { date: "Sem 3", value: 1283 },
        { date: "Sem 4", value: 1392 },
        { date: "Sem 5", value: 556 },
      ],
      topPages: [
        { page: "/", views: 4532 },
        { page: "/destinations", views: 3245 },
        { page: "/reservation", views: 2876 },
        { page: "/destinations/paris", views: 1654 },
        { page: "/destinations/bali", views: 1432 },
      ],
    },
    "90d": {
      visitors: 15876,
      pageViews: 54321,
      bounceRate: "35%",
      avgSessionTime: "4m 12s",
      countries: [
        { name: "Côte d'Ivoire", value: 30 },
        { name: "France", value: 25 },
        { name: "Sénégal", value: 15 },
        { name: "Cameroun", value: 15 },
        { name: "Autres", value: 15 },
      ],
      devices: [
        { name: "Mobile", value: 70 },
        { name: "Desktop", value: 25 },
        { name: "Tablet", value: 5 },
      ],
      dailyVisitors: [
        { date: "Mois 1", value: 5245 },
        { date: "Mois 2", value: 5356 },
        { date: "Mois 3", value: 5275 },
      ],
      topPages: [
        { page: "/", views: 12543 },
        { page: "/destinations", views: 9876 },
        { page: "/reservation", views: 7654 },
        { page: "/destinations/paris", views: 5432 },
        { page: "/destinations/bali", views: 4321 },
      ],
    },
  }

  const currentStats = stats[period as keyof typeof stats]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Statistiques du site</h2>
        <Tabs value={period} onValueChange={setPeriod} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="7d">7 jours</TabsTrigger>
            <TabsTrigger value="30d">30 jours</TabsTrigger>
            <TabsTrigger value="90d">90 jours</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visiteurs uniques</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.visitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 10) + 5}% depuis la période précédente
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pages vues</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 10) + 3}% depuis la période précédente
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de rebond</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.bounceRate}</div>
            <p className="text-xs text-muted-foreground">
              -{Math.floor(Math.random() * 5) + 1}% depuis la période précédente
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Durée moyenne de session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.avgSessionTime}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 20) + 5}s depuis la période précédente
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Visiteurs par jour</CardTitle>
            <CardDescription>Nombre de visiteurs uniques par jour</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={currentStats.dailyVisitors} />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Répartition par pays</CardTitle>
            <CardDescription>Origine des visiteurs</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={currentStats.countries} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Appareils utilisés</CardTitle>
            <CardDescription>Répartition des visiteurs par type d'appareil</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={currentStats.devices} />
          </CardContent>
        </Card>
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Pages les plus visitées</CardTitle>
            <CardDescription>Nombre de vues par page</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={currentStats.topPages.map((item) => ({
                name: item.page,
                value: item.views,
              }))}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
