"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LogoutPage() {
  signOut({ redirect: false }).then(() => {
    redirect("/auth/login"); // Redirige vers la page de connexion après déconnexion
  });
  return null; // Pas de rendu, juste une redirection
}