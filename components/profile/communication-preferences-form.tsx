"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const communicationSchema = z.object({
  emailMarketing: z.boolean().default(true),
  emailBooking: z.boolean().default(true),
  emailAccount: z.boolean().default(true),
  smsMarketing: z.boolean().default(false),
  smsBooking: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  emailFrequency: z.enum(["daily", "weekly", "monthly", "never"]).default("weekly"),
})

type CommunicationValues = z.infer<typeof communicationSchema>

export function CommunicationPreferencesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Valeurs par défaut (simulées)
  const defaultValues: CommunicationValues = {
    emailMarketing: true,
    emailBooking: true,
    emailAccount: true,
    smsMarketing: false,
    smsBooking: true,
    pushNotifications: true,
    emailFrequency: "weekly",
  }

  const form = useForm<CommunicationValues>({
    resolver: zodResolver(communicationSchema),
    defaultValues,
  })

  async function onSubmit(data: CommunicationValues) {
    setIsSubmitting(true)

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Afficher un toast de succès
      toast({
        title: "Préférences mises à jour",
        description: "Vos préférences de communication ont été mises à jour avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de vos préférences.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Préférences de communication</h3>
        <p className="text-sm text-muted-foreground">
          Gérez comment et quand vous souhaitez recevoir des communications de notre part.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications par email</CardTitle>
              <CardDescription>Choisissez les types d'emails que vous souhaitez recevoir.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="emailMarketing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Offres et promotions</FormLabel>
                      <FormDescription>
                        Recevez des offres spéciales, des réductions et des suggestions de voyage.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emailBooking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Réservations et voyages</FormLabel>
                      <FormDescription>
                        Confirmations de réservation, modifications et rappels de voyage.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emailAccount"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Compte et sécurité</FormLabel>
                      <FormDescription>
                        Mises à jour de compte, alertes de sécurité et confirmations de paiement.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications par SMS</CardTitle>
              <CardDescription>Choisissez les types de SMS que vous souhaitez recevoir.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="smsMarketing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Offres et promotions</FormLabel>
                      <FormDescription>Recevez des offres spéciales et des réductions par SMS.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="smsBooking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Réservations et voyages</FormLabel>
                      <FormDescription>
                        Alertes de voyage, modifications de vol et informations importantes.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autres préférences</CardTitle>
              <CardDescription>Gérez vos autres préférences de communication.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="pushNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Notifications push</FormLabel>
                      <FormDescription>Recevez des notifications push sur votre appareil mobile.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emailFrequency"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Fréquence des emails marketing</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="daily" />
                          </FormControl>
                          <FormLabel className="font-normal">Quotidienne</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="weekly" />
                          </FormControl>
                          <FormLabel className="font-normal">Hebdomadaire</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="monthly" />
                          </FormControl>
                          <FormLabel className="font-normal">Mensuelle</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="never" />
                          </FormControl>
                          <FormLabel className="font-normal">Jamais</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              "Enregistrer les préférences"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
