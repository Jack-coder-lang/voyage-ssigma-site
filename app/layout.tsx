import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/session-provider" // Doit maintenant fonctionner
import { Toaster } from "@/components/ui/toaster"
import { ChatBot } from "@/components/chatbot/chat-bot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SSIGMA Voyage - Découvrez le monde avec nous",
  description: "Votre agence de voyage de confiance pour des expériences inoubliables à travers le monde",
  keywords: "voyage, tourisme, destinations, réservation, vacances, Afrique, Europe, Asie",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SessionProvider>
            {children}
            <Toaster />
            <ChatBot />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}