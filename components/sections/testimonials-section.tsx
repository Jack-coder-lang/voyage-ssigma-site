import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"

const testimonials = [
  {
    name: "Aminata Diallo",
    location: "Dakar, Sénégal",
    rating: 5,
    comment:
      "Un voyage absolument fantastique au Maroc ! L'équipe de Voyage Explore a organisé chaque détail à la perfection. Je recommande vivement !",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Pierre Martin",
    location: "Paris, France",
    rating: 5,
    comment:
      "Service exceptionnel et destinations de rêve. Notre lune de miel à Zanzibar était magique grâce à leur organisation impeccable.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Fatou Seck",
    location: "Abidjan, Côte d'Ivoire",
    rating: 5,
    comment:
      "Des conseillers à l'écoute et des prix très compétitifs. Mon voyage à Dubaï a dépassé toutes mes attentes !",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez les témoignages de voyageurs qui ont fait confiance à SSIGMA Voyages 
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.1} direction="up">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
