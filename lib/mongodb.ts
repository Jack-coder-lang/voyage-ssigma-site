import { MongoClient, type Db, type Collection } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Veuillez ajouter votre URI MongoDB à .env.local")
}

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || "voyage-explore"

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // En développement, utiliser une variable globale pour préserver la valeur
  // à travers les rechargements de module causés par HMR (Hot Module Replacement)
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // En production, il est préférable de ne pas utiliser de variable globale
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export interface DatabaseCollections {
  destinations: Collection
  users: Collection
  bookings: Collection
  reviews: Collection
  loyaltyTransactions: Collection
  settings: Collection
}

export async function connectToDatabase(): Promise<{
  client: MongoClient
  db: Db
  collections: DatabaseCollections
}> {
  try {
    const client = await clientPromise
    const db = client.db(dbName)

    const collections: DatabaseCollections = {
      destinations: db.collection("destinations"),
      users: db.collection("users"),
      bookings: db.collection("bookings"),
      reviews: db.collection("reviews"),
      loyaltyTransactions: db.collection("loyalty_transactions"),
      settings: db.collection("settings"),
    }

    return { client, db, collections }
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error)
    throw error
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    const { client } = await connectToDatabase()
    await client.db("admin").command({ ping: 1 })
    console.log("✅ Connexion MongoDB réussie")
    return true
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB:", error)
    return false
  }
}

export default clientPromise
