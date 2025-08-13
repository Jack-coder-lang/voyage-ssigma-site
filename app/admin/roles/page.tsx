import { RolesPermissionsTable } from "@/components/admin/roles-permissions-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Rôles et permissions</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Créer un nouveau rôle
        </Button>
      </div>

      <RolesPermissionsTable />
    </div>
  )
}
