"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [userName, setUserName] = useState("Admin User")
  const [userEmail, setUserEmail] = useState("admin@example.com")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [language, setLanguage] = useState("fr")
  const [dataSharing, setDataSharing] = useState(false)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profil mis à jour :", { userName, userEmail })
  }

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Mot de passe mis à jour :", { currentPassword, newPassword })
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark", !darkMode)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <SiteHeader />
      <div className="flex-1">
        <DashboardHeader title="Paramètres" />
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] px-4 md:px-6 py-6">
          <aside className="hidden md:block">
            <DashboardNav />
          </aside>
          <main className="flex flex-col gap-6">
            {/* Section Profil */}
            <Card>
              <CardHeader>
                <CardTitle>Profil</CardTitle>
                <CardDescription>
                  Mettez à jour vos informations personnelles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Votre email"
                    />
                  </div>
                  <Button type="submit">Sauvegarder</Button>
                </form>
              </CardContent>
            </Card>

            {/* Section Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Gérer vos préférences de notification.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Notifications par email</Label>
                    <p className="text-sm text-gray-500">Recevoir des notifications par email.</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Notifications push</Label>
                    <p className="text-sm text-gray-500">Recevoir des notifications push sur votre appareil.</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section Thème */}
            <Card>
              <CardHeader>
                <CardTitle>Thème</CardTitle>
                <CardDescription>
                  Personnalisez l'apparence de l'application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode">Mode sombre</Label>
                    <p className="text-sm text-gray-500">Basculer entre le mode clair et sombre.</p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section Sécurité */}
            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>
                  Gérer les paramètres de sécurité de votre compte.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSavePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Mot de passe actuel"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Nouveau mot de passe"
                    />
                  </div>
                  <Button type="submit">Changer le mot de passe</Button>
                </form>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor-auth">Authentification à deux facteurs</Label>
                    <p className="text-sm text-gray-500">Activez une sécurité supplémentaire.</p>
                  </div>
                  <Switch
                    id="two-factor-auth"
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section Langue */}
            <Card>
              <CardHeader>
                <CardTitle>Langue</CardTitle>
                <CardDescription>
                  Choisissez la langue de l'interface.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">Anglais</SelectItem>
                      <SelectItem value="es">Espagnol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Section Confidentialité */}
            <Card>
              <CardHeader>
                <CardTitle>Confidentialité</CardTitle>
                <CardDescription>
                  Gérer vos préférences de confidentialité.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-sharing">Partage de données</Label>
                    <p className="text-sm text-gray-500">Autoriser le partage de données anonymisées.</p>
                  </div>
                  <Switch
                    id="data-sharing"
                    checked={dataSharing}
                    onCheckedChange={setDataSharing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section Support */}
            <Card>
              <CardHeader>
                <CardTitle>Support</CardTitle>
                <CardDescription>
                  Obtenez de l'aide ou consultez les FAQ.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild>
                  <a href="mailto:support@voyageexplore.com">Contacter le support</a>
                </Button>
                <Button asChild>
                  <a href="/faq" target="_blank" rel="noopener noreferrer">Voir les FAQ</a>
                </Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}