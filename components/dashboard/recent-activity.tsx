import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Calendar, MapPin, Bell } from "lucide-react"

interface RecentActivityProps {
  className?: string
}

export function RecentActivity({ className }: RecentActivityProps) {
  const activities = [
    {
      id: 1,
      type: "payment",
      title: "Paiement effectué",
      description: "Réservation Paris - Acompte de 450 €",
      date: "Aujourd'hui, 10:24",
      icon: CreditCard,
    },
    {
      id: 2,
      type: "reminder",
      title: "Rappel de voyage",
      description: "Votre voyage à Paris commence dans 42 jours",
      date: "Hier, 15:30",
      icon: Calendar,
    },
    {
      id: 3,
      type: "recommendation",
      title: "Nouvelle recommandation",
      description: "Découvrez Bali, basé sur vos préférences",
      date: "23 avril, 09:15",
      icon: MapPin,
    },
    {
      id: 4,
      type: "promotion",
      title: "Offre spéciale",
      description: "-15% sur les séjours à Rome cet été",
      date: "20 avril, 14:45",
      icon: Bell,
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
        <CardDescription>Vos dernières interactions et notifications.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <activity.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
