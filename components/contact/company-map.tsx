"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Globe, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

// Informations de l'entreprise
const companyInfo = {
  name: "VoyageExplore Côte d'Ivoire",
  address: "Cocody Riviera Palmeraie",
  street: "Boulevard François Mitterrand",
  city: "Abidjan",
  country: "Côte d'Ivoire",
  postalCode: "01 BP 1234",
  email: "contact@voyageexplore.ci",
  phone: "+225 07 XX XX XX XX",
  website: "www.voyageexplore.ci",
  hours: "Lun-Ven: 8h-18h | Sam: 9h-13h",
  // Coordonnées d'Abidjan, Côte d'Ivoire
  coordinates: [5.359952, -4.008256] as [number, number],
}

export function CompanyMap() {
  // Générer l'URL de l'image de carte statique depuis OpenStreetMap
  const staticMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    companyInfo.coordinates[1] - 0.01
  },${companyInfo.coordinates[0] - 0.01},${companyInfo.coordinates[1] + 0.01},${
    companyInfo.coordinates[0] + 0.01
  }&layer=mapnik&marker=${companyInfo.coordinates[0]},${companyInfo.coordinates[1]}`

  // URL pour Google Maps
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${companyInfo.coordinates[0]},${companyInfo.coordinates[1]}`

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nous trouver</CardTitle>
        <CardDescription>Visitez notre agence ou contactez-nous</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2">
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{companyInfo.name}</h3>
              <p className="text-sm text-muted-foreground">
                Votre partenaire de confiance pour des voyages inoubliables
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-sm text-muted-foreground">{companyInfo.address}</p>
                  <p className="text-sm text-muted-foreground">{companyInfo.street}</p>
                  <p className="text-sm text-muted-foreground">
                    {companyInfo.postalCode} {companyInfo.city}, {companyInfo.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{companyInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-sm text-muted-foreground">{companyInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Site web</p>
                  <p className="text-sm text-muted-foreground">{companyInfo.website}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Horaires d'ouverture</p>
                  <p className="text-sm text-muted-foreground">{companyInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] md:h-auto relative flex flex-col">
            <div className="flex-1 relative">
              <iframe
                src={staticMapUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                title="Carte de localisation de l'entreprise"
                className="absolute inset-0 w-full h-full"
                style={{ borderRadius: "0 0 0 0" }}
              ></iframe>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => window.open(googleMapsUrl, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                <span>Voir sur Google Maps</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
