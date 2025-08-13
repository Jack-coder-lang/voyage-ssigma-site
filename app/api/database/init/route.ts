import { NextResponse } from "next/server"
import { initializeDatabase } from "@/lib/database-setup"

export async function POST() {
  try {
    const success = await initializeDatabase()

    if (success) {
      return NextResponse.json({
        message: "Base de données initialisée avec succès",
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json(
        {
          message: "Échec de l'initialisation de la base de données",
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erreur lors de l'initialisation",
        error: error instanceof Error ? error.message : "Erreur inconnue",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
