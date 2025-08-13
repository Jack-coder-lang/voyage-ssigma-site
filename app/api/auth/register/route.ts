import { NextResponse } from "next/server";
import { hash } from "bcryptjs"; // Pour hacher le mot de passe
import { prisma } from "@/lib/prisma"; // Remplacez par votre client Prisma ou autre ORM

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, password } = await request.json();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Cet email est déjà utilisé" }, { status: 400 });
    }

    // Hacher le mot de passe
    const hashedPassword = await hash(password, 12);

    // Créer un nouvel utilisateur
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: "user",
      },
    });

    return NextResponse.json({ message: "Inscription réussie", user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur lors de l'inscription" }, { status: 500 });
  }
}