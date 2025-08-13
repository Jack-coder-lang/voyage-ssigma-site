"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Loader2 } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
}

// Base de connaissances pour le chatbot
const knowledgeBase = [
  {
    keywords: ["réservation", "réserver", "booking", "reserver", "reservation"],
    response:
      "Vous pouvez effectuer une réservation directement sur notre site en utilisant notre formulaire de réservation. Vous pouvez également nous contacter par téléphone au +225 07 XX XX XX XX ou par email à contact@voyageexplore.ci.",
  },
  {
    keywords: ["prix", "tarif", "coût", "cout", "combien", "price", "cost"],
    response:
      "Nos tarifs varient en fonction de la destination et de la période de voyage. Vous pouvez consulter nos offres sur notre site ou nous contacter pour un devis personnalisé.",
  },
  {
    keywords: ["annulation", "remboursement", "annuler", "cancel", "refund"],
    response:
      "Notre politique d'annulation permet un remboursement complet jusqu'à 30 jours avant le départ. Entre 30 et 15 jours, des frais de 30% s'appliquent. Moins de 15 jours avant le départ, des frais de 50% s'appliquent. Aucun remboursement n'est possible 72h avant le départ.",
  },
  {
    keywords: ["paiement", "payment", "carte", "visa", "mastercard", "payer"],
    response:
      "Nous acceptons les paiements par carte bancaire (Visa, Mastercard), par virement bancaire, et par mobile money (Orange Money, Wave).",
  },
  {
    keywords: ["contact", "adresse", "téléphone", "email", "mail", "telephone"],
    response:
      "Notre agence est située à Cocody Riviera Palmeraie, Boulevard François Mitterrand, Abidjan, Côte d'Ivoire. Vous pouvez nous contacter par téléphone au +225 07 XX XX XX XX ou par email à contact@voyageexplore.ci.",
  },
  {
    keywords: ["horaire", "ouverture", "heure", "opening", "hours"],
    response: "Nos bureaux sont ouverts du lundi au vendredi de 8h à 18h et le samedi de 9h à 13h.",
  },
  {
    keywords: ["covid", "sanitaire", "santé", "health", "vaccination", "vaccin"],
    response:
      "Nous suivons toutes les recommandations sanitaires en vigueur. Veuillez vérifier les exigences spécifiques à votre destination avant de voyager. Nous pouvons vous aider à obtenir les informations nécessaires.",
  },
  {
    keywords: ["bagage", "valise", "poids", "luggage", "baggage", "weight"],
    response:
      "Les limites de bagages varient selon les compagnies aériennes. En général, vous avez droit à un bagage en soute de 23kg et un bagage à main de 10kg. Nous vous recommandons de vérifier les conditions spécifiques de votre vol.",
  },
  {
    keywords: ["visa", "passeport", "document", "passport", "documents"],
    response:
      "Les documents nécessaires dépendent de votre destination. En général, vous aurez besoin d'un passeport valide au moins 6 mois après votre retour. Certaines destinations exigent un visa. Nous pouvons vous aider dans vos démarches administratives.",
  },
  {
    keywords: ["assurance", "insurance", "assistance", "rapatriement"],
    response:
      "Nous recommandons vivement de souscrire à une assurance voyage qui couvre les frais médicaux, l'annulation et la perte de bagages. Nous proposons différentes formules d'assurance adaptées à vos besoins.",
  },
  {
    keywords: ["destination", "pays", "populaire", "recommandation", "recommend"],
    response:
      "Nos destinations les plus populaires sont Dubaï, Paris, Marrakech, Istanbul, et les Maldives. Nous proposons également des circuits en Afrique et des séjours balnéaires.",
  },
  {
    keywords: ["wifi", "internet", "connexion", "connection"],
    response:
      "La plupart de nos hôtels partenaires offrent une connexion Wi-Fi gratuite. Nous pouvons également vous proposer des solutions de connectivité internationale pour votre voyage.",
  },
]

// Fonction pour trouver une réponse dans la base de connaissances
function findResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  for (const item of knowledgeBase) {
    if (item.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return item.response
    }
  }

  return "Je suis désolé, je n'ai pas compris votre question. Pourriez-vous la reformuler ou contacter directement notre équipe à contact@voyageexplore.ci ou au +225 07 XX XX XX XX pour une assistance personnalisée."
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Bonjour ! Je suis l'assistant virtuel de VoyageExplore. Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user" as const,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: findResponse(inputValue),
        sender: "bot" as const,
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsOpen((prev) => !prev)} className="h-14 w-14 rounded-full shadow-lg" size="icon">
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-80 md:w-96"
          >
            <Card className="shadow-xl border-2">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg py-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Assistant VoyageExplore
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-1">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>En train d'écrire...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-2 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex w-full gap-2"
                >
                  <Input
                    placeholder="Tapez votre message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
