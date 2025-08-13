import { connectToDatabase } from "./mongodb"

export async function initializeDatabase() {
  try {
    console.log("🚀 Initialisation de la base de données...")

    const { db, collections } = await connectToDatabase()

    // Vérifier si les données existent déjà
    const destinationsCount = await collections.destinations.countDocuments()

    if (destinationsCount === 0) {
      console.log("📊 Insertion des données initiales...")

      // Destinations par défaut
      const defaultDestinations = [
        {
          name: "Paris",
          country: "France",
          region: "Europe",
          description: "La ville lumière avec ses monuments emblématiques et sa riche histoire culturelle.",
          imageUrl: "/placeholder.svg?height=300&width=400",
          price: 850000,
          currency: "XOF",
          rating: 4.8,
          tagline: "Romance et culture",
          features: ["Tour Eiffel", "Musée du Louvre", "Champs-Élysées", "Gastronomie française"],
          isPopular: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dakar",
          country: "Sénégal",
          region: "Afrique de l'Ouest",
          description: "Capitale dynamique du Sénégal, mélange parfait de tradition et de modernité.",
          imageUrl: "/placeholder.svg?height=300&width=400",
          price: 250000,
          currency: "XOF",
          rating: 4.5,
          tagline: "Teranga et authenticité",
          features: ["Île de Gorée", "Marché Sandaga", "Monument de la Renaissance", "Plage de Yoff"],
          isPopular: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Abidjan",
          country: "Côte d'Ivoire",
          region: "Afrique de l'Ouest",
          description: "Perle des lagunes, centre économique dynamique de l'Afrique de l'Ouest.",
          imageUrl: "/placeholder.svg?height=300&width=400",
          price: 300000,
          currency: "XOF",
          rating: 4.3,
          tagline: "Perle des lagunes",
          features: ["Plateau", "Cocody", "Marché de Treichville", "Parc du Banco"],
          isPopular: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      await collections.destinations.insertMany(defaultDestinations)

      // Paramètres par défaut
      const defaultSettings = {
        siteName: "Voyage Explore",
        currency: "XOF",
        language: "fr",
        timezone: "Africa/Dakar",
        emailNotifications: true,
        maintenanceMode: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await collections.settings.insertOne(defaultSettings)

      console.log("✅ Données initiales insérées avec succès")
    } else {
      console.log("✅ Base de données déjà initialisée")
    }

    return true
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation:", error)
    return false
  }
}

export async function checkDatabaseHealth() {
  try {
    const { client, collections } = await connectToDatabase()

    // Test de ping
    await client.db("admin").command({ ping: 1 })

    // Vérifier les collections principales
    const stats = {
      destinations: await collections.destinations.countDocuments(),
      users: await collections.users.countDocuments(),
      bookings: await collections.bookings.countDocuments(),
      reviews: await collections.reviews.countDocuments(),
    }

    console.log("📊 Statistiques de la base de données:", stats)

    return {
      healthy: true,
      stats,
    }
  } catch (error) {
    console.error("❌ Problème de santé de la base de données:", error)
    return {
      healthy: false,
      error: error.message,
    }
  }
}
