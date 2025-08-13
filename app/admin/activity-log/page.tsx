import { ActivityLogTable } from "@/components/admin/activity-log-table"
import { ActivityLogFilters } from "@/components/admin/activity-log-filters"
import { ExportLogsDialog } from "@/components/admin/export-logs-dialog"

export default function ActivityLogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Journal d'activité administrateur</h1>
        <ExportLogsDialog />
      </div>

      <p className="text-muted-foreground">
        Consultez toutes les actions effectuées par les administrateurs du site. Ce journal enregistre qui a fait quoi,
        quand et comment.
      </p>

      <ActivityLogFilters />

      <ActivityLogTable />
    </div>
  )
}
