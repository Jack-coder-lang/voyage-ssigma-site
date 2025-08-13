import Link from "next/link"
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">SSIGMA Voyages</span>
            </div>
            <p className="text-gray-300">
              Votre agence de voyage de confiance pour des expériences inoubliables à travers l'Afrique et le monde
              entier.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-300 hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-white transition-colors">
                  Réservation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Mon compte
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nos services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/currency-converter" className="text-gray-300 hover:text-white transition-colors">
                  Convertisseur de devises
                </Link>
              </li>
              <li>
                <Link href="/tools/weather-seasons" className="text-gray-300 hover:text-white transition-colors">
                  Météo & Saisons
                </Link>
              </li>
              <li>
                <Link href="/loyalty" className="text-gray-300 hover:text-white transition-colors">
                  Programme de fidélité
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
                  Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">contact@voyage-explore.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+225 27 203 22550</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  Avenue Jean DelaFosse 134
                  <br />
                  Abidjan, Côte d'Ivoire
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 SSIGMA Voyages. Tous droits réservés. |
            <Link href="/privacy" className="hover:text-white ml-1">
              Politique de confidentialité
            </Link>{" "}
            |
            <Link href="/terms" className="hover:text-white ml-1">
              Conditions d'utilisation
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
