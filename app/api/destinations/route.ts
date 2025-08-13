import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { collections } = await connectToDatabase()
    const { searchParams } = new URL(request.url)

    const region = searchParams.get("region")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const sort = searchParams.get("sort") || "name"

    // Construire le filtre
    const filter: any = {}
    if (region && region !== "all") {
      filter.region = region
    }

    // Construire les options de tri
    const sortOptions: any = {}
    switch (sort) {
      case "price-asc":
        sortOptions.price = 1
        break
      case "price-desc":
        sortOptions.price = -1
        break
      case "rating":
        sortOptions.rating = -1
        break
      case "popular":
        sortOptions.isPopular = -1
        break
      default:
        sortOptions.name = 1
    }

    const skip = (page - 1) * limit

    const destinations = await collections.destinations.find(filter).sort(sortOptions).skip(skip).limit(limit).toArray()

    const total = await collections.destinations.countDocuments(filter)

    return NextResponse.json({
      destinations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des destinations:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { collections } = await connectToDatabase()
    const data = await request.json()

    const destination = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collections.destinations.insertOne(destination)

    return NextResponse.json(
      {
        success: true,
        id: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erreur lors de la création de la destination:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
