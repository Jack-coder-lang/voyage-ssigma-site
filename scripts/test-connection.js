import { MongoClient } from "mongodb"

const MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/voyage-explore"

async function testConnection() {
  console.log("🔍 Test de connexion à MongoDB...")

  const client = new MongoClient(MONGODB_URI)

  try {
    // Connexion
    await client.connect()
    console.log("✅ Connexion établie")

    // Test ping
    await client.db("admin").command({ ping: 1 })
    console.log("✅ Ping réussi")

    // Lister les bases de données
    const databases = await client.db().admin().listDatabases()
    console.log("📊 Bases de données disponibles:")
    databases.databases.forEach((db) => {
      console.log(`  - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`)
    })

    // Test de la base de données voyage-explore
    const db = client.db("voyage-explore")
    const collections = await db.listCollections().toArray()

    if (collections.length > 0) {
      console.log("📁 Collections dans voyage-explore:")
      for (const collection of collections) {
        const count = await db.collection(collection.name).countDocuments()
        console.log(`  - ${collection.name}: ${count} documents`)
      }
    } else {
      console.log("⚠️  Aucune collection trouvée dans voyage-explore")
    }

    console.log("🎉 Test de connexion terminé avec succès !")
  } catch (error) {
    console.error("❌ Erreur de connexion:", error.message)

    if (error.message.includes("authentication failed")) {
      console.log("💡 Vérifiez vos identifiants MongoDB")
    } else if (error.message.includes("network")) {
      console.log("💡 Vérifiez votre connexion internet et les paramètres réseau")
    }
  } finally {
    await client.close()
  }
}

testConnection()
