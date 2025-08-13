import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { ProfileTabs } from "@/components/profile/profile-tabs"

export const metadata: Metadata = {
  title: "Profil Utilisateur | VoyageExplore",
  description: "Gérez vos informations personnelles, préférences de voyage et paramètres de sécurité.",
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <SiteHeader />
      <div className="flex-1">
        <DashboardHeader />
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] px-4 md:px-6 py-6">
          <aside className="hidden md:block">
            <DashboardNav />
          </aside>
          <main className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Mon Profil</h2>
              <p className="text-muted-foreground">Gérez vos informations personnelles et vos préférences.</p>
            </div>
            <ProfileTabs />
          </main>
        </div>
      </div>
    </div>
  )
}
