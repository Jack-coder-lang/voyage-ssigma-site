import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RecentUsersProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentUsers({ className, ...props }: RecentUsersProps) {
  // Données fictives pour les utilisateurs récents
  const recentUsers = [
    {
      id: "1",
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "active",
      joined: "Il y a 2 heures",
    },
    {
      id: "2",
      name: "Thomas Dubois",
      email: "thomas.dubois@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "active",
      joined: "Il y a 3 heures",
    },
    {
      id: "3",
      name: "Emma Petit",
      email: "emma.petit@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "inactive",
      joined: "Il y a 5 heures",
    },
    {
      id: "4",
      name: "Lucas Bernard",
      email: "lucas.bernard@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "active",
      joined: "Il y a 1 jour",
    },
    {
      id: "5",
      name: "Chloé Moreau",
      email: "chloe.moreau@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "pending",
      joined: "Il y a 1 jour",
    },
  ]

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Utilisateurs récents</CardTitle>
        <CardDescription>{recentUsers.length} nouveaux utilisateurs ont rejoint récemment.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={user.status === "active" ? "default" : user.status === "inactive" ? "secondary" : "outline"}
                >
                  {user.status === "active" ? "Actif" : user.status === "inactive" ? "Inactif" : "En attente"}
                </Badge>
                <span className="text-xs text-muted-foreground">{user.joined}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
