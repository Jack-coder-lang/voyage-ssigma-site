"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"

export function RolesPermissionsTable() {
  // Données fictives pour les rôles et permissions
  const roles = [
    {
      id: "1",
      name: "Super Admin",
      description: "Accès complet à toutes les fonctionnalités",
      userCount: 2,
      editable: false,
    },
    {
      id: "2",
      name: "Admin",
      description: "Accès à la plupart des fonctionnalités administratives",
      userCount: 3,
      editable: true,
    },
    {
      id: "3",
      name: "Éditeur",
      description: "Peut gérer le contenu et les destinations",
      userCount: 5,
      editable: true,
    },
    {
      id: "4",
      name: "Support",
      description: "Peut gérer les réservations et les messages",
      userCount: 8,
      editable: true,
    },
    {
      id: "5",
      name: "Utilisateur",
      description: "Accès limité au tableau de bord client",
      userCount: 1230,
      editable: false,
    },
  ]

  const permissions = [
    { id: "1", name: "Tableau de bord", description: "Accès au tableau de bord" },
    { id: "2", name: "Utilisateurs", description: "Gestion des utilisateurs" },
    { id: "3", name: "Destinations", description: "Gestion des destinations" },
    { id: "4", name: "Réservations", description: "Gestion des réservations" },
    { id: "5", name: "Paiements", description: "Gestion des paiements" },
    { id: "6", name: "Contenu", description: "Gestion du contenu du site" },
    { id: "7", name: "Messages", description: "Gestion des messages" },
    { id: "8", name: "Analytiques", description: "Accès aux analytiques" },
    { id: "9", name: "Rôles", description: "Gestion des rôles et permissions" },
    { id: "10", name: "Paramètres", description: "Gestion des paramètres du site" },
  ]

  // Matrice de permissions (rôle x permission)
  const permissionMatrix = {
    "1": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // Super Admin - tout
    "2": ["1", "2", "3", "4", "5", "6", "7", "8", "10"], // Admin - tout sauf rôles
    "3": ["1", "3", "6", "8"], // Éditeur - tableau de bord, destinations, contenu, analytiques
    "4": ["1", "4", "7", "8"], // Support - tableau de bord, réservations, messages, analytiques
    "5": ["1"], // Utilisateur - seulement tableau de bord
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rôles</CardTitle>
          <CardDescription>Gérez les différents rôles d'utilisateurs et leurs permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du rôle</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Utilisateurs</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">
                    {role.name}
                    {!role.editable && (
                      <Badge variant="outline" className="ml-2">
                        Par défaut
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{role.userCount}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" disabled={!role.editable}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Modifier</span>
                    </Button>
                    <Button variant="ghost" size="icon" disabled={!role.editable}>
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Matrice de permissions</CardTitle>
          <CardDescription>Définissez les permissions pour chaque rôle.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission</TableHead>
                  {roles.map((role) => (
                    <TableHead key={role.id}>{role.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{permission.name}</p>
                        <p className="text-sm text-muted-foreground">{permission.description}</p>
                      </div>
                    </TableCell>
                    {roles.map((role) => (
                      <TableCell key={role.id}>
                        <Checkbox
                          checked={permissionMatrix[role.id].includes(permission.id)}
                          disabled={!role.editable}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-end">
            <Button>Enregistrer les modifications</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
