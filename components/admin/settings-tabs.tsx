"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GeneralSettingsForm } from "@/components/admin/general-settings-form"
import { DatabaseSettingsForm } from "@/components/admin/database-settings-form"
import { ApiSettingsForm } from "@/components/admin/api-settings-form"
import { EmailSettingsForm } from "@/components/admin/email-settings-form"
import { SecuritySettingsForm } from "@/components/admin/security-settings-form"
import { LocalizationSettingsForm } from "@/components/admin/localization-settings-form"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="general">Général</TabsTrigger>
        <TabsTrigger value="database">Base de données</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="security">Sécurité</TabsTrigger>
        <TabsTrigger value="localization">Localisation</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres généraux</CardTitle>
            <CardDescription>Configuration générale de votre site de voyage</CardDescription>
          </CardHeader>
          <CardContent>
            <GeneralSettingsForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="database" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration de la base de données</CardTitle>
            <CardDescription>Gérez la connexion à votre base de données MongoDB</CardDescription>
          </CardHeader>
          <CardContent>
            <DatabaseSettingsForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="api" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres API</CardTitle>
            <CardDescription>Configuration des clés API et des services externes</CardDescription>
          </CardHeader>
          <CardContent>
            <ApiSettingsForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="email" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration email</CardTitle>
            <CardDescription>Paramètres pour l'envoi d'emails et notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <EmailSettingsForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres de sécurité</CardTitle>
            <CardDescription>Configuration de la sécurité et de l'authentification</CardDescription>
          </CardHeader>
          <CardContent>
            <SecuritySettingsForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="localization" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Localisation</CardTitle>
            <CardDescription>Paramètres de langue, devise et région</CardDescription>
          </CardHeader>
          <CardContent>
            <LocalizationSettingsForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
