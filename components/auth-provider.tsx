"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id?: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuth = localStorage.getItem("isAuthenticated") === "true"
        if (isAuth) {
          const userData = localStorage.getItem("user")
          if (userData) {
            setUser(JSON.parse(userData))
          }
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Rediriger si nécessaire
  useEffect(() => {
    if (!isLoading) {
      const protectedPaths = ["/dashboard"]
      const authPaths = ["/auth/login", "/auth/register"]

      const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname?.startsWith(`${path}/`))
      const isAuthPath = authPaths.some((path) => pathname === path)

      if (isProtectedPath && !user) {
        router.push("/auth/login")
      } else if (isAuthPath && user) {
        router.push("/dashboard")
      }
    }
  }, [isLoading, user, pathname, router])

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulation d'authentification
      // Dans une application réelle, vous appelleriez votre API d'authentification ici
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Vérification simple (à remplacer par votre logique d'authentification)
      if (email === "admin@example.com" && password === "password") {
        const userData: User = {
          name: "Admin User",
          email,
          role: "admin",
          avatar: "/placeholder.svg?height=40&width=40",
        }

        // Stocker les informations d'authentification
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("user", JSON.stringify(userData))

        setUser(userData)
        return true
      }
      return false
    } catch (error) {
      console.error("Erreur lors de la connexion:", error)
      return false
    }
  }

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/auth/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
