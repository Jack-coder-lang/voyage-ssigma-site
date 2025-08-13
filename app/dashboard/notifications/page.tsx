import { SiteHeader } from "@/components/site-header"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { NotificationsList } from "@/components/dashboard/notifications-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function NotificationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <SiteHeader />
      <div className="flex-1">
        <DashboardHeader />
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] px-4 md:px-6 py-6">
          <aside className="hidden md:block">
            <DashboardNav />
          </aside>
          <main className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <div className="grid gap-6 md:grid-cols-2">
              <NotificationsList />
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres de notification</CardTitle>
                    <CardDescription>Configurez vos préférences de notification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Notifications par email</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez des notifications par email pour les mises à jour importantes
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">Notifications par SMS</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez des notifications par SMS pour les alertes urgentes
                        </p>
                      </div>
                      <Switch id="sms-notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Notifications push</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez des notifications push sur votre appareil
                        </p>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Types de notification</CardTitle>
                    <CardDescription>Choisissez les types de notification que vous souhaitez recevoir</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="booking-notifications">Réservations</Label>
                        <p className="text-sm text-muted-foreground">
                          Confirmations, modifications et annulations de réservation
                        </p>
                      </div>
                      <Switch id="booking-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="payment-notifications">Paiements</Label>
                        <p className="text-sm text-muted-foreground">
                          Confirmations de paiement et problèmes de facturation
                        </p>
                      </div>
                      <Switch id="payment-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="promo-notifications">Promotions</Label>
                        <p className="text-sm text-muted-foreground">Offres spéciales, réductions et nouveautés</p>
                      </div>
                      <Switch id="promo-notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="travel-notifications">Alertes de voyage</Label>
                        <p className="text-sm text-muted-foreground">
                          Retards, annulations et modifications d'itinéraire
                        </p>
                      </div>
                      <Switch id="travel-notifications" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
