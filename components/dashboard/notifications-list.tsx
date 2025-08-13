"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Trash2, Settings, Info, AlertTriangle } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  date: string
  read: boolean
}

export function NotificationsList() {
  // Données simulées pour les notifications
  const initialNotifications: Notification[] = [
    {
      id: "1",
      title: "Nouvelle réservation confirmée",
      message: "Votre réservation pour Paris du 15 au 22 juin a été confirmée.",
      type: "success",
      date: "Aujourd'hui, 10:24",
      read: false,
    },
    {
      id: "2",
      title: "Rappel de voyage",
      message: "Votre voyage à Paris commence dans 3 jours. N'oubliez pas de préparer vos documents.",
      type: "info",
      date: "Hier, 15:30",
      read: false,
    },
    {
      id: "3",
      title: "Problème de paiement",
      message:
        "Nous avons rencontré un problème avec votre dernier paiement. Veuillez vérifier vos informations bancaires.",
      type: "error",
      date: "23 avril, 09:15",
      read: true,
    },
    {
      id: "4",
      title: "Offre spéciale",
      message: "-15% sur les séjours à Rome cet été. Offre valable jusqu'au 30 mai.",
      type: "info",
      date: "20 avril, 14:45",
      read: true,
    },
    {
      id: "5",
      title: "Modification d'itinéraire",
      message: "En raison de conditions météorologiques, votre vol AF1234 a été retardé de 2 heures.",
      type: "warning",
      date: "15 avril, 08:30",
      read: true,
    },
  ]

  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "success":
        return <Check className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Gérez vos notifications et alertes</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="mr-2 h-4 w-4" />
            Tout marquer comme lu
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Paramètres de notification</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              Toutes
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Non lues</TabsTrigger>
            <TabsTrigger value="info">Infos</TabsTrigger>
            <TabsTrigger value="warning">Alertes</TabsTrigger>
            <TabsTrigger value="error">Erreurs</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-4">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
                <h3 className="mb-2 text-lg font-medium">Aucune notification</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Vous n'avez pas de notifications {activeTab !== "all" ? "dans cette catégorie" : ""} pour le moment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <AnimatedSection key={notification.id} direction="right">
                    <div
                      className={`relative rounded-lg border p-4 ${
                        !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{notification.date}</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 px-2 text-xs"
                          >
                            <Check className="mr-1 h-3 w-3" />
                            Marquer comme lu
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 px-2 text-xs text-red-500 hover:text-red-600 dark:text-red-400"
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Supprimer
                        </Button>
                      </div>
                      {!notification.read && (
                        <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
