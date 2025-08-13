import { UsersTable } from "@/components/admin/users-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>

      <UsersTable />
    </div>
  )
}
