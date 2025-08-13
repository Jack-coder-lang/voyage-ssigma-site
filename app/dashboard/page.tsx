"use client"; // Nécessaire pour useSession

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { SiteHeader } from "@/components/site-header";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { RecentBookings } from "@/components/dashboard/recent-bookings";
import { UpcomingTrips } from "@/components/dashboard/upcoming-trips";
import { PopularDestinations } from "@/components/dashboard/popular-destinations";
import { TravelMap } from "@/components/dashboard/travel-map";
import { TravelExpenses } from "@/components/dashboard/travel-expenses";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  if (!session) {
    router.push("/auth/login");
    return null;
  }

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/auth/login" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <SiteHeader />
      <div className="flex-1">
        <DashboardHeader />
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] px-4 md:px-6 py-6">
          <aside className="hidden md:block">
            <DashboardNav />
          </aside>
          <main className="flex flex-col gap-6">
            <OverviewStats />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <UpcomingTrips className="md:col-span-1 lg:col-span-3" />
              <RecentBookings className="md:col-span-1 lg:col-span-4" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <PopularDestinations className="md:col-span-1 lg:col-span-3" />
              <TravelMap className="md:col-span-1 lg:col-span-4" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <TravelExpenses className="md:col-span-1 lg:col-span-4" />
              <RecentActivity className="md:col-span-1 lg:col-span-3" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}