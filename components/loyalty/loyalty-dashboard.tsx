"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Award,
  Gift,
  TrendingUp,
  Clock,
  ChevronRight,
  Percent,
  Luggage,
  Coffee,
  Plane,
  Hotel,
  Shield,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useAuth } from "@/components/auth-provider"
import { LoyaltyLevelBadge } from "@/components/loyalty/loyalty-level-badge"
import { PointsHistoryTable } from "@/components/loyalty/points-history-table"
import { RewardCard } from "@/components/loyalty/reward-card"

export function LoyaltyDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Données simulées pour le système de fidélité
  const loyaltyData = {
    points: 2450,
    level: "silver",
    nextLevel: "gold",
    pointsToNextLevel: 1550,
    totalPointsForNextLevel: 4000,
    memberSince: "15/03/2023",
    pointsExpiring: 450,
    expiryDate: "31/12/2023",
    recentTransactions: [
      { id: "TX123456", date: "12/05/2023", description: "Réservation Paris", points: 1200, type: "earned" },
      { id: "TX123457", date: "01/06/2023", description: "Bonus anniversaire", points: 500, type: "earned" },
      { id: "TX123458", date: "15/07/2023", description: "Réservation Marrakech", points: 850, type: "earned" },
      { id: "TX123459", date: "20/08/2023", description: "Échange - Surclassement", points: 600, type: "redeemed" },
      { id: "TX123460", date: "05/09/2023", description: "Partage sur réseaux sociaux", points: 100, type: "earned" },
      { id: "TX123461", date: "10/10/2023", description: "Échange - Réduction 50€", points: 1000, type: "redeemed" },
      { id: "TX123462", date: "01/11/2023", description: "Bonus parrainage", points: 1000, type: "earned" },
      { id: "TX123463", date: "15/11/2023", description: "Réservation Bali", points: 1400, type: "earned" },
    ],
    availableRewards: [
      {
        id: "RW001",
        title: "Réduction de 50€",
        description: "Obtenez une réduction de 50€ sur votre prochaine réservation",
        points: 1000,
        icon: <Percent className="h-6 w-6" />,
        category: "discount",
        popular: true,
      },
      {
        id: "RW002",
        title: "Surclassement chambre",
        description: "Surclassement gratuit pour votre chambre d'hôtel",
        points: 1500,
        icon: <Hotel className="h-6 w-6" />,
        category: "upgrade",
      },
      {
        id: "RW003",
        title: "Bagage supplémentaire",
        description: "Un bagage en soute supplémentaire gratuit",
        points: 800,
        icon: <Luggage className="h-6 w-6" />,
        category: "travel",
      },
      {
        id: "RW004",
        title: "Accès salon VIP",
        description: "Accès au salon VIP à l'aéroport",
        points: 1200,
        icon: <Coffee className="h-6 w-6" />,
        category: "experience",
        popular: true,
      },
      {
        id: "RW005",
        title: "Fast Track",
        description: "Passage prioritaire aux contrôles de sécurité",
        points: 600,
        icon: <Plane className="h-6 w-6" />,
        category: "travel",
      },
      {
        id: "RW006",
        title: "Assurance annulation",
        description: "Assurance annulation gratuite pour votre prochain voyage",
        points: 2000,
        icon: <Shield className="h-6 w-6" />,
        category: "insurance",
      },
    ],
    levelBenefits: {
      bronze: [
        "Accumulation de points sur chaque réservation",
        "Accès aux offres exclusives membres",
        "Newsletter VIP",
      ],
      silver: [
        "Tous les avantages Bronze",
        "10% de points supplémentaires sur les réservations",
        "Priorité service client",
        "Cadeau d'anniversaire",
      ],
      gold: [
        "Tous les avantages Silver",
        "20% de points supplémentaires sur les réservations",
        "Surclassement selon disponibilité",
        "Check-in prioritaire",
        "Concierge dédié",
      ],
      platinum: [
        "Tous les avantages Gold",
        "30% de points supplémentaires sur les réservations",
        "Garantie de disponibilité",
        "Transferts aéroport gratuits",
        "Expériences exclusives",
      ],
    },
  }

  // Calcul du pourcentage de progression vers le niveau suivant
  const progressPercentage = Math.round(
    ((loyaltyData.points - (loyaltyData.totalPointsForNextLevel - loyaltyData.pointsToNextLevel)) /
      loyaltyData.totalPointsForNextLevel) *
      100,
  )

  return (
    <AnimatedSection>
      <div className="space-y-6">
        {/* En-tête du programme de fidélité */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Programme de Fidélité</h1>
            <p className="text-muted-foreground">Gagnez des points et profitez d'avantages exclusifs à chaque voyage</p>
          </div>
          <Button asChild>
            <Link href="/loyalty/how-it-works">Comment ça marche</Link>
          </Button>
        </div>

        {/* Onglets du tableau de bord de fidélité */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="rewards">Récompenses</TabsTrigger>
            <TabsTrigger value="benefits">Avantages</TabsTrigger>
          </TabsList>

          {/* Contenu de l'onglet Aperçu */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Carte de statut */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Statut de fidélité</span>
                    <LoyaltyLevelBadge level={loyaltyData.level} />
                  </CardTitle>
                  <CardDescription>Membre depuis {loyaltyData.memberSince}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>
                        Progression vers{" "}
                        {loyaltyData.nextLevel.charAt(0).toUpperCase() + loyaltyData.nextLevel.slice(1)}
                      </span>
                      <span>
                        {loyaltyData.points} / {loyaltyData.totalPointsForNextLevel} points
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Il vous manque{" "}
                    <span className="font-medium text-primary">{loyaltyData.pointsToNextLevel} points</span> pour
                    atteindre le niveau {loyaltyData.nextLevel.charAt(0).toUpperCase() + loyaltyData.nextLevel.slice(1)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/loyalty/levels">
                      Voir tous les niveaux
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Carte de points */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Vos points</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{loyaltyData.points}</div>
                      <div className="text-sm text-muted-foreground">points disponibles</div>
                    </div>
                  </div>
                  {loyaltyData.pointsExpiring > 0 && (
                    <div className="flex items-center justify-between text-sm bg-amber-50 dark:bg-amber-950 p-3 rounded-md">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2" />
                        <span>{loyaltyData.pointsExpiring} points expirent</span>
                      </div>
                      <span className="text-amber-600 dark:text-amber-400">{loyaltyData.expiryDate}</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#" onClick={() => setActiveTab("rewards")}>
                      Échanger des points
                      <Gift className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Activité récente */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Activité récente</CardTitle>
                <CardDescription>Vos dernières transactions de points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loyaltyData.recentTransactions.slice(0, 4).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "earned"
                              ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                              : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                          }`}
                        >
                          {transaction.type === "earned" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <Gift className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div
                        className={`font-medium ${
                          transaction.type === "earned"
                            ? "text-green-600 dark:text-green-400"
                            : "text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {transaction.type === "earned" ? "+" : "-"}
                        {transaction.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#" onClick={() => setActiveTab("history")}>
                    Voir tout l'historique
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Récompenses populaires */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Récompenses populaires</CardTitle>
                <CardDescription>Échangez vos points contre ces récompenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {loyaltyData.availableRewards
                    .filter((reward) => reward.popular)
                    .map((reward) => (
                      <div key={reward.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="p-2 bg-primary/10 rounded-full text-primary">{reward.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{reward.title}</h4>
                          <p className="text-sm text-muted-foreground">{reward.points} points</p>
                        </div>
                        <Button size="sm" disabled={loyaltyData.points < reward.points}>
                          Échanger
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#" onClick={() => setActiveTab("rewards")}>
                    Voir toutes les récompenses
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Contenu de l'onglet Historique */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique des points</CardTitle>
                <CardDescription>Toutes vos transactions de points</CardDescription>
              </CardHeader>
              <CardContent>
                <PointsHistoryTable transactions={loyaltyData.recentTransactions} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenu de l'onglet Récompenses */}
          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Vos points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">{loyaltyData.points}</p>
                    <p className="text-sm text-muted-foreground">points disponibles</p>
                  </div>
                  {loyaltyData.pointsExpiring > 0 && (
                    <div className="flex items-center text-sm bg-amber-50 dark:bg-amber-950 p-3 rounded-md">
                      <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2" />
                      <span>
                        {loyaltyData.pointsExpiring} points expirent le {loyaltyData.expiryDate}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loyaltyData.availableRewards.map((reward) => (
                <RewardCard key={reward.id} reward={reward} userPoints={loyaltyData.points} />
              ))}
            </div>
          </TabsContent>

          {/* Contenu de l'onglet Avantages */}
          <TabsContent value="benefits">
            <Card>
              <CardHeader>
                <CardTitle>Avantages par niveau</CardTitle>
                <CardDescription>Découvrez les avantages de chaque niveau de fidélité</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Niveau Bronze */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-amber-700" />
                      <h3 className="text-lg font-medium">Bronze</h3>
                      <Badge variant={loyaltyData.level === "bronze" ? "default" : "outline"}>
                        {loyaltyData.level === "bronze" ? "Votre niveau actuel" : "0 - 1999 points"}
                      </Badge>
                    </div>
                    <ul className="ml-7 space-y-1 text-sm">
                      {loyaltyData.levelBenefits.bronze.map((benefit, index) => (
                        <li key={index} className="list-disc">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Niveau Silver */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-gray-400" />
                      <h3 className="text-lg font-medium">Silver</h3>
                      <Badge variant={loyaltyData.level === "silver" ? "default" : "outline"}>
                        {loyaltyData.level === "silver" ? "Votre niveau actuel" : "2000 - 3999 points"}
                      </Badge>
                    </div>
                    <ul className="ml-7 space-y-1 text-sm">
                      {loyaltyData.levelBenefits.silver.map((benefit, index) => (
                        <li key={index} className="list-disc">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Niveau Gold */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <h3 className="text-lg font-medium">Gold</h3>
                      <Badge variant={loyaltyData.level === "gold" ? "default" : "outline"}>
                        {loyaltyData.level === "gold" ? "Votre niveau actuel" : "4000 - 7999 points"}
                      </Badge>
                    </div>
                    <ul className="ml-7 space-y-1 text-sm">
                      {loyaltyData.levelBenefits.gold.map((benefit, index) => (
                        <li key={index} className="list-disc">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Niveau Platinum */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-purple-500" />
                      <h3 className="text-lg font-medium">Platinum</h3>
                      <Badge variant={loyaltyData.level === "platinum" ? "default" : "outline"}>
                        {loyaltyData.level === "platinum" ? "Votre niveau actuel" : "8000+ points"}
                      </Badge>
                    </div>
                    <ul className="ml-7 space-y-1 text-sm">
                      {loyaltyData.levelBenefits.platinum.map((benefit, index) => (
                        <li key={index} className="list-disc">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedSection>
  )
}
