import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { AnimatedSection } from "@/components/ui/animated-section"

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/avion.png?height=800&width=1200"
          alt="Destination de rêve"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 text-center">
        <AnimatedSection direction="up">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Découvrez le monde avec <span className="text-blue-400">SSIGMA Voyages</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Votre agence de voyage de confiance pour des expériences inoubliables à travers l'Afrique et le monde
              entier
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/destinations">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Découvrir nos destinations
                </Button>
              </Link>
              <Link href="/booking">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  Réserver maintenant
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
