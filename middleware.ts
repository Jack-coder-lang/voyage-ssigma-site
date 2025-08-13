import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Exemple de middleware pour protéger les routes admin
  // Dans une implémentation réelle, vous vérifieriez les tokens JWT, les cookies, etc.

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")

  // Simulation de vérification d'authentification et d'autorisation
  // Dans une vraie application, vous vérifieriez les tokens JWT, les cookies, etc.
  const isAuthenticated = true // À remplacer par une vraie vérification
  const isAdmin = true // À remplacer par une vraie vérification

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Rediriger vers le tableau de bord utilisateur si l'utilisateur n'est pas admin
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
