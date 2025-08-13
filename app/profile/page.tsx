"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Rediriger si l'utilisateur n'est pas authentifié
  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  if (!session) {
    router.push("/auth/login");
    return null;
  }

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleEditProfile = () => {
    // Logique pour rediriger vers une page d'édition de profil (à implémenter si nécessaire)
    router.push("/profile/edit");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <SiteHeader />
      <div className="container py-6 px-4 md:px-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Mon Profil</CardTitle>
            <CardDescription>Gérez vos informations personnelles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {session.user && (
              <>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Informations</h3>
                  <p>
                    <strong>Nom :</strong> {session.user.name || "Non spécifié"}
                  </p>
                  <p>
                    <strong>Email :</strong> {session.user.email || "Non spécifié"}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button onClick={handleEditProfile}>Modifier le profil</Button>
                  <Button variant="outline" onClick={handleLogout}>
                    Déconnexion
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}