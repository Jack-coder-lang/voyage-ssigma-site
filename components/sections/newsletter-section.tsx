"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Mail } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="py-16 md:py-24 bg-blue-600 dark:bg-blue-800">
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedSection>
          <div className="text-center text-white">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Restez informé de nos offres</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter et recevez en avant-première nos meilleures offres de voyage
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-blue-100"
                required
              />
              <Button type="submit" variant="secondary" className="shrink-0">
                S'inscrire
              </Button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
