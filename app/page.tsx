import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/ui/page-transition";
import { getAllRegions, getDestinationsByRegion } from "@/lib/destinations";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DestinationWeather } from "@/components/weather/destination-weather";
import { Button } from "@/components/ui/button";
// Ajout des importations manquantes pour Card et CardContent
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const regions = getAllRegions();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          <HeroSection />
          <WhyChooseUs />
          <TestimonialsSection />
          <NewsletterSection />

          {/* Destinations Section */}
          <section id="destinations" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
            <div className="container px-4 md:px-6 mx-auto">
              <AnimatedSection>
                <div className="flex flex-col items-center justify-center space-y-4 text-center mx-auto">
                  <div className="space-y-2 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mx-auto">
                      Destinations du Monde Entier
                    </h2>
                    <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                      Explorez nos destinations les plus prisées et laissez-vous inspirer pour votre prochain voyage.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <div className="mt-8">
                <Tabs defaultValue={regions[0]} className="w-full">
                  <TabsList className="flex flex-wrap justify-center mb-8">
                    {regions.map((region) => (
                      <TabsTrigger key={region} value={region} className="text-sm md:text-base">
                        {region}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {regions.map((region) => (
                    <TabsContent key={region} value={region}>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {getDestinationsByRegion(region).map((destination, index) => (
                          <AnimatedSection key={destination.id} delay={index * 0.1} direction="up">
                            <Link
                              href={`/destinations/${destination.id}`}
                              className="group relative overflow-hidden rounded-lg shadow-lg block"
                            >
                              <div className="relative overflow-hidden">
                                <Image
                                  src={destination.image || "/placeholder.svg?height=600&width=800"}
                                  alt={destination.name}
                                  width={800}
                                  height={600}
                                  className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-4 text-white">
                                  <h3 className="text-xl font-bold">
                                    {destination.name}, {destination.country}
                                  </h3>
                                  <p>{destination.tagline}</p>
                                </div>
                              </div>
                              <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-b-lg">
                                {/* DestinationWeather retiré ici */}
                              </div>
                            </Link>
                          </AnimatedSection>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </section>

          {/* Offres Spéciales Section */}
          <section id="special-offers" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
            <div className="container px-4 md:px-6 mx-auto">
              <AnimatedSection>
                <div className="flex flex-col items-center justify-center space-y-4 text-center mx-auto">
                  <div className="space-y-2 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mx-auto">
                      Offres Spéciales
                    </h2>
                    <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                      Profitez de nos promotions exclusives pour vos prochaines aventures.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatedSection delay={0.1} direction="up">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Offre spéciale Dakar"
                      width={600}
                      height={400}
                      className="object-cover w-full h-48 transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">Dakar, Sénégal</h3>
                      <p className="text-sm">10% de réduction ce mois-ci !</p>
                      <Link href="/destinations/dakar">
                        <Button variant="outline" className="mt-2 text-white border-white hover:bg-white hover:text-gray-900">
                          Découvrir
                        </Button>
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.2} direction="up">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Offre spéciale Marrakech"
                      width={600}
                      height={400}
                      className="object-cover w-full h-48 transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">Marrakech, Maroc</h3>
                      <p className="text-sm">Offre famille - 15% de réduction</p>
                      <Link href="/destinations/marrakech">
                        <Button variant="outline" className="mt-2 text-white border-white hover:bg-white hover:text-gray-900">
                          Découvrir
                        </Button>
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.3} direction="up">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Offre spéciale Bali"
                      width={600}
                      height={400}
                      className="object-cover w-full h-48 transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">Bali, Indonésie</h3>
                      <p className="text-sm">Forfait tout inclus à prix réduit</p>
                      <Link href="/destinations/bali">
                        <Button variant="outline" className="mt-2 text-white border-white hover:bg-white hover:text-gray-900">
                          Découvrir
                        </Button>
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Conseils de Voyage Section */}
          <section id="travel-tips" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
            <div className="container px-4 md:px-6 mx-auto">
              <AnimatedSection>
                <div className="flex flex-col items-center justify-center space-y-4 text-center mx-auto">
                  <div className="space-y-2 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mx-auto">
                      Conseils de Voyage
                    </h2>
                    <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                      Préparez votre voyage avec nos astuces et recommandations.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedSection delay={0.1} direction="up">
                  <Card className="overflow-hidden shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Meilleurs moments pour voyager</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Découvrez les saisons idéales pour visiter vos destinations préférées.
                      </p>
                      <Link href="/travel-tips/best-times">
                        <Button variant="outline">Lire plus</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </AnimatedSection>
                <AnimatedSection delay={0.2} direction="up">
                  <Card className="overflow-hidden shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Bagages et formalités</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Conseils pour préparer vos valises et gérer les visas.
                      </p>
                      <Link href="/travel-tips/packing">
                        <Button variant="outline">Lire plus</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Carte Interactive Section */}
          <section id="map" className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-950">
            <div className="container px-4 md:px-6 mx-auto">
              <AnimatedSection>
                <div className="flex flex-col items-center justify-center space-y-4 text-center mx-auto">
                  <div className="space-y-2 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mx-auto">
                      Explorez la Carte
                    </h2>
                    <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                      Découvrez où se trouvent nos destinations sur une carte interactive.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
              <div className="mt-8">
                <AnimatedSection delay={0.1} direction="up">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/placeholder.svg?height=400&width=800&text=Carte+Interactive"
                      alt="Carte interactive des destinations"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Link href="/map">
                        <Button className="text-white bg-blue-600 hover:bg-blue-700">
                          Voir la carte
                        </Button>
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
            <div className="container px-4 md:px-6 mx-auto">
              <AnimatedSection>
                <div className="flex flex-col items-center justify-center space-y-4 text-center mx-auto">
                  <div className="space-y-2 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mx-auto">
                      Nos Services
                    </h2>
                    <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                      Découvrez comment nous pouvons rendre votre voyage inoubliable.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
              <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 mx-auto">
                <AnimatedSection direction="up" delay={0.1}>
                  <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm mx-auto">
                    <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-blue-600 dark:text-blue-400"
                      >
                        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-center">Voyages sur mesure</h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Créez votre itinéraire personnalisé avec l'aide de nos experts en voyage.
                    </p>
                  </div>
                </AnimatedSection>
                <AnimatedSection direction="up" delay={0.2}>
                  <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm mx-auto">
                    <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-blue-600 dark:text-blue-400"
                      >
                        <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-center">Assistance 24/7</h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Bénéficiez d'une assistance en français partout dans le monde, à tout moment.
                    </p>
                  </div>
                </AnimatedSection>
                <AnimatedSection direction="up" delay={0.3}>
                  <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm mx-auto">
                    <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-blue-600 dark:text-blue-400"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-center">Assurance voyage</h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Voyagez l'esprit tranquille avec nos options d'assurance complètes.
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-950">
            <div className="container px-4 md:px-6 mx-auto">
              <AnimatedSection>
                <div className="flex flex-col items-center justify-center space-y-4 text-center mx-auto">
                  <div className="space-y-2 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mx-auto">
                      Contactez-nous
                    </h2>
                    <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                      Nos conseillers sont à votre disposition pour répondre à toutes vos questions.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
              <div className="mx-auto max-w-lg mt-8">
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none">
                      Nom
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Entrez votre nom"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Entrez votre email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Entrez votre message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 dark:bg-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 dark:hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <SiteFooter />
    </div>
  );
}