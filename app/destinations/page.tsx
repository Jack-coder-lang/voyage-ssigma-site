"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/ui/page-transition"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Destination {
  id: string
  name: string
  country: string
  region: string
  image: string
  price: number
  rating: number
  reviews: number
  tag: string
  description: string
  isPopular: boolean
  isFeatured: boolean
}

const regions = [
  { value: "all", label: "Toutes les régions" },
  { value: "afrique-ouest", label: "Afrique de l'Ouest" },
  { value: "afrique-nord", label: "Afrique du Nord" },
  { value: "afrique-est", label: "Afrique de l'Est" },
  { value: "afrique-sud", label: "Afrique Australe" },
  { value: "europe", label: "Europe" },
  { value: "asie", label: "Asie" },
  { value: "amerique", label: "Amérique" },
  { value: "oceanie", label: "Océanie" },
]

const sortOptions = [
  { value: "name", label: "Nom (A-Z)" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
  { value: "popular", label: "Plus populaires" },
]

// Données simulées (en production, récupérées depuis l'API)
const allDestinations: Destination[] = [
  {
    id: "dakar",
    name: "Dakar",
    country: "Sénégal",
    region: "afrique-ouest",
    image: "/dakar.jpg?height=300&width=400",
    price: 350000,
    rating: 4.8,
    reviews: 127,
    tag: "Populaire",
    description: "Capitale vibrante avec des plages magnifiques",
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "abidjan",
    name: "Abidjan",
    country: "Côte d'Ivoire",
    region: "afrique-ouest",
    image: "/Abidjan.jpg?height=300&width=400",
    price: 380000,
    rating: 4.6,
    reviews: 89,
    tag: "Économique",
    description: "Perle des lagunes et centre économique",
    isPopular: true,
    isFeatured: false,
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Maroc",
    region: "afrique-nord",
    image: "/placeholder.svg?height=300&width=400",
    price: 420000,
    rating: 4.9,
    reviews: 203,
    tag: "Coup de cœur",
    description: "Ville impériale aux mille couleurs",
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "casablanca",
    name: "Casablanca",
    country: "Maroc",
    region: "afrique-nord",
    image: "/placeholder.svg?height=300&width=400",
    price: 390000,
    rating: 4.5,
    reviews: 156,
    tag: "Business",
    description: "Capitale économique du Maroc",
    isPopular: false,
    isFeatured: false,
  },
  {
    id: "cape-town",
    name: "Le Cap",
    country: "Afrique du Sud",
    region: "afrique-sud",
    image: "/placeholder.svg?height=300&width=400",
    price: 580000,
    rating: 4.7,
    reviews: 156,
    tag: "Aventure",
    description: "Entre océan et montagne, une beauté saisissante",
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    country: "Tanzanie",
    region: "afrique-est",
    image: "/placeholder.svg?height=300&width=400",
    price: 650000,
    rating: 4.6,
    reviews: 89,
    tag: "Détente",
    description: "Île paradisiaque aux eaux cristallines",
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "dubai",
    name: "Dubaï",
    country: "Émirats Arabes Unis",
    region: "asie",
    image: "/placeholder.svg?height=300&width=400",
    price: 750000,
    rating: 4.8,
    reviews: 312,
    tag: "Luxe",
    description: "Ville futuriste aux expériences uniques",
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonésie",
    region: "asie",
    image: "/placeholder.svg?height=300&width=400",
    price: 680000,
    rating: 4.9,
    reviews: 245,
    tag: "Spirituel",
    description: "Île des dieux aux paysages enchanteurs",
    isPopular: true,
    isFeatured: true,
  },
]

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>(allDestinations)
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(allDestinations)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const destinationsPerPage = 9

  useEffect(() => {
    let filtered = destinations

    // Filtrer par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrer par région
    if (selectedRegion !== "all") {
      filtered = filtered.filter((dest) => dest.region === selectedRegion)
    }

    // Filtrer par onglet actif
    if (activeTab === "popular") {
      filtered = filtered.filter((dest) => dest.isPopular)
    } else if (activeTab === "featured") {
      filtered = filtered.filter((dest) => dest.isFeatured)
    }

    // Trier (ajustement pour retirer le tri par prix)
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "popular":
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredDestinations(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedRegion, sortBy, activeTab, destinations])

  const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage)
  const startIndex = (currentPage - 1) * destinationsPerPage
  const currentDestinations = filteredDestinations.slice(startIndex, startIndex + destinationsPerPage)

  const getDestinationsByRegion = (region: string) => {
    return allDestinations.filter((dest) => dest.region === region)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
              <Image
                src="/placeholder.svg?height=400&width=1200"
                alt="Destinations du monde"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 text-center">
              <AnimatedSection direction="up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Nos destinations</h1>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Découvrez notre sélection de destinations exceptionnelles à travers le monde
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* Filters Section */}
          <section className="py-8 bg-gray-50 dark:bg-gray-900">
            <div className="container px-4 md:px-6">
              <AnimatedSection>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Rechercher une destination..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-80"
                      />
                    </div>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region.value} value={region.value}>
                            {region.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions
                        .filter((option) => option.value !== "price-asc" && option.value !== "price-desc") // Retire les options de tri par prix
                        .map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Destinations Section */}
          <section className="py-12">
            <div className="container px-4 md:px-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="popular">Populaires</TabsTrigger>
                  <TabsTrigger value="featured">Coup de cœur</TabsTrigger>
                  <TabsTrigger value="regions">Par région</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-8">
                  <AnimatedSection>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Toutes les destinations ({filteredDestinations.length})</h2>
                    </div>
                  </AnimatedSection>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentDestinations.map((destination, index) => (
                      <AnimatedSection key={destination.id} delay={index * 0.1} direction="up">
                        <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                          <div className="relative">
                            <Image
                              src={destination.image || "/placeholder.svg"}
                              alt={destination.name}
                              width={400}
                              height={250}
                              className="w-full h-48 object-cover"
                            />
                            <Badge className="absolute top-3 left-3 bg-blue-600 text-white">{destination.tag}</Badge>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-500">{destination.country}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{destination.description}</p>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{destination.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">({destination.reviews} avis)</span>
                            </div>
                            <div className="flex items-center justify-between">
                              {/* Prix retiré ici */}
                              <Link href={`/destinations/${destination.id}`}>
                                <Button size="sm">Découvrir</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedSection>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <AnimatedSection delay={0.3}>
                      <div className="flex justify-center gap-2 mt-8">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          Précédent
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            onClick={() => setCurrentPage(page)}
                            className="w-10"
                          >
                            {page}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Suivant
                        </Button>
                      </div>
                    </AnimatedSection>
                  )}
                </TabsContent>

                <TabsContent value="popular">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allDestinations
                      .filter((dest) => dest.isPopular)
                      .map((destination, index) => (
                        <AnimatedSection key={destination.id} delay={index * 0.1} direction="up">
                          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                            <div className="relative">
                              <Image
                                src={destination.image || "/placeholder.svg"}
                                alt={destination.name}
                                width={400}
                                height={250}
                                className="w-full h-48 object-cover"
                              />
                              <Badge className="absolute top-3 left-3 bg-red-600 text-white">Populaire</Badge>
                            </div>
                            <CardContent className="p-6">
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-500">{destination.country}</span>
                              </div>
                              <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4">{destination.description}</p>
                              <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{destination.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500">({destination.reviews} avis)</span>
                              </div>
                              <div className="flex items-center justify-between">
                                {/* Prix retiré ici */}
                                <Link href={`/destinations/${destination.id}`}>
                                  <Button size="sm">Découvrir</Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedSection>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="featured">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allDestinations
                      .filter((dest) => dest.isFeatured)
                      .map((destination, index) => (
                        <AnimatedSection key={destination.id} delay={index * 0.1} direction="up">
                          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                            <div className="relative">
                              <Image
                                src={destination.image || "/placeholder.svg"}
                                alt={destination.name}
                                width={400}
                                height={250}
                                className="w-full h-48 object-cover"
                              />
                              <Badge className="absolute top-3 left-3 bg-green-600 text-white">Coup de cœur</Badge>
                            </div>
                            <CardContent className="p-6">
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-500">{destination.country}</span>
                              </div>
                              <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4">{destination.description}</p>
                              <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{destination.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500">({destination.reviews} avis)</span>
                              </div>
                              <div className="flex items-center justify-between">
                                {/* Prix retiré ici */}
                                <Link href={`/destinations/${destination.id}`}>
                                  <Button size="sm">Découvrir</Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedSection>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="regions" className="space-y-8">
                  {regions.slice(1).map((region, regionIndex) => {
                    const regionDestinations = getDestinationsByRegion(region.value)
                    if (regionDestinations.length === 0) return null

                    return (
                      <AnimatedSection key={region.value} delay={regionIndex * 0.1}>
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold mb-4">{region.label}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {regionDestinations.slice(0, 3).map((destination, index) => (
                              <Card
                                key={destination.id}
                                className="overflow-hidden h-full hover:shadow-lg transition-shadow"
                              >
                                <div className="relative">
                                  <Image
                                    src={destination.image || "/placeholder.svg"}
                                    alt={destination.name}
                                    width={400}
                                    height={250}
                                    className="w-full h-48 object-cover"
                                  />
                                  <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                                    {destination.tag}
                                  </Badge>
                                </div>
                                <CardContent className="p-6">
                                  <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-500">{destination.country}</span>
                                  </div>
                                  <h4 className="text-xl font-bold mb-2">{destination.name}</h4>
                                  <p className="text-gray-600 dark:text-gray-300 mb-4">{destination.description}</p>
                                  <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span className="font-medium">{destination.rating}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">({destination.reviews} avis)</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    {/* Prix retiré ici */}
                                    <Link href={`/destinations/${destination.id}`}>
                                      <Button size="sm">Découvrir</Button>
                                    </Link>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          {regionDestinations.length > 3 && (
                            <div className="text-center mt-6">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSelectedRegion(region.value)
                                  setActiveTab("all")
                                }}
                              >
                                Voir toutes les destinations en {region.label}
                              </Button>
                            </div>
                          )}
                        </div>
                      </AnimatedSection>
                    )
                  })}
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>
      </PageTransition>
    </div>
  )
}