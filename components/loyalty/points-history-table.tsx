"use client"

import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { TrendingUp, Gift, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PointsTransaction {
  id: string
  date: string
  description: string
  points: number
  type: "earned" | "redeemed"
}

interface PointsHistoryTableProps {
  transactions: PointsTransaction[]
}

export function PointsHistoryTable({ transactions }: PointsHistoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "date", desc: true }])
  const [filtering, setFiltering] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  // Définir les colonnes
  const columns: ColumnDef<PointsTransaction>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <div
            className={`p-1.5 rounded-full ${
              row.original.type === "earned"
                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
            }`}
          >
            {row.original.type === "earned" ? <TrendingUp className="h-3.5 w-3.5" /> : <Gift className="h-3.5 w-3.5" />}
          </div>
          <span>{row.getValue("description")}</span>
        </div>
      ),
    },
    {
      accessorKey: "points",
      header: () => <div className="text-right">Points</div>,
      cell: ({ row }) => (
        <div
          className={`text-right font-medium ${
            row.original.type === "earned" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"
          }`}
        >
          {row.original.type === "earned" ? "+" : "-"}
          {row.getValue("points")}
        </div>
      ),
    },
  ]

  // Filtrer les transactions
  const filteredData = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(filtering.toLowerCase())
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    return matchesSearch && matchesType
  })

  // Initialiser la table
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Input
          placeholder="Rechercher..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="max-w-sm"
        />
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type de transaction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="earned">Points gagnés</SelectItem>
            <SelectItem value="redeemed">Points échangés</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center ${header.column.id === "points" ? "justify-end" : ""}`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && (
                          <ChevronDown
                            className={`ml-1 h-4 w-4 ${header.column.getIsSorted() === "desc" ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucune transaction trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Affichage de {table.getRowModel().rows.length} sur {filteredData.length} transactions
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}
