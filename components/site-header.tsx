"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MapPin, Globe, Calculator, CloudSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Réservation", href: "/booking" },
  { name: "Contact", href: "/contact" },
];

const toolsMenu = [
  { name: "Convertisseur de devises", href: "/tools/currency-converter", icon: Calculator },
  { name: "Météo & Saisons", href: "/tools/weather-seasons", icon: CloudSun },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Voyage Ssigma Logo" className="h-12 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                  pathname === item.href ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300",
                )}
              >
                {item.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  Outils
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {toolsMenu.map((tool) => (
                  <DropdownMenuItem key={tool.name} asChild>
                    <Link href={tool.href} className="flex items-center gap-2">
                      <tool.icon className="h-4 w-4" />
                      {tool.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Inscription</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    Profil
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            )}
          </div>
          <MobileMenu links={navigation} />
        </div>
      </div>
    </header>
  );
}