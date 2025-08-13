import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestinationById, getRelatedDestinations } from "@/lib/destinations";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PageTransition } from "@/components/ui/page-transition";
import { CurrencyConverter } from "@/components/currency/currency-converter";
import { DestinationWeather } from "@/components/weather/destination-weather";

interface DestinationPageProps {
  params: Promise<{ id: string }>; // Mettre à jour le type pour refléter que params est une Promise
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { id } = await params; // Résoudre params
  const destination = getDestinationById(id);

  if (!destination) {
    return {
      title: "Destination non trouvée",
      description: "La destination que vous recherchez n'existe pas.",
    };
  }

  return {
    title: `${destination.name}, ${destination.country} | VoyageExplore`,
    description: destination.description,
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { id } = await params; // Résoudre params
  const destination = getDestinationById(id);

  if (!destination) {
    notFound();
  }

  const relatedDestinations = getRelatedDestinations(destination.relatedDestinations);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          <section className="relative w-full h-[50vh] min-h-[400px]">
            <Image
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
              <AnimatedSection direction="up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {destination.name}, {destination.country}
                </h1>
                <p className="text-xl text-white/90 max-w-3xl">{destination.tagline}</p>
              </AnimatedSection>
            </div>
          </section>

          <section className="w-full py-12">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <AnimatedSection>
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Aperçu</TabsTrigger>
                        <TabsTrigger value="attractions">Attractions</TabsTrigger>
                        <TabsTrigger value="practical">Infos pratiques</TabsTrigger>
                        <TabsTrigger value="reviews">Avis</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="space-y-6 pt-6">
                        <div className="prose dark:prose-invert max-w-none">
                          <h2 className="text-2xl font-bold">À propos de {destination.name}</h2>
                          <p>{destination.longDescription}</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {destination.gallery.map((image, index) => (
                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`${destination.name} ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-110"
                              />
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="attractions" className="space-y-6 pt-6">
                        <h2 className="text-2xl font-bold">Attractions principales</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {destination.attractions.map((attraction) => (
                            <Card key={attraction.name}>
                              <div className="relative h-48 w-full">
                                <Image
                                  src={attraction.imageUrl || "/placeholder.svg"}
                                  alt={attraction.name}
                                  fill
                                  className="object-cover rounded-t-lg"
                                />
                              </div>
                              <CardContent className="p-4">
                                <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{attraction.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="practical" className="space-y-6 pt-6">
                        <h2 className="text-2xl font-bold">Informations pratiques</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Meilleure période pour visiter</h3>
                            <p>{destination.practicalInfo.bestTimeToVisit}</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Langue</h3>
                            <p>{destination.practicalInfo.language}</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Devise</h3>
                            <p>{destination.practicalInfo.currency}</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Fuseau horaire</h3>
                            <p>{destination.practicalInfo.timeZone}</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Climat</h3>
                            <p>{destination.practicalInfo.climate}</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="reviews" className="space-y-6 pt-6">
                        <h2 className="text-2xl font-bold">Avis des voyageurs</h2>
                        <div className="space-y-4">
                          {destination.testimonials.map((testimonial) => (
                            <div key={testimonial.name} className="border rounded-lg p-4">
                              <div className="flex items-center mb-4">
                                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                                  <Image
                                    src={testimonial.avatar || "/placeholder.svg"}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-semibold">{testimonial.name}</h3>
                                  <div className="flex items-center">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <svg
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < testimonial.rating ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                      {testimonial.date}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300">{testimonial.comment}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </AnimatedSection>
                </div>
                <div className="space-y-6">
                  <AnimatedSection delay={0.2}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                      <h2 className="text-xl font-bold mb-4">Réserver votre voyage</h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Découvrez {destination.name} avec nos forfaits personnalisés et commencez votre aventure dès
                        maintenant.
                      </p>
                      <Link href={`/destinations/${destination.id}/reservation`}>
                        <Button className="w-full mb-3">Réserver maintenant</Button>
                      </Link>
                      <Link href="/booking">
                        <Button variant="outline" className="w-full">
                          Voir tous les forfaits
                        </Button>
                      </Link>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection delay={0.3}>
                    <DestinationWeather destinationId={id} />
                  </AnimatedSection>

                  <AnimatedSection delay={0.4}>
                    <CurrencyConverter />
                  </AnimatedSection>

                  {relatedDestinations.length > 0 && (
                    <AnimatedSection delay={0.5}>
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Destinations similaires</h2>
                        <div className="space-y-4">
                          {relatedDestinations.map((related) => (
                            <Link
                              key={related.id}
                              href={`/destinations/${related.id}`}
                              className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                                <Image
                                  src={related.image || "/placeholder.svg"}
                                  alt={related.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {related.name}, {related.country}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{related.tagline}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
    </div>
  );
}