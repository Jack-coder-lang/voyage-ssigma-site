"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, PlusCircle, MinusCircle, Plane } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/ui/animated-section"

// Schéma de validation pour le formulaire
const formSchema = z
  .object({
    tripType: z.enum(["aller-retour", "aller-simple", "multi-destinations"]),
    departureCity: z.string().min(2, {
      message: "Veuillez sélectionner une ville de départ.",
    }),
    arrivalCity: z.string().min(2, {
      message: "Veuillez sélectionner une ville d'arrivée.",
    }),
    departureDate: z.date({
      required_error: "Veuillez sélectionner une date de départ.",
    }),
    returnDate: z.date().optional(),
    travelClass: z.enum(["economy", "premium", "business", "premiere"]),
    passengers: z.object({
      baby: z.number().min(0).default(0),
      child: z.number().min(0).default(0),
      youth12to17: z.number().min(0).default(0),
      youth18to24: z.number().min(0).default(0),
      student: z.number().min(0).default(0),
      adult: z
        .number()
        .min(1, {
          message: "Au moins un adulte est requis.",
        })
        .default(1),
      senior: z.number().min(0).default(0),
    }),
  })
  .refine(
    (data) => {
      // Si c'est un aller-retour, la date de retour est obligatoire
      if (data.tripType === "aller-retour") {
        return data.returnDate !== undefined
      }
      return true
    },
    {
      message: "La date de retour est obligatoire pour un aller-retour.",
      path: ["returnDate"],
    },
  )
  .refine(
    (data) => {
      // Si c'est un aller-retour, la date de retour doit être après la date de départ
      if (data.tripType === "aller-retour" && data.returnDate) {
        return data.returnDate > data.departureDate
      }
      return true
    },
    {
      message: "La date de retour doit être après la date de départ.",
      path: ["returnDate"],
    },
  )
  .refine(
    (data) => {
      // Vérifier que le nombre total de passagers ne dépasse pas 9
      const totalPassengers =
        data.passengers.baby +
        data.passengers.child +
        data.passengers.youth12to17 +
        data.passengers.youth18to24 +
        data.passengers.student +
        data.passengers.adult +
        data.passengers.senior
      return totalPassengers <= 9
    },
    {
      message: "Le nombre total de passagers ne peut pas dépasser 9.",
      path: ["passengers"],
    },
  )

// Liste des principales villes pour les suggestions
const majorCities = [
  "Paris, France (CDG)",
  "Londres, Royaume-Uni (LHR)",
  "New York, États-Unis (JFK)",
  "Tokyo, Japon (HND)",
  "Dubaï, Émirats Arabes Unis (DXB)",
  "Sydney, Australie (SYD)",
  "Rome, Italie (FCO)",
  "Bangkok, Thaïlande (BKK)",
  "Rio de Janeiro, Brésil (GIG)",
  "Le Caire, Égypte (CAI)",
  "Barcelone, Espagne (BCN)",
  "Montréal, Canada (YUL)",
  "Berlin, Allemagne (BER)",
  "Amsterdam, Pays-Bas (AMS)",
  "Singapour (SIN)",
  "Hong Kong (HKG)",
  "Istanbul, Turquie (IST)",
  "Moscou, Russie (SVO)",
  "Johannesburg, Afrique du Sud (JNB)",
  "Mexico, Mexique (MEX)",
]

export default function ReservationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassengerDetails, setShowPassengerDetails] = useState(false)
  const [totalPassengers, setTotalPassengers] = useState(1)

  // Initialiser le formulaire avec des valeurs par défaut
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripType: "aller-retour",
      departureCity: "",
      arrivalCity: "",
      travelClass: "economy",
      passengers: {
        baby: 0,
        child: 0,
        youth12to17: 0,
        youth18to24: 0,
        student: 0,
        adult: 1,
        senior: 0,
      },
    },
  })

  // Observer les changements dans le nombre de passagers
  const passengers = form.watch("passengers")

  // Mettre à jour le nombre total de passagers lorsque les valeurs changent
  useEffect(() => {
    const total =
      passengers.baby +
      passengers.child +
      passengers.youth12to17 +
      passengers.youth18to24 +
      passengers.student +
      passengers.adult +
      passengers.senior

    setTotalPassengers(total)
  }, [passengers])

  // Fonction pour gérer l'incrémentation/décrémentation des passagers
  const updatePassengerCount = (type: keyof typeof passengers, increment: boolean) => {
    const currentValue = form.getValues(`passengers.${type}`)
    const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1)

    // Si c'est un adulte, on s'assure qu'il y a au moins 1
    if (type === "adult" && newValue < 1) {
      return
    }

    // Calculer le nouveau total
    const currentTotal = Object.values(form.getValues("passengers")).reduce((sum, val) => sum + val, 0)
    const newTotal = currentTotal + (increment ? 1 : -1)

    // Vérifier que le total ne dépasse pas 9
    if (newTotal > 9) {
      return
    }

    form.setValue(`passengers.${type}`, newValue)
    setTotalPassengers(newTotal)
  }

  // Fonction pour soumettre le formulaire
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simuler un délai de traitement
    setTimeout(() => {
      console.log(values)

      // Stocker les données de réservation dans sessionStorage
      sessionStorage.setItem("flightReservation", JSON.stringify(values))

      // Rediriger vers une page de résultats (à créer)
      router.push("/reservation/resultats")

      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <AnimatedSection>
      <Card className="border-2">
        <CardContent className="p-6">
          <Tabs defaultValue="flight" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="flight" className="text-sm sm:text-base">
                <Plane className="mr-2 h-4 w-4" />
                Vol
              </TabsTrigger>
              <TabsTrigger value="hotel" disabled className="text-sm sm:text-base">
                Hôtel
              </TabsTrigger>
              <TabsTrigger value="package" disabled className="text-sm sm:text-base">
                Vol + Hôtel
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flight">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Type de voyage */}
                  <FormField
                    control={form.control}
                    name="tripType"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-wrap gap-4">
                          <Button
                            type="button"
                            variant={field.value === "aller-retour" ? "default" : "outline"}
                            onClick={() => field.onChange("aller-retour")}
                            className="flex-1"
                          >
                            Aller-retour
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === "aller-simple" ? "default" : "outline"}
                            onClick={() => field.onChange("aller-simple")}
                            className="flex-1"
                          >
                            Aller simple
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === "multi-destinations" ? "default" : "outline"}
                            onClick={() => field.onChange("multi-destinations")}
                            className="flex-1"
                            disabled
                          >
                            Multi-destinations
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ville de départ */}
                    <FormField
                      control={form.control}
                      name="departureCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Départ de</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une ville" />
                              </SelectTrigger>
                              <SelectContent>
                                {majorCities.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Ville d'arrivée */}
                    <FormField
                      control={form.control}
                      name="arrivalCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Arrivée à</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une ville" />
                              </SelectTrigger>
                              <SelectContent>
                                {majorCities.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date de départ */}
                    <FormField
                      control={form.control}
                      name="departureDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date de départ</FormLabel>
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

                    {/* Date de retour (conditionnelle) */}
                    {form.watch("tripType") === "aller-retour" && (
                      <FormField
                        control={form.control}
                        name="returnDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date de retour</FormLabel>
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
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sélection des passagers */}
                    <FormField
                      control={form.control}
                      name="passengers"
                      render={() => (
                        <FormItem>
                          <FormLabel>Passagers</FormLabel>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full justify-between mt-2"
                              onClick={() => setShowPassengerDetails(!showPassengerDetails)}
                            >
                              <span>
                                {totalPassengers} Passager{totalPassengers > 1 ? "s" : ""}
                              </span>
                              <span className="text-xs text-gray-500">
                                {passengers.adult} Adulte{passengers.adult > 1 ? "s" : ""}
                                {passengers.child > 0 &&
                                  `, ${passengers.child} Enfant${passengers.child > 1 ? "s" : ""}`}
                                {passengers.baby > 0 && `, ${passengers.baby} Bébé${passengers.baby > 1 ? "s" : ""}`}
                                {(passengers.youth12to17 > 0 || passengers.youth18to24 > 0) &&
                                  `, ${passengers.youth12to17 + passengers.youth18to24} Jeune${
                                    passengers.youth12to17 + passengers.youth18to24 > 1 ? "s" : ""
                                  }`}
                                {passengers.student > 0 &&
                                  `, ${passengers.student} Étudiant${passengers.student > 1 ? "s" : ""}`}
                                {passengers.senior > 0 &&
                                  `, ${passengers.senior} Senior${passengers.senior > 1 ? "s" : ""}`}
                              </span>
                            </Button>
                          </FormControl>

                          {showPassengerDetails && (
                            <div className="mt-2 p-4 border rounded-md space-y-4">
                              {/* Adultes */}
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Adulte</p>
                                  <p className="text-sm text-gray-500">26-64 ans</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("adult", false)}
                                    disabled={passengers.adult <= 1}
                                  >
                                    <MinusCircle className="h-4 w-4" />
                                  </Button>
                                  <span>{passengers.adult}</span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("adult", true)}
                                  >
                                    <PlusCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Seniors */}
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Senior</p>
                                  <p className="text-sm text-gray-500">65 ans et plus</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("senior", false)}
                                    disabled={passengers.senior <= 0}
                                  >
                                    <MinusCircle className="h-4 w-4" />
                                  </Button>
                                  <span>{passengers.senior}</span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("senior", true)}
                                  >
                                    <PlusCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Jeunes 18-24 */}
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Jeune</p>
                                  <p className="text-sm text-gray-500">18-24 ans</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("youth18to24", false)}
                                    disabled={passengers.youth18to24 <= 0}
                                  >
                                    <MinusCircle className="h-4 w-4" />
                                  </Button>
                                  <span>{passengers.youth18to24}</span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("youth18to24", true)}
                                  >
                                    <PlusCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Étudiants */}
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Étudiant</p>
                                  <p className="text-sm text-gray-500">18-29 ans</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("student", false)}
                                    disabled={passengers.student <= 0}
                                  >
                                    <MinusCircle className="h-4 w-4" />
                                  </Button>
                                  <span>{passengers.student}</span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("student", true)}
                                  >
                                    <PlusCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Jeunes 12-17 */}
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Jeune</p>
                                  <p className="text-sm text-gray-500">12-17 ans</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("youth12to17", false)}
                                    disabled={passengers.youth12to17 <= 0}
                                  >
                                    <MinusCircle className="h-4 w-4" />
                                  </Button>
                                  <span>{passengers.youth12to17}</span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("youth12to17", true)}
                                  >
                                    <PlusCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Enfants */}
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Enfant</p>
                                  <p className="text-sm text-gray-500">2-11 ans</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("child", false)}
                                    disabled={passengers.child <= 0}
                                  >
                                    <MinusCircle className="h-4 w-4" />
                                  </Button>
                                  <span>{passengers.child}</span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("child", true)}
                                  >
                                    <PlusCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Bébés */}
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Bébé</p>
                                  <p className="text-sm text-gray-500">0-23 mois</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("baby", false)}
                                    disabled={passengers.baby <= 0}
                                  >
                                    <MinusCircle className="h-4 w-4" />
                                  </Button>
                                  <span>{passengers.baby}</span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updatePassengerCount("baby", true)}
                                  >
                                    <PlusCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {totalPassengers > 9 && (
                                <p className="text-red-500 text-sm">
                                  Le nombre total de passagers ne peut pas dépasser 9.
                                </p>
                              )}
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Classe de voyage */}
                    <FormField
                      control={form.control}
                      name="travelClass"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Classe</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une classe" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="economy">Economy</SelectItem>
                              <SelectItem value="premium">Premium Economy</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="premiere">La Première</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
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
                        Recherche en cours...
                      </div>
                    ) : (
                      "Rechercher"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
