import { connectToDatabase, type Destination } from "../mongodb"
import { ObjectId } from "mongodb"

export async function getAllDestinationsFromDb(): Promise<Destination[]> {
  try {
    const { collections } = await connectToDatabase()
    return await collections.destinations.find({}).toArray()
  } catch (error) {
    console.error("Erreur lors de la récupération des destinations:", error)
    return []
  }
}

export async function getDestinationByIdFromDb(id: string): Promise<Destination | null> {
  try {
    const { collections } = await connectToDatabase()
    return await collections.destinations.findOne({ _id: new ObjectId(id) })
  } catch (error) {
    console.error(`Erreur lors de la récupération de la destination ${id}:`, error)
    return null
  }
}

export async function getDestinationsByRegionFromDb(region: string): Promise<Destination[]> {
  try {
    const { collections } = await connectToDatabase()
    return await collections.destinations.find({ region }).toArray()
  } catch (error) {
    console.error(`Erreur lors de la récupération des destinations de la région ${region}:`, error)
    return []
  }
}

export async function createDestination(
  destination: Omit<Destination, "id" | "createdAt" | "updatedAt">,
): Promise<Destination | null> {
  try {
    const { collections } = await connectToDatabase()

    const now = new Date()
    const newDestination = {
      ...destination,
      createdAt: now,
      updatedAt: now,
    }

    const result = await collections.destinations.insertOne(newDestination as any)

    if (result.insertedId) {
      return {
        id: result.insertedId.toString(),
        ...newDestination,
      }
    }

    return null
  } catch (error) {
    console.error("Erreur lors de la création de la destination:", error)
    return null
  }
}

export async function updateDestination(id: string, updates: Partial<Destination>): Promise<boolean> {
  try {
    const { collections } = await connectToDatabase()

    const result = await collections.destinations.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la destination ${id}:`, error)
    return false
  }
}

export async function deleteDestination(id: string): Promise<boolean> {
  try {
    const { collections } = await connectToDatabase()

    const result = await collections.destinations.deleteOne({ _id: new ObjectId(id) })

    return result.deletedCount > 0
  } catch (error) {
    console.error(`Erreur lors de la suppression de la destination ${id}:`, error)
    return false
  }
}
