import { type NextRequest, NextResponse } from "next/server"
import { getDestinationByIdFromDb, updateDestination, deleteDestination } from "@/lib/services/destination-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const destination = await getDestinationByIdFromDb(params.id)

    if (!destination) {
      return NextResponse.json({ error: "Destination non trouvée" }, { status: 404 })
    }

    return NextResponse.json(destination)
  } catch (error) {
    console.error(`Erreur lors de la récupération de la destination ${params.id}:`, error)
    return NextResponse.json({ error: "Erreur lors de la récupération de la destination" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const success = await updateDestination(params.id, data)

    if (!success) {
      return NextResponse.json({ error: "Destination non trouvée ou erreur lors de la mise à jour" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la destination ${params.id}:`, error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour de la destination" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteDestination(params.id)

    if (!success) {
      return NextResponse.json({ error: "Destination non trouvée ou erreur lors de la suppression" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Erreur lors de la suppression de la destination ${params.id}:`, error)
    return NextResponse.json({ error: "Erreur lors de la suppression de la destination" }, { status: 500 })
  }
}
