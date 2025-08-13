"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, CreditCard, Trash2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const newCardSchema = z.object({
  cardNumber: z
    .string()
    .min(16, {
      message: "Le numéro de carte doit contenir au moins 16 chiffres.",
    })
    .max(19),
  cardholderName: z.string().min(3, {
    message: "Le nom du titulaire doit contenir au moins 3 caractères.",
  }),
  expiryMonth: z.string({
    required_error: "Veuillez sélectionner un mois d'expiration.",
  }),
  expiryYear: z.string({
    required_error: "Veuillez sélectionner une année d'expiration.",
  }),
  cvv: z
    .string()
    .min(3, {
      message: "Le code de sécurité doit contenir au moins 3 chiffres.",
    })
    .max(4),
  isDefault: z.boolean().default(false),
})

type NewCardValues = z.infer<typeof newCardSchema>

// Données simulées pour les cartes existantes
const savedCards = [
  {
    id: "card_1",
    type: "visa",
    last4: "4242",
    expiryMonth: "09",
    expiryYear: "2025",
    cardholderName: "Jean Dupont",
    isDefault: true,
  },
  {
    id: "card_2",
    type: "mastercard",
    last4: "5678",
    expiryMonth: "12",
    expiryYear: "2024",
    cardholderName: "Jean Dupont",
    isDefault: false,
  },
]

export function PaymentMethodsForm() {
  const [cards, setCards] = useState(savedCards)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<NewCardValues>({
    resolver: zodResolver(newCardSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      isDefault: false,
    },
  })

  async function onSubmit(data: NewCardValues) {
    setIsSubmitting(true)

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Ajouter la nouvelle carte à la liste
      const newCard = {
        id: `card_${Date.now()}`,
        type: data.cardNumber.startsWith("4") ? "visa" : "mastercard",
        last4: data.cardNumber.slice(-4),
        expiryMonth: data.expiryMonth,
        expiryYear: data.expiryYear,
        cardholderName: data.cardholderName,
        isDefault: data.isDefault,
      }

      // Si la nouvelle carte est définie par défaut, mettre à jour les autres cartes
      let updatedCards = [...cards]
      if (data.isDefault) {
        updatedCards = updatedCards.map((card) => ({
          ...card,
          isDefault: false,
        }))
      }

      setCards([...updatedCards, newCard])

      // Réinitialiser le formulaire
      form.reset()

      // Fermer la boîte de dialogue
      setIsDialogOpen(false)

      // Afficher un toast de succès
      toast({
        title: "Carte ajoutée",
        description: "Votre nouvelle carte a été ajoutée avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de votre carte.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCard = async (cardId: string) => {
    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Supprimer la carte de la liste
      const updatedCards = cards.filter((card) => card.id !== cardId)
      setCards(updatedCards)

      // Afficher un toast de succès
      toast({
        title: "Carte supprimée",
        description: "Votre carte a été supprimée avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de votre carte.",
        variant: "destructive",
      })
    }
  }

  const handleSetDefaultCard = async (cardId: string) => {
    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mettre à jour la liste des cartes
      const updatedCards = cards.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
      setCards(updatedCards)

      // Afficher un toast de succès
      toast({
        title: "Carte par défaut mise à jour",
        description: "Votre carte par défaut a été mise à jour avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de votre carte par défaut.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Méthodes de paiement</h3>
        <p className="text-sm text-muted-foreground">Gérez vos cartes de paiement pour vos réservations.</p>
      </div>

      <div className="space-y-4">
        {cards.map((card) => (
          <Card key={card.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {card.type === "visa" ? "Visa" : "Mastercard"} •••• {card.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expire le {card.expiryMonth}/{card.expiryYear}
                    </p>
                    <p className="text-sm text-muted-foreground">{card.cardholderName}</p>
                    {card.isDefault && (
                      <span className="mt-1 inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        Par défaut
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!card.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => handleSetDefaultCard(card.id)}>
                      Définir par défaut
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une nouvelle carte
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle carte</DialogTitle>
              <DialogDescription>Ajoutez une nouvelle carte de paiement à votre compte.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de carte</FormLabel>
                      <FormControl>
                        <Input placeholder="4242 4242 4242 4242" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardholderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du titulaire</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mois</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = (i + 1).toString().padStart(2, "0")
                              return (
                                <SelectItem key={month} value={month}>
                                  {month}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiryYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="AA" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = (new Date().getFullYear() + i).toString()
                              return (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Définir comme carte par défaut</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Ajout en cours...
                      </>
                    ) : (
                      "Ajouter la carte"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
