import { NextResponse } from "next/server"
import { checkDatabaseHealth } from "@/lib/database-setup"

export async function GET() {
  try {
    const health = await checkDatabaseHealth()

    if (health.healthy) {
      return NextResponse.json({
        status: "healthy",
        message: "Base de données opérationnelle",
        stats: health.stats,
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json(
        {
          status: "unhealthy",
          message: "Problème avec la base de données",
          error: health.error,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erreur lors de la vérification",
        error: error instanceof Error ? error.message : "Erreur inconnue",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
