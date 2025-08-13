"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, CalendarIcon } from "lucide-react"
import { fr } from "date-fns/locale"
import { exportLogsToCSV, getActivityLogs } from "@/lib/admin-logger"

export function ExportLogsDialog() {
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState("csv")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [includeDetails, setIncludeDetails] = useState(true)
  const [includeUserInfo, setIncludeUserInfo] = useState(true)
  const [includeSystemInfo, setIncludeSystemInfo] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    try {
      // Récupérer les journaux avec les filtres
      const { logs } = await getActivityLogs({
        startDate,
        endDate,
        limit: 1000, // Exporter jusqu'à 1000 entrées
      })

      // Générer le CSV
      const csvContent = exportLogsToCSV(logs)

      // Créer un blob et le télécharger
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `journal-activite-${new Date().toISOString().slice(0, 10)}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setOpen(false)
    } catch (error) {
      console.error("Erreur lors de l'export des journaux:", error)
    } finally {
      setExporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Exporter le journal d'activité</DialogTitle>
          <DialogDescription>Configurez les options d'exportation du journal d'activité.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Format</label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel" disabled>
                  Excel (Bientôt disponible)
                </SelectItem>
                <SelectItem value="pdf" disabled>
                  PDF (Bientôt disponible)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Période</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Date de début</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal mt-1" size="sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "P", { locale: fr }) : "Sélectionner"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Date de fin</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal mt-1" size="sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "P", { locale: fr }) : "Sélectionner"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Options</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-details"
                  checked={includeDetails}
                  onCheckedChange={(checked) => setIncludeDetails(checked as boolean)}
                />
                <label htmlFor="include-details" className="text-sm">
                  Inclure les détails complets
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-user-info"
                  checked={includeUserInfo}
                  onCheckedChange={(checked) => setIncludeUserInfo(checked as boolean)}
                />
                <label htmlFor="include-user-info" className="text-sm">
                  Inclure les informations utilisateur
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-system-info"
                  checked={includeSystemInfo}
                  onCheckedChange={(checked) => setIncludeSystemInfo(checked as boolean)}
                />
                <label htmlFor="include-system-info" className="text-sm">
                  Inclure les informations système (IP, navigateur)
                </label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleExport} disabled={exporting}>
            {exporting ? "Exportation en cours..." : "Exporter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
