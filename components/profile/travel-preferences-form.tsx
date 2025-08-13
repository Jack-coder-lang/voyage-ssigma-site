"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const travelPreferencesSchema = z.object({
  preferredClass: z.string({
    required_error: "Veuillez sélectionner une classe préférée.",
  }),
  seatPreference: z.string({
    required_error: "Veuillez sélectionner une préférence de siège.",
  }),
  mealPreference: z.string({
    required_error: "Veuillez sélectionner une préférence de repas.",
  }),
  specialAssistance: z.boolean().default(false),
  assistanceDetails: z.string().optional(),
  travelInterests: z.array(z.string()).min(1, {
    message: "Veuillez sélectionner au moins un intérêt de voyage.",
  }),
  preferredAirlines: z.array(z.string()).optional(),
  preferredHotelChains: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
})

type TravelPreferencesValues = z.infer<typeof travelPreferencesSchema>

const travelInterests = [
  { id: "beach", label: "Plage" },
  { id: "mountain", label: "Montagne" },
  { id: "city", label: "Ville" },
  { id: "culture", label: "Culture" },
  { id: "gastronomy", label: "Gastronomie" },
  { id: "adventure", label: "Aventure" },
  { id: "relaxation", label: "Relaxation" },
  { id: "ecotourism", label: "Écotourisme" },
]

const airlines = [
  { id: "airfrance", label: "Air France" },
  { id: "lufthansa", label: "Lufthansa" },
  { id: "britishairways", label: "British Airways" },
  { id: "emirates", label: "Emirates" },
  { id: "delta", label: "Delta Airlines" },
]

const hotelChains = [
  { id: "accor", label: "Accor Hotels" },
  { id: "hilton", label: "Hilton" },
  { id: "marriott", label: "Marriott" },
  { id: "ihg", label: "IHG" },
  { id: "hyatt", label: "Hyatt" },
]

export function TravelPreferencesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Valeurs par défaut (simulées)
  const defaultValues: Partial<TravelPreferencesValues> = {
    preferredClass: "economy",
    seatPreference: "window",
    mealPreference: "standard",
    specialAssistance: false,
    travelInterests: ["beach", "culture"],
    preferredAirlines: ["airfrance"],
    preferredHotelChains: ["accor"],
    additionalNotes: "",
  }

  const form = useForm<TravelPreferencesValues>({
    resolver: zodResolver(travelPreferencesSchema),
    defaultValues,
  })

  const watchSpecialAssistance = form.watch("specialAssistance")

  async function onSubmit(data: TravelPreferencesValues) {
    setIsSubmitting(true)

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Afficher un toast de succès
      toast({
        title: "Préférences mises à jour",
        description: "Vos préférences de voyage ont été mises à jour avec succès.",
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
        <h3 className="text-lg font-medium">Préférences de voyage</h3>
        <p className="text-sm text-muted-foreground">
          Personnalisez vos préférences pour une expérience de voyage sur mesure.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="preferredClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Classe préférée</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="economy">Économique</SelectItem>
                      <SelectItem value="premium_economy">Économique Premium</SelectItem>
                      <SelectItem value="business">Affaires</SelectItem>
                      <SelectItem value="first">Première</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seatPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Préférence de siège</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une préférence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="window">Hublot</SelectItem>
                      <SelectItem value="aisle">Couloir</SelectItem>
                      <SelectItem value="middle">Milieu</SelectItem>
                      <SelectItem value="no_preference">Pas de préférence</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="mealPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Préférence de repas</FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="standard" />
                    </FormControl>
                    <FormLabel className="font-normal">Standard</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="vegetarian" />
                    </FormControl>
                    <FormLabel className="font-normal">Végétarien</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="vegan" />
                    </FormControl>
                    <FormLabel className="font-normal">Végétalien</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="gluten_free" />
                    </FormControl>
                    <FormLabel className="font-normal">Sans gluten</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="kosher" />
                    </FormControl>
                    <FormLabel className="font-normal">Casher</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="halal" />
                    </FormControl>
                    <FormLabel className="font-normal">Halal</FormLabel>
                  </FormItem>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialAssistance"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Assistance spéciale</FormLabel>
                  <FormDescription>Avez-vous besoin d'une assistance spéciale pendant votre voyage ?</FormDescription>
                </div>
              </FormItem>
            )}
          />

          {watchSpecialAssistance && (
            <FormField
              control={form.control}
              name="assistanceDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Détails de l'assistance requise</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Veuillez préciser le type d'assistance dont vous avez besoin..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="travelInterests"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Intérêts de voyage</FormLabel>
                  <FormDescription>Sélectionnez les types de voyages qui vous intéressent.</FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {travelInterests.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="travelInterests"
                      render={({ field }) => {
                        return (
                          <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredAirlines"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Compagnies aériennes préférées</FormLabel>
                  <FormDescription>Sélectionnez vos compagnies aériennes préférées.</FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {airlines.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="preferredAirlines"
                      render={({ field }) => {
                        return (
                          <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredHotelChains"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Chaînes hôtelières préférées</FormLabel>
                  <FormDescription>Sélectionnez vos chaînes hôtelières préférées.</FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {hotelChains.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="preferredHotelChains"
                      render={({ field }) => {
                        return (
                          <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes supplémentaires</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Autres préférences ou informations que vous souhaitez partager..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
