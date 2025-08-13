"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RevenueChartProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RevenueChart({ className, ...props }: RevenueChartProps) {
  // Données fictives pour le graphique de revenus
  const monthlyData = [
    { name: "Jan", revenue: 18000 },
    { name: "Fév", revenue: 22000 },
    { name: "Mar", revenue: 32000 },
    { name: "Avr", revenue: 28000 },
    { name: "Mai", revenue: 35000 },
    { name: "Juin", revenue: 42000 },
    { name: "Juil", revenue: 55000 },
    { name: "Août", revenue: 60000 },
    { name: "Sep", revenue: 48000 },
    { name: "Oct", revenue: 38000 },
    { name: "Nov", revenue: 42000 },
    { name: "Déc", revenue: 50000 },
  ]

  const weeklyData = [
    { name: "Lun", revenue: 8500 },
    { name: "Mar", revenue: 7200 },
    { name: "Mer", revenue: 9100 },
    { name: "Jeu", revenue: 10500 },
    { name: "Ven", revenue: 12800 },
    { name: "Sam", revenue: 14200 },
    { name: "Dim", revenue: 11500 },
  ]

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Revenus</CardTitle>
        <CardDescription>Aperçu des revenus générés par les réservations.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="mb-4">
            <TabsTrigger value="monthly">Mensuel</TabsTrigger>
            <TabsTrigger value="weekly">Hebdomadaire</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value}`, "Revenus"]} labelFormatter={(label) => `Mois: ${label}`} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="weekly">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value}`, "Revenus"]} labelFormatter={(label) => `Jour: ${label}`} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
