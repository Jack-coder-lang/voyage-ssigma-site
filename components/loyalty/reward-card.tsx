"use client"

import { useState } from "react"
import { Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ReactNode } from "react"

interface Reward {
  id: string
  title: string
  description: string
  points: number
  icon: ReactNode
  category: string
  popular?: boolean
}

interface RewardCardProps {
  reward: Reward
  userPoints: number
}

export function RewardCard({ reward, userPoints }: RewardCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [isRedeemed, setIsRedeemed] = useState(false)

  const canRedeem = userPoints >= reward.points

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "discount":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
      case "upgrade":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
      case "travel":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
      case "experience":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
      case "insurance":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "discount":
        return "Réduction"
      case "upgrade":
        return "Surclassement"
      case "travel":
        return "Voyage"
      case "experience":
        return "Expérience"
      case "insurance":
        return "Assurance"
      default:
        return category
    }
  }

  const handleRedeem = () => {
    setIsRedeeming(true)
    // Simuler une requête API
    setTimeout(() => {
      setIsRedeeming(false)
      setIsRedeemed(true)
      // Fermer la boîte de dialogue après 1.5 secondes
      setTimeout(() => {
        setIsDialogOpen(false)
      }, 1500)
    }, 1500)
  }

  return (
    <Card className={reward.popular ? "border-primary" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-primary/10 rounded-full text-primary">{reward.icon}</div>
          <Badge className={getCategoryColor(reward.category)}>{getCategoryName(reward.category)}</Badge>
        </div>
        <CardTitle className="text-lg mt-2">{reward.title}</CardTitle>
        <CardDescription>{reward.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Gift className="h-4 w-4 text-primary mr-1" />
            <span className="font-medium">{reward.points} points</span>
          </div>
          {reward.popular && (
            <Badge variant="outline" className="text-xs">
              Populaire
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" disabled={!canRedeem}>
              {canRedeem ? "Échanger" : `Il vous manque ${reward.points - userPoints} points`}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Échanger vos points</DialogTitle>
              <DialogDescription>
                Vous êtes sur le point d'échanger {reward.points} points contre {reward.title.toLowerCase()}.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-4 py-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">{reward.icon}</div>
              <div>
                <h4 className="font-medium">{reward.title}</h4>
                <p className="text-sm text-muted-foreground">{reward.description}</p>
              </div>
            </div>
            <DialogFooter>
              {isRedeemed ? (
                <div className="w-full text-center text-green-600 dark:text-green-400 font-medium">
                  Échange réussi ! Votre récompense a été ajoutée à votre compte.
                </div>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isRedeeming}>
                    Annuler
                  </Button>
                  <Button onClick={handleRedeem} disabled={isRedeeming}>
                    {isRedeeming ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Traitement...
                      </div>
                    ) : (
                      `Confirmer l'échange de ${reward.points} points`
                    )}
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
