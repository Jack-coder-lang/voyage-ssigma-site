"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, Edit, Trash, Shield, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UsersTable() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("all")

  // Données fictives pour les utilisateurs
  const users = [
    {
      id: "1",
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      status: "active",
      lastLogin: "Il y a 2 heures",
    },
    {
      id: "2",
      name: "Thomas Dubois",
      email: "thomas.dubois@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "admin",
      status: "active",
      lastLogin: "Il y a 3 heures",
    },
    {
      id: "3",
      name: "Emma Petit",
      email: "emma.petit@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      status: "inactive",
      lastLogin: "Il y a 5 jours",
    },
    {
      id: "4",
      name: "Lucas Bernard",
      email: "lucas.bernard@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "editor",
      status: "active",
      lastLogin: "Il y a 1 jour",
    },
    {
      id: "5",
      name: "Chloé Moreau",
      email: "chloe.moreau@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      status: "pending",
      lastLogin: "Jamais",
    },
    {
      id: "6",
      name: "Antoine Lefevre",
      email: "antoine.lefevre@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      status: "active",
      lastLogin: "Il y a 4 heures",
    },
    {
      id: "7",
      name: "Julie Rousseau",
      email: "julie.rousseau@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "editor",
      status: "active",
      lastLogin: "Il y a 6 heures",
    },
    {
      id: "8",
      name: "Nicolas Fournier",
      email: "nicolas.fournier@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      status: "inactive",
      lastLogin: "Il y a 2 semaines",
    },
    {
      id: "9",
      name: "Camille Girard",
      email: "camille.girard@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      status: "active",
      lastLogin: "Il y a 1 jour",
    },
    {
      id: "10",
      name: "Maxime Dupont",
      email: "maxime.dupont@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "admin",
      status: "active",
      lastLogin: "Il y a 12 heures",
    },
  ]

  // Filtrer les utilisateurs en fonction de la recherche et du rôle
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      search === "" ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())

    const matchesRole = role === "all" || user.role === role

    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="w-full pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filtrer par rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les rôles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Éditeur</SelectItem>
            <SelectItem value="user">Utilisateur</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière connexion</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : user.role === "editor" ? "secondary" : "outline"}>
                    {user.role === "admin" ? "Admin" : user.role === "editor" ? "Éditeur" : "Utilisateur"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active" ? "success" : user.status === "inactive" ? "secondary" : "outline"
                    }
                  >
                    {user.status === "active" ? "Actif" : user.status === "inactive" ? "Inactif" : "En attente"}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir le profil
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        Changer le rôle
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Affichage de {filteredUsers.length} utilisateurs sur {users.length} au total
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setPage(page - 1)} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Page précédente</span>
          </Button>
          <Button variant="outline" size="icon" onClick={() => setPage(page + 1)} disabled={page === 1}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Page suivante</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
