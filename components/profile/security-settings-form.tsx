"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Le mot de passe actuel doit contenir au moins 8 caractères.",
    }),
    newPassword: z.string().min(8, {
      message: "Le nouveau mot de passe doit contenir au moins 8 caractères.",
    }),
    confirmPassword: z.string().min(8, {
      message: "La confirmation du mot de passe doit contenir au moins 8 caractères.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  })

type PasswordValues = z.infer<typeof passwordSchema>

export function SecuritySettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionManagementExpanded, setSessionManagementExpanded] = useState(false)

  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: PasswordValues) {
    setIsSubmitting(true)

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Réinitialiser le formulaire
      form.reset()

      // Afficher un toast de succès
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été mis à jour avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de votre mot de passe.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleTwoFactor = async (checked: boolean) => {
    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 500))

      setTwoFactorEnabled(checked)

      // Afficher un toast de succès
      toast({
        title: checked ? "Authentification à deux facteurs activée" : "Authentification à deux facteurs désactivée",
        description: checked
          ? "L'authentification à deux facteurs a été activée avec succès."
          : "L'authentification à deux facteurs a été désactivée avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de l'authentification à deux facteurs.",
        variant: "destructive",
      })
    }
  }

  // Données simulées pour les sessions actives
  const activeSessions = [
    {
      id: "session_1",
      device: "Chrome sur Windows",
      location: "Paris, France",
      ip: "192.168.1.1",
      lastActive: "Il y a 2 minutes",
      current: true,
    },
    {
      id: "session_2",
      device: "Safari sur iPhone",
      location: "Lyon, France",
      ip: "192.168.1.2",
      lastActive: "Il y a 2 jours",
      current: false,
    },
    {
      id: "session_3",
      device: "Firefox sur MacOS",
      location: "Marseille, France",
      ip: "192.168.1.3",
      lastActive: "Il y a 5 jours",
      current: false,
    },
  ]

  const handleEndSession = async (sessionId: string) => {
    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Afficher un toast de succès
      toast({
        title: "Session terminée",
        description: "La session a été terminée avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la terminaison de la session.",
        variant: "destructive",
      })
    }
  }

  const handleEndAllSessions = async () => {
    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Afficher un toast de succès
      toast({
        title: "Toutes les sessions terminées",
        description: "Toutes les autres sessions ont été terminées avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la terminaison des sessions.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Paramètres de sécurité</h3>
        <p className="text-sm text-muted-foreground">Gérez la sécurité de votre compte et vos sessions actives.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Changer le mot de passe</CardTitle>
          <CardDescription>Mettez à jour votre mot de passe pour sécuriser votre compte.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe actuel</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>Votre mot de passe doit contenir au moins 8 caractères.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  "Mettre à jour le mot de passe"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentification à deux facteurs</CardTitle>
          <CardDescription>Ajoutez une couche de sécurité supplémentaire à votre compte.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Authentification par SMS</h4>
              <p className="text-sm text-muted-foreground">
                Recevez un code de vérification par SMS lors de la connexion.
              </p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={handleToggleTwoFactor} />
          </div>

          {twoFactorEnabled && (
            <Alert>
              <AlertTitle>Authentification à deux facteurs activée</AlertTitle>
              <AlertDescription>
                Vous recevrez un code de vérification par SMS lors de votre prochaine connexion.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setSessionManagementExpanded(!sessionManagementExpanded)}>
          <div className="flex justify-between items-center">
            <CardTitle>Gestion des sessions</CardTitle>
            <Button variant="ghost" size="sm">
              {sessionManagementExpanded ? "Masquer" : "Afficher"}
            </Button>
          </div>
          <CardDescription>Consultez et gérez vos sessions actives sur différents appareils.</CardDescription>
        </CardHeader>
        {sessionManagementExpanded && (
          <>
            <CardContent className="space-y-4">
              {activeSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium flex items-center">
                      {session.device}
                      {session.current && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Session actuelle
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {session.location} • {session.ip}
                    </p>
                    <p className="text-sm text-muted-foreground">Dernière activité : {session.lastActive}</p>
                  </div>
                  {!session.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEndSession(session.id)}
                      className="text-destructive"
                    >
                      Terminer
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleEndAllSessions} className="w-full">
                Terminer toutes les autres sessions
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}
