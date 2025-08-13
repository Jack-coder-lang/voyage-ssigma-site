import { SiteHeader } from "@/components/site-header"
import { CompanyMap } from "@/components/contact/company-map"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MessageSquare } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <div className="flex flex-col items-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contactez-nous</h1>
                  <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Notre équipe est à votre disposition pour répondre à toutes vos questions et vous aider à planifier
                    votre prochain voyage.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              <AnimatedSection direction="left">
                <Card>
                  <CardHeader>
                    <CardTitle>Envoyez-nous un message</CardTitle>
                    <CardDescription>
                      Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="first-name" className="text-sm font-medium leading-none">
                            Prénom
                          </label>
                          <Input id="first-name" placeholder="Jean" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="last-name" className="text-sm font-medium leading-none">
                            Nom
                          </label>
                          <Input id="last-name" placeholder="Dupont" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="jean.dupont@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium leading-none">
                          Téléphone
                        </label>
                        <Input id="phone" type="tel" placeholder="+225 XX XX XX XX XX" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium leading-none">
                          Sujet
                        </label>
                        <Input id="subject" placeholder="Objet de votre message" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium leading-none">
                          Message
                        </label>
                        <Textarea id="message" placeholder="Votre message..." className="min-h-[120px] resize-none" />
                      </div>
                      <Button type="submit" className="w-full">
                        Envoyer le message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <Mail className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="font-medium mb-1">Email</h3>
                        <p className="text-sm text-muted-foreground mb-4">Réponse sous 24h</p>
                        <Button variant="outline" className="w-full">
                          contact@voyageexplore.ci
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

                  <CompanyMap />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
