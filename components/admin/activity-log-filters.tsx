"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { LogAction, LogResource, LogLevel } from "@/lib/admin-logger"

export function ActivityLogFilters() {
  const [search, setSearch] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [action, setAction] = useState<LogAction | "">("")
  const [resource, setResource] = useState<LogResource | "">("")
  const [level, setLevel] = useState<LogLevel | "">("")
  const [showFilters, setShowFilters] = useState(false)

  const resetFilters = () => {
    setSearch("")
    setStartDate(undefined)
    setEndDate(undefined)
    setAction("")
    setResource("")
    setLevel("")
  }

  const hasActiveFilters = search || startDate || endDate || action || resource || level

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher dans les journaux..."
            className="w-full pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant={showFilters ? "default" : "outline"} onClick={() => setShowFilters(!showFilters)}>
            <Filter className="mr-2 h-4 w-4" />
            Filtres
            {hasActiveFilters && (
              <span className="ml-1 rounded-full bg-primary-foreground text-primary w-5 h-5 text-xs flex items-center justify-center">
                {Object.values({ startDate, endDate, action, resource, level }).filter(Boolean).length +
                  (search ? 1 : 0)}
              </span>
            )}
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={resetFilters}>
              <X className="mr-2 h-4 w-4" />
              Réinitialiser
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date de début</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP", { locale: fr }) : "Sélectionner"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date de fin</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP", { locale: fr }) : "Sélectionner"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Action</label>
                <Select value={action} onValueChange={(value) => setAction(value as LogAction)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les actions</SelectItem>
                    <SelectItem value="create">Création</SelectItem>
                    <SelectItem value="update">Modification</SelectItem>
                    <SelectItem value="delete">Suppression</SelectItem>
                    <SelectItem value="view">Consultation</SelectItem>
                    <SelectItem value="login">Connexion</SelectItem>
                    <SelectItem value="logout">Déconnexion</SelectItem>
                    <SelectItem value="permission_change">Changement de permission</SelectItem>
                    <SelectItem value="settings_change">Changement de paramètres</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ressource</label>
                <Select value={resource} onValueChange={(value) => setResource(value as LogResource)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les ressources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les ressources</SelectItem>
                    <SelectItem value="user">Utilisateur</SelectItem>
                    <SelectItem value="destination">Destination</SelectItem>
                    <SelectItem value="booking">Réservation</SelectItem>
                    <SelectItem value="payment">Paiement</SelectItem>
                    <SelectItem value="content">Contenu</SelectItem>
                    <SelectItem value="role">Rôle</SelectItem>
                    <SelectItem value="setting">Paramètre</SelectItem>
                    <SelectItem value="system">Système</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Niveau</label>
                <Select value={level} onValueChange={(value) => setLevel(value as LogLevel)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les niveaux" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les niveaux</SelectItem>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="warning">Avertissement</SelectItem>
                    <SelectItem value="error">Erreur</SelectItem>
                    <SelectItem value="critical">Critique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
