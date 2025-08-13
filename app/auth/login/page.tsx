"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedSection } from "@/components/ui/animated-section";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session && window.location.pathname === "/") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      // Attendre que la session soit mise à jour avant de rediriger
      setTimeout(() => router.push("/dashboard"), 100);
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/placeholder.svg?height=1080&width=1080"
          alt="Image de voyage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-sm"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <AnimatedSection direction="left">
            <h1 className="text-4xl font-bold mb-6">Bienvenue sur VoyageExplore</h1>
            <p className="text-xl max-w-md text-center">
              Connectez-vous pour accéder à votre espace personnel et gérer vos réservations de voyage.
            </p>
          </AnimatedSection>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <AnimatedSection direction="right" className="w-full max-w-md">
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
              <CardDescription className="text-center">
                Entrez vos identifiants pour accéder à votre compte
              </CardDescription>
            </CardHeader>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Téléphone</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm dark:bg-red-900/30 dark:text-red-300">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="nom@exemple.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Link
                          href="/auth/reset-password"
                          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          Mot de passe oublié?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                          </span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm font-normal">
                        Se souvenir de moi
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Connexion en cours...
                        </>
                      ) : (
                        "Se connecter"
                      )}
                    </Button>
                    <div className="mt-4 text-center text-sm">
                      Vous n'avez pas de compte?{" "}
                      <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                        S'inscrire
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
              <TabsContent value="phone">
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+225 XX XX XX XX XX" />
                  </div>
                  <Button className="w-full">Recevoir un code</Button>
                </CardContent>
              </TabsContent>
            </Tabs>
            <div className="px-8 pb-8">
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                    Ou continuer avec
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleGoogleLogin}>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M9.1 2.9c-1.1.1-2.2.6-3 1.3-.7.7-1.2 1.5-1.4 2.5-.1.3-.1.9-.1 1.2 0 .9.2 1.7.5 2.4.3.7.8 1.3 1.4 1.8.6.5 1.3.9 2.1 1 .3 0 .9 0 1.2-.1.9-.2 1.7-.7 2.4-1.4.3-.3.6-.7.8-1.1.1-.1.1-.2.1-.2s0 0-.7-.3l-.7-.4-.3.4c-.5.7-1.1 1.1-1.9 1.1-1.5 0-2.8-1.4-2.8-3.2 0-.3 0-.6.1-.9.3-1.5 1.4-2.6 2.7-2.6.6 0 1.2.2 1.6.5.2.1.5.4.7.7l.3.4.7-.4c.4-.2.7-.4.7-.4 0 0 0-.1-.1-.2-.4-.7-1.1-1.3-1.9-1.7-.5-.3-1.2-.4-1.8-.4h-.6z"
                      fill="#1877F2"
                    />
                    <path
                      d="M20.5 2H3.5C2.7 2 2 2.7 2 3.5v17c0 .8.7 1.5 1.5 1.5h9.5v-7.4h-2.6v-3h2.6V9.3c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2 .1 2.3.1v2.7h-1.6c-1.2 0-1.4.6-1.4 1.4v1.9h2.9l-.4 3h-2.5V22h4.9c.8 0 1.5-.7 1.5-1.5v-17c0-.8-.7-1.5-1.5-1.5z"
                      fill="#1877F2"
                    />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </Card>
        </AnimatedSection>
      </div>  
    </div>
  );
}