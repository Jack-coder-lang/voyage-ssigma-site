import { Shield, Users, Award, HeartHandshake } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"

const features = [
  {
    icon: Shield,
    title: "Fiabilité garantie",
    description: "Plus de 15 ans d'expérience dans l'organisation de voyages exceptionnels.",
  },
  {
    icon: Users,
    title: "Équipe d'experts",
    description: "Nos conseillers connaissent personnellement chaque destination que nous proposons.",
  },
  {
    icon: Award,
    title: "Certification d'accréditation IATA",
    description: "Agence accréditée IATA pour votre sécurité et la garantie de nos services professionnels.",
  },
  {
    icon: HeartHandshake,
    title: "Service personnalisé",
    description: "Chaque voyage est unique et adapté à vos envies et votre budget.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir SSIGMA Voyages ?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Nous nous engageons à faire de chaque voyage une expérience mémorable et sans souci
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.1} direction="up">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}