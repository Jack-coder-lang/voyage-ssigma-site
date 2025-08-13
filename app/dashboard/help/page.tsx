import { SiteHeader } from "@/components/site-header"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Mail, Phone, MessageSquare } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <SiteHeader />
      <div className="flex-1">
        <DashboardHeader />
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] px-4 md:px-6 py-6">
          <aside className="hidden md:block">
            <DashboardNav />
          </aside>
          <main className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold tracking-tight">Aide et support</h1>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-50 px-2 text-muted-foreground dark:bg-gray-950">
                  Comment pouvons-nous vous aider ?
                </span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher dans l'aide..." className="pl-10" />
              </div>
            </div>

            <Tabs defaultValue="faq" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="contact">Nous contacter</TabsTrigger>
                <TabsTrigger value="tickets">Mes tickets</TabsTrigger>
              </TabsList>

              <TabsContent value="faq" className="mt-6 space-y-6">
                <AnimatedSection>
                  <Card>
                    <CardHeader>
                      <CardTitle>Questions fréquemment posées</CardTitle>
                      <CardDescription>Trouvez rapidement des réponses à vos questions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Comment modifier ou annuler ma réservation ?</AccordionTrigger>
                          <AccordionContent>
                            Vous pouvez modifier ou annuler votre réservation depuis votre espace client, dans la
                            section "Mes voyages". Veuillez noter que des frais peuvent s'appliquer selon les conditions
                            de votre réservation et le délai avant le départ.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Quels sont les moyens de paiement acceptés ?</AccordionTrigger>
                          <AccordionContent>
                            Nous acceptons les cartes bancaires (Visa, Mastercard), ainsi que les paiements mobiles
                            comme Orange Money et Wave en Côte d'Ivoire. Vous pouvez gérer vos méthodes de paiement dans
                            la section "Paiements" de votre tableau de bord.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Comment obtenir ma facture ?</AccordionTrigger>
                          <AccordionContent>
                            Vos factures sont automatiquement générées après chaque paiement et disponibles dans la
                            section "Paiements" de votre tableau de bord. Vous pouvez les télécharger au format PDF ou
                            les recevoir par email.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                          <AccordionTrigger>Quels documents sont nécessaires pour voyager ?</AccordionTrigger>
                          <AccordionContent>
                            Les documents requis varient selon la destination. En général, vous aurez besoin d'un
                            passeport valide, parfois d'un visa, et dans certains cas de certificats de vaccination.
                            Consultez les informations spécifiques à votre destination dans la section "Mes voyages".
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                          <AccordionTrigger>Comment fonctionne le système de fidélité ?</AccordionTrigger>
                          <AccordionContent>
                            Notre programme de fidélité vous permet de cumuler des points à chaque réservation. Ces
                            points peuvent être utilisés pour obtenir des réductions sur vos prochains voyages ou des
                            services supplémentaires. Consultez votre solde de points dans la section "Mon profil".
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Guides et tutoriels</CardTitle>
                      <CardDescription>
                        Apprenez à utiliser toutes les fonctionnalités de notre plateforme
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                      <Button variant="outline" className="h-auto flex flex-col items-start p-4 text-left">
                        <h3 className="font-medium mb-1">Guide de réservation</h3>
                        <p className="text-sm text-muted-foreground">
                          Comment réserver votre voyage en quelques étapes simples
                        </p>
                      </Button>
                      <Button variant="outline" className="h-auto flex flex-col items-start p-4 text-left">
                        <h3 className="font-medium mb-1">Gérer vos paiements</h3>
                        <p className="text-sm text-muted-foreground">Ajouter et gérer vos méthodes de paiement</p>
                      </Button>
                      <Button variant="outline" className="h-auto flex flex-col items-start p-4 text-left">
                        <h3 className="font-medium mb-1">Préparer votre voyage</h3>
                        <p className="text-sm text-muted-foreground">
                          Checklist et conseils pour bien préparer votre départ
                        </p>
                      </Button>
                      <Button variant="outline" className="h-auto flex flex-col items-start p-4 text-left">
                        <h3 className="font-medium mb-1">Utiliser l'application mobile</h3>
                        <p className="text-sm text-muted-foreground">Fonctionnalités et astuces pour l'application</p>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </TabsContent>

              <TabsContent value="contact" className="mt-6">
                <AnimatedSection>
                  <Card>
                    <CardHeader>
                      <CardTitle>Contactez-nous</CardTitle>
                      <CardDescription>
                        Notre équipe est à votre disposition pour répondre à vos questions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                          <CardContent className="p-6 flex flex-col items-center text-center">
                            <Mail className="h-10 w-10 text-blue-500 mb-4" />
                            <h3 className="font-medium mb-1">Email</h3>
                            <p className="text-sm text-muted-foreground mb-4">Réponse sous 24h</p>
                            <Button variant="outline" className="w-full">
                              support@voyageexplore.com
                            </Button>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 flex flex-col items-center text-center">
                            <Phone className="h-10 w-10 text-blue-500 mb-4" />
                            <h3 className="font-medium mb-1">Téléphone</h3>
                            <p className="text-sm text-muted-foreground mb-4">Lun-Ven, 8h-18h</p>
                            <Button variant="outline" className="w-full">
                              +225 07 XX XX XX XX
                            </Button>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 flex flex-col items-center text-center">
                            <MessageSquare className="h-10 w-10 text-blue-500 mb-4" />
                            <h3 className="font-medium mb-1">Chat en direct</h3>
                            <p className="text-sm text-muted-foreground mb-4">Disponible 24/7</p>
                            <Button className="w-full">Démarrer un chat</Button>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-gray-50 px-2 text-muted-foreground dark:bg-gray-950">
                            Ou envoyez-nous un message
                          </span>
                        </div>
                      </div>

                      <form className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                              Nom
                            </label>
                            <Input id="name" placeholder="Votre nom" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                              Email
                            </label>
                            <Input id="email" type="email" placeholder="votre@email.com" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">
                            Sujet
                          </label>
                          <Input id="subject" placeholder="Sujet de votre message" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Message
                          </label>
                          <Textarea id="message" placeholder="Détaillez votre demande..." className="min-h-[120px]" />
                        </div>
                        <Button type="submit" className="w-full">
                          Envoyer le message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </TabsContent>

              <TabsContent value="tickets" className="mt-6">
                <AnimatedSection>
                  <Card>
                    <CardHeader>
                      <CardTitle>Mes tickets de support</CardTitle>
                      <CardDescription>Suivez l'état de vos demandes d'assistance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border p-8 text-center">
                        <h3 className="text-lg font-medium mb-2">Aucun ticket actif</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Vous n'avez pas de tickets de support en cours. Si vous avez besoin d'aide, n'hésitez pas à
                          nous contacter.
                        </p>
                        <Button>Créer un nouveau ticket</Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}
