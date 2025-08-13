"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getActivityLogs, type ActivityLog, type LogLevel, type LogAction, type LogResource } from "@/lib/admin-logger"

export function ActivityLogTable() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [loading, setLoading] = useState(true)
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null)

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true)
      try {
        const result = await getActivityLogs({ page, limit })
        setLogs(result.logs)
        setTotal(result.total)
      } catch (error) {
        console.error("Erreur lors du chargement des journaux d'activité:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [page, limit])

  const getActionLabel = (action: LogAction): string => {
    const labels: Record<LogAction, string> = {
      create: "Création",
      update: "Modification",
      delete: "Suppression",
      view: "Consultation",
      login: "Connexion",
      logout: "Déconnexion",
      export: "Export",
      import: "Import",
      permission_change: "Changement de permission",
      settings_change: "Changement de paramètres",
      other: "Autre",
    }
    return labels[action] || action
  }

  const getResourceLabel = (resource: LogResource): string => {
    const labels: Record<LogResource, string> = {
      user: "Utilisateur",
      destination: "Destination",
      booking: "Réservation",
      payment: "Paiement",
      content: "Contenu",
      role: "Rôle",
      setting: "Paramètre",
      loyalty: "Fidélité",
      message: "Message",
      system: "Système",
    }
    return labels[resource] || resource
  }

  const getLevelVariant = (level: LogLevel): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<LogLevel, "default" | "secondary" | "destructive" | "outline"> = {
      info: "default",
      warning: "secondary",
      error: "destructive",
      critical: "destructive",
    }
    return variants[level] || "outline"
  }

  const getActionVariant = (action: LogAction): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<LogAction, "default" | "secondary" | "destructive" | "outline"> = {
      create: "default",
      update: "secondary",
      delete: "destructive",
      view: "outline",
      login: "outline",
      logout: "outline",
      export: "outline",
      import: "outline",
      permission_change: "secondary",
      settings_change: "secondary",
      other: "outline",
    }
    return variants[action] || "outline"
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Ressource</TableHead>
              <TableHead>Détails</TableHead>
              <TableHead>Niveau</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  Chargement des journaux d'activité...
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  Aucun journal d'activité trouvé.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>{format(new Date(log.timestamp), "dd/MM/yyyy", { locale: fr })}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(log.timestamp), "HH:mm:ss", { locale: fr })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{log.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{log.userName}</p>
                        <p className="text-xs text-muted-foreground">{log.userRole}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getActionVariant(log.action)}>{getActionLabel(log.action)}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{getResourceLabel(log.resource)}</span>
                      {log.resourceId && <span className="text-xs text-muted-foreground">#{log.resourceId}</span>}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                  <TableCell>
                    <Badge variant={getLevelVariant(log.level)}>
                      {log.level === "info" && "Information"}
                      {log.level === "warning" && "Avertissement"}
                      {log.level === "error" && "Erreur"}
                      {log.level === "critical" && "Critique"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedLog(log)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Voir les détails</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Détails de l'activité</DialogTitle>
                          <DialogDescription>Informations complètes sur cette action</DialogDescription>
                        </DialogHeader>
                        {selectedLog && (
                          <div className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Date et heure</h3>
                                <p>{format(new Date(selectedLog.timestamp), "PPPp", { locale: fr })}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">ID de l'activité</h3>
                                <p>{selectedLog.id}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Utilisateur</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {selectedLog.userName.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p>{selectedLog.userName}</p>
                                    <p className="text-xs text-muted-foreground">{selectedLog.userRole}</p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Adresse IP</h3>
                                <p>{selectedLog.ipAddress}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Action</h3>
                                <Badge variant={getActionVariant(selectedLog.action)} className="mt-1">
                                  {getActionLabel(selectedLog.action)}
                                </Badge>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Ressource</h3>
                                <p>
                                  {getResourceLabel(selectedLog.resource)}
                                  {selectedLog.resourceId && ` #${selectedLog.resourceId}`}
                                </p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Niveau</h3>
                                <Badge variant={getLevelVariant(selectedLog.level)} className="mt-1">
                                  {selectedLog.level === "info" && "Information"}
                                  {selectedLog.level === "warning" && "Avertissement"}
                                  {selectedLog.level === "error" && "Erreur"}
                                  {selectedLog.level === "critical" && "Critique"}
                                </Badge>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Navigateur</h3>
                                <p className="text-sm">{selectedLog.userAgent || "Non disponible"}</p>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Détails</h3>
                              <p className="mt-1">{selectedLog.details}</p>
                            </div>

                            {(selectedLog.before || selectedLog.after) && (
                              <div className="grid grid-cols-2 gap-4 mt-4">
                                {selectedLog.before && (
                                  <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Avant</h3>
                                    <pre className="mt-1 p-2 bg-muted rounded-md text-xs overflow-auto max-h-40">
                                      {JSON.stringify(selectedLog.before, null, 2)}
                                    </pre>
                                  </div>
                                )}
                                {selectedLog.after && (
                                  <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Après</h3>
                                    <pre className="mt-1 p-2 bg-muted rounded-md text-xs overflow-auto max-h-40">
                                      {JSON.stringify(selectedLog.after, null, 2)}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Affichage de {logs.length} entrées sur {total} au total
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setPage(page - 1)} disabled={page === 1 || loading}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Page précédente</span>
          </Button>
          <p className="text-sm">
            Page {page} sur {totalPages || 1}
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages || loading}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Page suivante</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
