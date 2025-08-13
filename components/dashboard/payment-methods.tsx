"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Smartphone, Trash2, Plus, Check } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"

export function PaymentMethods() {
  const [activeTab, setActiveTab] = useState("cards")
  const [savedCards, setSavedCards] = useState([
    {
      id: "1",
      type: "visa",
      number: "**** **** **** 4242",
      expiry: "09/25",
      name: "Jean Dupont",
      isDefault: true,
    },
    {
      id: "2",
      type: "mastercard",
      number: "**** **** **** 5555",
      expiry: "12/24",
      name: "Jean Dupont",
      isDefault: false,
    },
  ])

  const [savedMobilePayments, setSavedMobilePayments] = useState([
    {
      id: "1",
      type: "orange-money",
      number: "+225 07 ** ** 42",
      name: "Jean Dupont",
      isDefault: true,
    },
    {
      id: "2",
      type: "wave",
      number: "+225 05 ** ** 55",
      name: "Jean Dupont",
      isDefault: false,
    },
    {
      id: "3",
      type: "mtn-money",
      number: "+225 05 ** ** 77",
      name: "Jean Dupont",
      isDefault: false,
    },
  ])

  const [showAddCard, setShowAddCard] = useState(false)
  const [showAddMobile, setShowAddMobile] = useState(false)

  const setDefaultCard = (id: string) => {
    setSavedCards(
      savedCards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      })),
    )
  }

  const deleteCard = (id: string) => {
    setSavedCards(savedCards.filter((card) => card.id !== id))
  }

  const setDefaultMobilePayment = (id: string) => {
    setSavedMobilePayments(
      savedMobilePayments.map((payment) => ({
        ...payment,
        isDefault: payment.id === id,
      })),
    )
  }

  const deleteMobilePayment = (id: string) => {
    setSavedMobilePayments(savedMobilePayments.filter((payment) => payment.id !== id))
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation d'ajout de carte
    const newCard = {
      id: String(savedCards.length + 1),
      type: "visa",
      number: "**** **** **** 1234",
      expiry: "12/26",
      name: "Jean Dupont",
      isDefault: false,
    }
    setSavedCards([...savedCards, newCard])
    setShowAddCard(false)
  }

  const handleAddMobilePayment = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation d'ajout de paiement mobile
    const newPayment = {
      id: String(savedMobilePayments.length + 1),
      type: "orange-money",
      number: "+225 07 ** ** 99",
      name: "Jean Dupont",
      isDefault: false,
    }
    setSavedMobilePayments([...savedMobilePayments, newPayment])
    setShowAddMobile(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Méthodes de paiement</CardTitle>
        <CardDescription>Gérez vos méthodes de paiement pour les réservations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cards" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cards" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Cartes bancaires
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center">
              <Smartphone className="mr-2 h-4 w-4" />
              Paiement mobile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="mt-6 space-y-6">
            {savedCards.map((card) => (
              <AnimatedSection key={card.id} direction="right">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-16 items-center justify-center rounded bg-gray-100 dark:bg-gray-800">
                        {card.type === "visa" ? (
                          <svg className="h-6 w-10" viewBox="0 0 48 16" fill="none">
                            <path
                              d="M44 0H4C1.8 0 0 1.8 0 4v8c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4z"
                              fill="#1434CB"
                            />
                            <path
                              d="M19.128 13.784l1.368-8.784h2.184l-1.368 8.784h-2.184zm10.064-8.576c-.432-.168-.936-.336-1.656-.336-1.824 0-3.096.96-3.096 2.328-.016 1.008.912 1.568 1.608 1.904.712.344 1.016.576.992.888-.016.48-.592.696-1.136.696-.76 0-1.168-.112-1.792-.368l-.248-.112-.264 1.6c.44.2 1.256.376 2.104.384 1.984 0 3.272-.944 3.288-2.408.008-.8-.488-1.408-1.56-1.912-.648-.328-1.048-.544-1.048-.872.008-.296.336-.608 1.064-.608.608-.016 1.048.128 1.384.272l.168.08.256-1.536zm4.064 5.456c.152-.408.736-1.968.736-1.968-.8.016.12-.328.2-.536l.104.488s.352 1.688.424 2.016h-1.464zm2.2-5.664h-1.688c-.52 0-.912.152-1.144.696l-3.24 7.608h2.296l.456-1.24h2.808c.064.296.264 1.24.264 1.24h2.024l-1.776-8.304zm-33.312 0l-2.144 5.688-.232-1.16c-.4-1.344-1.648-2.8-3.04-3.528l1.968 7.288h2.32l3.448-8.288h-2.32z"
                              fill="#fff"
                            />
                            <path
                              d="M2.32 5.2H0c-.016 0-.016.016 0 .016 1.8.448 2.992 1.536 3.496 2.84L2.992 5.36c-.088-.344-.36-.536-.672-.16z"
                              fill="#F7A600"
                            />
                          </svg>
                        ) : (
                          <svg className="h-6 w-10" viewBox="0 0 48 16" fill="none">
                            <path
                              d="M44 0H4C1.8 0 0 1.8 0 4v8c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4z"
                              fill="#252525"
                            />
                            <path
                              d="M16.8 13.2c-2.4 0-4.512-1.256-5.6-3.2 2.4 0 4.512 1.256 5.6 3.2zM16.8 2.8c2.4 0 4.512 1.256 5.6 3.2-2.4 0-4.512-1.256-5.6-3.2z"
                              fill="#EB001B"
                            />
                            <path
                              d="M16.8 2.8v10.4c-2.4 0-4.512-1.256-5.6-3.2 0-1.6.8-3.2 1.6-4 .8-.8 2.4-2.4 4-3.2z"
                              fill="#F79E1B"
                            />
                            <path
                              d="M22.4 2.8v10.4c2.4 0 4.512-1.256 5.6-3.2 0-1.6-.8-3.2-1.6-4-.8-.8-2.4-2.4-4-3.2z"
                              fill="#00A1DF"
                            />
                            <path
                              d="M22.4 13.2c-2.4 0-4.512-1.256-5.6-3.2 2.4 0 4.512 1.256 5.6 3.2zM22.4 2.8c2.4 0 4.512 1.256 5.6 3.2-2.4 0-4.512-1.256-5.6-3.2z"
                              fill="#F79E1B"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{card.number}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {card.name} • Expire {card.expiry}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {card.isDefault ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        >
                          Par défaut
                        </Badge>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDefaultCard(card.id)}
                          className="h-8 px-2 text-xs"
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Définir par défaut
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCard(card.id)}
                        className="h-8 px-2 text-xs text-red-500 hover:text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {showAddCard ? (
              <AnimatedSection direction="up">
                <Card>
                  <CardHeader>
                    <CardTitle>Ajouter une carte</CardTitle>
                    <CardDescription>Ajoutez une nouvelle carte bancaire à votre compte</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleAddCard}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Numéro de carte</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Date d'expiration</Label>
                          <Input id="expiry" placeholder="MM/AA" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Nom sur la carte</Label>
                        <Input id="card-name" placeholder="Jean Dupont" required />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setShowAddCard(false)}>
                        Annuler
                      </Button>
                      <Button type="submit">Ajouter la carte</Button>
                    </CardFooter>
                  </form>
                </Card>
              </AnimatedSection>
            ) : (
              <Button variant="outline" className="w-full" onClick={() => setShowAddCard(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une nouvelle carte
              </Button>
            )}
          </TabsContent>

          <TabsContent value="mobile" className="mt-6 space-y-6">
            {savedMobilePayments.map((payment) => (
              <AnimatedSection key={payment.id} direction="right">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 dark:bg-gray-800">
                        {payment.type === "orange-money" ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                            OM
                          </div>
                        ) : payment.type === "mtn-money" ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white font-bold">
                            MTN
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                            W
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {payment.type === "orange-money"
                            ? "Orange Money"
                            : payment.type === "mtn-money"
                              ? "MTN Money"
                              : "Wave"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {payment.number} • {payment.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {payment.isDefault ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        >
                          Par défaut
                        </Badge>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDefaultMobilePayment(payment.id)}
                          className="h-8 px-2 text-xs"
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Définir par défaut
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMobilePayment(payment.id)}
                        className="h-8 px-2 text-xs text-red-500 hover:text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {showAddMobile ? (
              <AnimatedSection direction="up">
                <Card>
                  <CardHeader>
                    <CardTitle>Ajouter un paiement mobile</CardTitle>
                    <CardDescription>Ajoutez un nouveau moyen de paiement mobile</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleAddMobilePayment}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="payment-type">Type de paiement</Label>
                        <Select defaultValue="orange-money">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type de paiement" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="orange-money">Orange Money</SelectItem>
                            <SelectItem value="mtn-money">MTN Money</SelectItem>
                            <SelectItem value="wave">Wave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone-number">Numéro de téléphone</Label>
                        <Input id="phone-number" placeholder="+225 XX XX XX XX XX" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="full-name">Nom complet</Label>
                        <Input id="full-name" placeholder="Jean Dupont" required />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setShowAddMobile(false)}>
                        Annuler
                      </Button>
                      <Button type="submit">Ajouter</Button>
                    </CardFooter>
                  </form>
                </Card>
              </AnimatedSection>
            ) : (
              <Button variant="outline" className="w-full" onClick={() => setShowAddMobile(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un nouveau paiement mobile
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
