"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, CreditCard, Users, Plane, Building, Umbrella } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSection } from "@/components/ui/animated-section"
import { getAllRegions, getDestinationsByRegion } from "@/lib/destinations"

// Schéma de validation pour le formulaire
const bookingFormSchema = z
  .object({
    // Informations de voyage
    region: z.string({
      required_error: "Veuillez sélectionner une région.",
    }),
    destination: z.string({
      required_error: "Veuillez sélectionner une destination.",
    }),
    departureDate: z.date({
      required_error: "Veuillez sélectionner une date de départ.",
    }),
    returnDate: z.date({
      required_error: "Veuillez sélectionner une date de retour.",
    }),
    adults: z.string().min(1, {
      message: "Veuillez sélectionner le nombre d'adultes.",
    }),
    children: z.string().default("0"),

    // Options de voyage
    travelType: z.enum(["package", "flight", "hotel", "custom"], {
      required_error: "Veuillez sélectionner un type de voyage.",
    }),
    accommodation: z.string().optional(),
    transportType: z.string().optional(),
    mealPlan: z.string().optional(),
    activities: z.array(z.string()).optional(),

    // Informations personnelles
    firstName: z.string().min(2, {
      message: "Le prénom doit contenir au moins 2 caractères.",
    }),
    lastName: z.string().min(2, {
      message: "Le nom doit contenir au moins 2 caractères.",
    }),
    email: z.string().email({
      message: "Veuillez entrer une adresse email valide.",
    }),
    phone: z.string().min(10, {
      message: "Veuillez entrer un numéro de téléphone valide.",
    }),
    specialRequests: z.string().optional(),

    // Paiement
    paymentMethod: z.enum(["card", "transfer", "mobile", "later"], {
      required_error: "Veuillez sélectionner une méthode de paiement.",
    }),

    // Conditions
    newsletter: z.boolean().default(false).optional(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions générales pour continuer.",
    }),
  })
  .refine(
    (data) => {
      return data.returnDate > data.departureDate
    },
    {
      message: "La date de retour doit être postérieure à la date de départ.",
      path: ["returnDate"],
    },
  )

type BookingFormValues = z.infer<typeof bookingFormSchema>

export function BookingForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("")
  const [destinations, setDestinations] = useState<{ id: string; name: string; country: string }[]>([])

  const regions = getAllRegions()

  // Initialiser le formulaire
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      adults: "1",
      children: "0",
      travelType: "package",
      newsletter: false,
      termsAccepted: false,
      activities: [],
    },
  })

  // Observer les changements de région pour mettre à jour les destinations
  const watchRegion = form.watch("region")
  if (watchRegion !== selectedRegion) {
    setSelectedRegion(watchRegion)
    if (watchRegion) {
      const regionDestinations = getDestinationsByRegion(watchRegion)
      setDestinations(
        regionDestinations.map((dest) => ({
          id: dest.id,
          name: dest.name,
          country: dest.country,
        })),
      )
    } else {
      setDestinations([])
    }
  }

  // Fonction pour passer à l'étape suivante
  const nextStep = () => {
    // Valider les champs de l'étape actuelle avant de passer à la suivante
    if (step === 1) {
      form.trigger(["region", "destination", "departureDate", "returnDate", "adults", "children"]).then((isValid) => {
        if (isValid) setStep(2)
      })
    } else if (step === 2) {
      form.trigger(["travelType", "accommodation", "transportType", "mealPlan"]).then((isValid) => {
        if (isValid) setStep(3)
      })
    } else if (step === 3) {
      form.trigger(["firstName", "lastName", "email", "phone"]).then((isValid) => {
        if (isValid) setStep(4)
      })
    }
  }

  // Fonction pour revenir à l'étape précédente
  const prevStep = () => {
    setStep(step - 1)
  }

  // Fonction pour soumettre le formulaire
  function onSubmit(values: BookingFormValues) {
    setIsSubmitting(true)

    // Simuler un délai de traitement
    setTimeout(() => {
      // Stocker les données de réservation dans sessionStorage
      sessionStorage.setItem(
        "bookingData",
        JSON.stringify({
          ...values,
          departureDate: format(values.departureDate, "dd/MM/yyyy"),
          returnDate: format(values.returnDate, "dd/MM/yyyy"),
          bookingId: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
          bookingDate: format(new Date(), "dd/MM/yyyy"),
          status: "confirmé",
        }),
      )

      // Rediriger vers la page de confirmation
      router.push("/booking/confirmation")
    }, 1500)
  }

  return (
    <AnimatedSection>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Réservation de voyage</CardTitle>
          <CardDescription>
            Réservez votre prochain voyage en quelques étapes simples. Tous les champs marqués d'un * sont obligatoires.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Étape 1: Informations de voyage */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                      1
                    </div>
                    <h3 className="text-lg font-medium">Informations de voyage</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Région*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une région" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {regions.map((region) => (
                                <SelectItem key={region} value={region}>
                                  {region}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destination*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={destinations.length === 0}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une destination" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {destinations.map((destination) => (
                                <SelectItem key={destination.id} value={destination.id}>
                                  {destination.name}, {destination.country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="departureDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date de départ*</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: fr })
                                  ) : (
                                    <span>Sélectionner une date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="returnDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date de retour*</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: fr })
                                  ) : (
                                    <span>Sélectionner une date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => {
                                  const departureDate = form.getValues("departureDate")
                                  return date < new Date() || (departureDate && date < departureDate)
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="adults"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adultes*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Nombre d'adultes" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="children"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enfants</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Nombre d'enfants" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Étape 2: Options de voyage */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                      2
                    </div>
                    <h3 className="text-lg font-medium">Options de voyage</h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="travelType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Type de voyage*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                          >
                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4 [&:has([data-state=checked])]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="package" className="sr-only" />
                              </FormControl>
                              <Umbrella className="h-6 w-6" />
                              <FormLabel className="font-normal cursor-pointer">Forfait tout inclus</FormLabel>
                            </FormItem>
                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4 [&:has([data-state=checked])]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="flight" className="sr-only" />
                              </FormControl>
                              <Plane className="h-6 w-6" />
                              <FormLabel className="font-normal cursor-pointer">Vol seulement</FormLabel>
                            </FormItem>
                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4 [&:has([data-state=checked])]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="hotel" className="sr-only" />
                              </FormControl>
                              <Building className="h-6 w-6" />
                              <FormLabel className="font-normal cursor-pointer">Hébergement seulement</FormLabel>
                            </FormItem>
                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4 [&:has([data-state=checked])]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="custom" className="sr-only" />
                              </FormControl>
                              <Users className="h-6 w-6" />
                              <FormLabel className="font-normal cursor-pointer">Voyage sur mesure</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="accommodation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type d'hébergement</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un hébergement" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hotel">Hôtel</SelectItem>
                              <SelectItem value="resort">Resort tout inclus</SelectItem>
                              <SelectItem value="apartment">Appartement</SelectItem>
                              <SelectItem value="villa">Villa privée</SelectItem>
                              <SelectItem value="hostel">Auberge de jeunesse</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="transportType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de transport</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un transport" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="flight">Vol</SelectItem>
                              <SelectItem value="train">Train</SelectItem>
                              <SelectItem value="bus">Bus</SelectItem>
                              <SelectItem value="car">Voiture de location</SelectItem>
                              <SelectItem value="none">Aucun transport</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="mealPlan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Formule de repas</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une formule" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="all_inclusive">Tout inclus</SelectItem>
                              <SelectItem value="full_board">Pension complète</SelectItem>
                              <SelectItem value="half_board">Demi-pension</SelectItem>
                              <SelectItem value="breakfast">Petit-déjeuner inclus</SelectItem>
                              <SelectItem value="none">Sans repas</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="activities"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Activités souhaitées</FormLabel>
                            <FormDescription>Sélectionnez les activités qui vous intéressent</FormDescription>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {["Excursions guidées", "Activités culturelles", "Sports nautiques", "Bien-être & Spa"].map(
                              (activity) => (
                                <FormField
                                  key={activity}
                                  control={form.control}
                                  name="activities"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={activity}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(activity)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), activity])
                                                : field.onChange(field.value?.filter((value) => value !== activity))
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">{activity}</FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ),
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Étape 3: Informations personnelles */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                      3
                    </div>
                    <h3 className="text-lg font-medium">Informations personnelles</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prénom*</FormLabel>
                          <FormControl>
                            <Input placeholder="Jean" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom*</FormLabel>
                          <FormControl>
                            <Input placeholder="Dupont" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone*</FormLabel>
                          <FormControl>
                            <Input placeholder="+225 07 XX XX XX XX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Demandes spéciales</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Indiquez ici toute demande particulière pour votre voyage..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Régime alimentaire, accessibilité, préférences de chambre, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Étape 4: Paiement et confirmation */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                      4
                    </div>
                    <h3 className="text-lg font-medium">Paiement et confirmation</h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Méthode de paiement*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 [&:has([data-state=checked])]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="card" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer flex items-center">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Carte bancaire (Visa, Mastercard)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 [&:has([data-state=checked])]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="transfer" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">Virement bancaire</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 [&:has([data-state=checked])]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="mobile" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Mobile Money (Orange Money, Wave)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 [&:has([data-state=checked])]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="later" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">Payer plus tard (à l'agence)</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4 rounded-md border p-4">
                    <h4 className="font-medium">Récapitulatif de la réservation</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Destination:</div>
                      <div>
                        {destinations.find((d) => d.id === form.getValues("destination"))?.name || "Non sélectionnée"}
                      </div>
                      <div className="text-muted-foreground">Dates:</div>
                      <div>
                        {form.getValues("departureDate") && form.getValues("returnDate")
                          ? `${format(form.getValues("departureDate"), "dd/MM/yyyy")} - ${format(
                              form.getValues("returnDate"),
                              "dd/MM/yyyy",
                            )}`
                          : "Non sélectionnées"}
                      </div>
                      <div className="text-muted-foreground">Voyageurs:</div>
                      <div>
                        {`${form.getValues("adults")} adulte(s)${
                          Number.parseInt(form.getValues("children")) > 0
                            ? `, ${form.getValues("children")} enfant(s)`
                            : ""
                        }`}
                      </div>
                      <div className="text-muted-foreground">Type de voyage:</div>
                      <div>
                        {form.getValues("travelType") === "package"
                          ? "Forfait tout inclus"
                          : form.getValues("travelType") === "flight"
                            ? "Vol seulement"
                            : form.getValues("travelType") === "hotel"
                              ? "Hébergement seulement"
                              : "Voyage sur mesure"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="newsletter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Je souhaite recevoir des offres et actualités par email</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              J'accepte les conditions générales de vente et la politique de confidentialité*
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Navigation entre les étapes */}
              <div className="flex justify-between pt-4 border-t">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Précédent
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Suivant
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        Traitement en cours...
                      </div>
                    ) : (
                      "Confirmer la réservation"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
