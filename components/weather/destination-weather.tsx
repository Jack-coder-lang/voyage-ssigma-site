"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cloud, Thermometer, Droplets, Wind, Calendar } from "lucide-react"

interface WeatherData {
  current: {
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    icon: string
  }
  forecast: Array<{
    date: string
    high: number
    low: number
    condition: string
    icon: string
    precipitation: number
  }>
  season: {
    type: "haute" | "basse" | "intermédiaire"
    reason: string
    tips: string[]
    bestMonths: string[]
    avoidMonths: string[]
  }
}

interface DestinationWeatherProps {
  destinationId: string
}

const coordinates: Record<string, { lat: number; lon: number }> = {
  "paris-france": { lat: 48.8566, lon: 2.3522 },    // Paris
  "bali-indonesie": { lat: -8.3405, lon: 115.0920 }, // Bali (approx. centre)
  "new-york-usa": { lat: 40.7128, lon: -74.0060 },   // New York
  "tokyo-japon": { lat: 35.6762, lon: 139.6503 },    // Tokyo
  "santorini-grece": { lat: 36.3932, lon: 25.4615 }, // Santorin (Thira)
  "marrakech-maroc": { lat: 31.6295, lon: -7.9811 }, // Marrakech
  "rio-de-janeiro-bresil": { lat: -22.9068, lon: -43.1729 }, // Rio de Janeiro
  "sydney-australie": { lat: -33.8688, lon: 151.2093 }, // Sydney
  "maldives": { lat: 3.2028, lon: 73.2207 },         // Maldives (Malé)
  "rome-italie": { lat: 41.9028, lon: 12.4964 },     // Rome
  "kyoto-japon": { lat: 35.0116, lon: 135.7681 },    // Kyoto
  "barcelone-espagne": { lat: 41.3851, lon: 2.1734 }, // Barcelone
}

const staticSeasonData: Record<string, WeatherData["season"]> = {
  "paris-france": {
    type: "intermédiaire",
    reason: "Début de l'été avec des températures modérées",
    tips: ["Prévoir des vêtements légers et une veste pour les soirées", "Éviter les foules touristiques en semaine", "Profitez des terrasses"],
    bestMonths: ["Mai", "Juin", "Septembre", "Octobre"],
    avoidMonths: ["Juillet", "Août"],
  },
  "bali-indonesie": {
    type: "haute",
    reason: "Saison sèche idéale pour les plages et les activités",
    tips: ["Réservez tôt pour les resorts", "Protégez-vous du soleil", "Explorez les temples en matinée"],
    bestMonths: ["Mai", "Juin", "Juillet", "Août", "Septembre"],
    avoidMonths: ["Janvier", "Février"],
  },
  "new-york-usa": {
    type: "intermédiaire",
    reason: "Printemps tardif avec un climat agréable",
    tips: ["Prévoir des vêtements en couches", "Visitez Central Park au printemps", "Évitez les heures de pointe"],
    bestMonths: ["Avril", "Mai", "Septembre", "Octobre"],
    avoidMonths: ["Juillet", "Août"],
  },
  "tokyo-japon": {
    type: "intermédiaire",
    reason: "Début de l'été avec des températures modérées",
    tips: ["Prévoir un parapluie", "Visitez les jardins en matinée", "Évitez les foules près des temples"],
    bestMonths: ["Mars", "Avril", "Octobre", "Novembre"],
    avoidMonths: ["Juillet", "Août"],
  },
  "santorini-grece": {
    type: "haute",
    reason: "Saison touristique avec soleil et chaleur",
    tips: ["Réservez vos hébergements tôt", "Portez de la crème solaire", "Profitez des couchers de soleil"],
    bestMonths: ["Mai", "Juin", "Septembre", "Octobre"],
    avoidMonths: ["Juillet", "Août"],
  },
  "marrakech-maroc": {
    type: "haute",
    reason: "Températures douces et idéales pour visiter la ville",
    tips: ["Parfait pour explorer les souks et monuments", "Emportez des vêtements chauds pour les soirées", "Profitez des terrasses"],
    bestMonths: ["Octobre", "Novembre", "Décembre", "Janvier", "Février", "Mars", "Avril"],
    avoidMonths: ["Juin", "Juillet", "Août"],
  },
  "rio-de-janeiro-bresil": {
    type: "basse",
    reason: "Hiver austral avec moins de précipitations",
    tips: ["Idéal pour le carnaval en février", "Prévoir des vêtements imperméables", "Profitez des plages en matinée"],
    bestMonths: ["Mai", "Juin", "Juillet", "Août", "Septembre"],
    avoidMonths: ["Décembre", "Janvier", "Février"],
  },
  "sydney-australie": {
    type: "basse",
    reason: "Hiver austral avec des températures fraîches",
    tips: ["Prévoir des vêtements chauds", "Visitez les musées en intérieur", "Profitez des festivals d'hiver"],
    bestMonths: ["Mars", "Avril", "Septembre", "Octobre", "Novembre"],
    avoidMonths: ["Juin", "Juillet"],
  },
  "maldives": {
    type: "haute",
    reason: "Saison sèche avec un climat parfait",
    tips: ["Réservez vos bungalows tôt", "Idéal pour la plongée", "Protégez-vous du soleil"],
    bestMonths: ["Novembre", "Décembre", "Janvier", "Février", "Mars", "Avril"],
    avoidMonths: ["Mai", "Juin", "Juillet", "Août"],
  },
  "rome-italie": {
    type: "intermédiaire",
    reason: "Début de l'été avec des températures agréables",
    tips: ["Prévoir de l'eau et un chapeau", "Visitez tôt le matin", "Profitez des trattorias"],
    bestMonths: ["Avril", "Mai", "Septembre", "Octobre"],
    avoidMonths: ["Juillet", "Août"],
  },
  "kyoto-japon": {
    type: "intermédiaire",
    reason: "Début de l'été avec un climat modéré",
    tips: ["Prévoir un parapluie", "Admirez les jardins en fleurs", "Évitez les foules"],
    bestMonths: ["Mars", "Avril", "Octobre", "Novembre"],
    avoidMonths: ["Juillet", "Août"],
  },
  "barcelone-espagne": {
    type: "intermédiaire",
    reason: "Début de l'été avec un climat doux",
    tips: ["Profitez des plages", "Visitez les musées en matinée", "Évitez les heures chaudes"],
    bestMonths: ["Mai", "Juin", "Septembre", "Octobre"],
    avoidMonths: ["Juillet", "Août"],
  },
}

export function DestinationWeather({ destinationId }: DestinationWeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("destinationId reçu:", destinationId)

    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)

        const { lat, lon } = coordinates[destinationId] || coordinates["paris-france"] // Fallback à Paris si non trouvé
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
        console.log("Clé API chargée:", apiKey)

        if (!apiKey) throw new Error("Clé API manquante. Vérifiez .env.local.")

        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`

        console.log("URLs API:", { currentWeatherUrl, forecastUrl })

        const currentResponse = await fetch(currentWeatherUrl)
        if (!currentResponse.ok) {
          const errorText = await currentResponse.text()
          throw new Error(`Erreur lors de la récupération des données météo actuelles: ${currentResponse.status} - ${errorText}`)
        }
        const currentData = await currentResponse.json()

        const forecastResponse = await fetch(forecastUrl)
        if (!forecastResponse.ok) {
          const errorText = await forecastResponse.text()
          throw new Error(`Erreur lors de la récupération des prévisions: ${forecastResponse.status} - ${errorText}`)
        }
        const forecastData = await forecastResponse.json()

        console.log("Données API brutes:", { currentData, forecastData })

        const weatherData: WeatherData = {
          current: {
            temperature: Math.round(currentData.main.temp),
            condition: currentData.weather[0].description,
            humidity: currentData.main.humidity,
            windSpeed: Math.round(currentData.wind.speed * 3.6),
            icon: getWeatherIcon(currentData.weather[0].icon),
          },
          forecast: forecastData.list
            .filter((_: any, index: number) => index % 8 === 0)
            .slice(0, 5)
            .map((item: any, index: number) => ({
              date: index === 0 ? "Aujourd'hui" : index === 1 ? "Demain" : `Jour ${index + 2}`,
              high: Math.round(item.main.temp_max),
              low: Math.round(item.main.temp_min),
              condition: item.weather[0].description,
              icon: getWeatherIcon(item.weather[0].icon),
              precipitation: item.pop * 100,
            })),
          season: staticSeasonData[destinationId] || staticSeasonData["paris-france"], // Fallback à Paris si non trouvé
        }

        setWeather(weatherData)
        console.log("Données météo formatées:", weatherData)
      } catch (err: any) {
        setError(err.message)
        console.error("Erreur API:", err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [destinationId])

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: Record<string, string> = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "⛅",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌦️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    }
    return iconMap[iconCode] || "🌥️"
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Météo et saisons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Météo et saisons</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">
            {error || "Données météo non disponibles. Vérifiez votre connexion ou la clé API."}
          </p>
        </CardContent>
      </Card>
    )
  }

  const getSeasonBadgeColor = (type: string) => {
    switch (type) {
      case "haute":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "basse":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "intermédiaire":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-blue-600" />
          Météo et saisons
        </CardTitle>
        <CardDescription>Informations météo et conseils pour votre voyage</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Actuel</TabsTrigger>
            <TabsTrigger value="forecast">Prévisions</TabsTrigger>
            <TabsTrigger value="season">Saison</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">{weather.current.icon}</div>
              <div className="text-3xl font-bold">{weather.current.temperature}°C</div>
              <div className="text-gray-600 dark:text-gray-300">{weather.current.condition}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <Droplets className="h-4 w-4 mx-auto text-blue-500" />
                <div className="text-sm font-medium">{weather.current.humidity}%</div>
                <div className="text-xs text-gray-500">Humidité</div>
              </div>
              <div className="space-y-1">
                <Wind className="h-4 w-4 mx-auto text-gray-500" />
                <div className="text-sm font-medium">{weather.current.windSpeed} km/h</div>
                <div className="text-xs text-gray-500">Vent</div>
              </div>
              <div className="space-y-1">
                <Thermometer className="h-4 w-4 mx-auto text-red-500" />
                <div className="text-sm font-medium">Ressenti</div>
                <div className="text-xs text-gray-500">{weather.current.temperature + 2}°C</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-4">
            <div className="space-y-3">
              {weather.forecast.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{day.icon}</span>
                    <div>
                      <div className="font-medium">{day.date}</div>
                      <div className="text-sm text-gray-500">{day.condition}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {day.high}° / {day.low}°
                    </div>
                    <div className="text-sm text-blue-500">{day.precipitation}% pluie</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="season" className="space-y-4">
            <div className="text-center">
              <Badge className={getSeasonBadgeColor(weather.season.type)}>Saison {weather.season.type}</Badge>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{weather.season.reason}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Conseils pour cette période
                </h4>
                <ul className="space-y-1">
                  {weather.season.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-600 mb-2">Meilleurs mois</h5>
                  <div className="flex flex-wrap gap-1">
                    {weather.season.bestMonths.map((month) => (
                      <Badge key={month} variant="outline" className="text-xs">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-red-600 mb-2">Mois à éviter</h5>
                  <div className="flex flex-wrap gap-1">
                    {weather.season.avoidMonths.map((month) => (
                      <Badge key={month} variant="outline" className="text-xs">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}