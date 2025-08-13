import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://username:password@cluster.mongodb.net/voyage-explore";
const DB_NAME = "voyage-explore";

async function setupDatabase() {
  console.log("🚀 Initialisation de la base de données...");

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("✅ Connexion à MongoDB réussie");

    const db = client.db(DB_NAME);

    // Créer les collections avec validation (si non géré par Prisma)
    await createCollections(db);

    // Créer les index pour optimiser les performances
    await createIndexes(db);

    // Insérer les données initiales
    await insertInitialData(db);

    console.log("🎉 Base de données configurée avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de la configuration:", error);
  } finally {
    await client.close();
  }
}

async function createCollections(db) {
  console.log("📁 Création des collections...");

  // Liste des collections à créer
  const collections = [
    "destinations",
    "users",
    "bookings",
    "reviews",
    "loyalty_transactions",
    "settings",
  ];

  for (const collection of collections) {
    await db.createCollection(collection);
    console.log(`✅ Collection ${collection} créée`);
  }
}

async function createIndexes(db) {
  console.log("🔍 Création des index...");

  // Index pour les destinations
  await db.collection("destinations").createIndexes([
    { key: { name: 1 } },
    { key: { country: 1 } },
    { key: { region: 1 } },
    { key: { price: 1 } },
    { key: { rating: -1 } },
    { key: { isPopular: 1 } },
    { key: { name: "text", description: "text" } },
  ]);

  // Index pour les utilisateurs
  await db.collection("users").createIndexes([
    { key: { email: 1 }, unique: true },
    { key: { role: 1 } },
  ]);

  // Index pour les réservations
  await db.collection("bookings").createIndexes([
    { key: { userId: 1 } },
    { key: { destinationId: 1 } },
    { key: { status: 1 } },
    { key: { createdAt: -1 } },
  ]);

  console.log("✅ Index créés");
}

async function insertInitialData(db) {
  console.log("📊 Insertion des données initiales...");

  // Destinations populaires
  const destinations = [
    {
      name: "Paris",
      country: "France",
      region: "Europe",
      description: "La ville lumière avec ses monuments emblématiques",
      imageUrl: "/placeholder.svg?height=300&width=400",
      price: 850000,
      currency: "XOF",
      rating: 4.8,
      tagline: "Romance et culture",
      features: ["Tour Eiffel", "Louvre", "Champs-Élysées", "Gastronomie"],
      isPopular: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Tokyo",
      country: "Japon",
      region: "Asie",
      description: "Métropole moderne mêlant tradition et innovation",
      imageUrl: "/placeholder.svg?height=300&width=400",
      price: 1200000,
      currency: "XOF",
      rating: 4.7,
      tagline: "Tradition et modernité",
      features: ["Temples", "Technologie", "Cuisine", "Culture pop"],
      isPopular: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Ajoute les autres destinations ici...
  ];

  await db.collection("destinations").insertMany(destinations);

  // Utilisateur administrateur par défaut
  const adminUser = {
    email: "admin@voyageexplore.com",
    name: "Administrateur",
    role: "admin",
    loyaltyPoints: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.collection("users").insertOne(adminUser);

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
  };

  await db.collection("settings").insertOne(defaultSettings);

  console.log("✅ Données initiales insérées");
}

// Exécuter la configuration
setupDatabase().catch(console.error);