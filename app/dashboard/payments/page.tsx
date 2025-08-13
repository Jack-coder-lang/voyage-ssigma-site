import { SiteHeader } from "@/components/site-header"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { PaymentMethods } from "@/components/dashboard/payment-methods"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function PaymentsPage() {
  // Fonction pour formater le prix en XOF
  const formatPrice = (price: string) => {
    // Convertir le prix de EUR à XOF (1 EUR ≈ 655.957 XOF)
    const eurValue = Number.parseInt(price.replace(/[^\d]/g, ""))
    const xofValue = Math.round(eurValue * 655.957)

    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(xofValue)
  }

  // Données simulées pour l'historique des paiements
  const paymentHistory = [
    {
      id: "INV-001",
      date: "15 mai 2023",
      amount: "1250 €",
      method: "Visa ****4242",
      status: "completed",
      description: "Réservation Paris - 15-22 juin 2023",
    },
    {
      id: "INV-002",
      date: "20 avril 2023",
      amount: "450 €",
      method: "Orange Money",
      status: "completed",
      description: "Acompte Rome - 3-10 août 2023",
    },
    {
      id: "INV-003",
      date: "10 avril 2023",
      amount: "1030 €",
      method: "Mastercard ****5555",
      status: "refunded",
      description: "Réservation annulée - Barcelone",
    },
    {
      id: "INV-004",
      date: "5 mars 2023",
      amount: "2350 €",
      method: "Wave",
      status: "pending",
      description: "Réservation Bali - 12-26 septembre 2023",
    },
    {
      id: "INV-005",
      date: "15 février 2023",
      amount: "1890 €",
      method: "Visa ****4242",
      status: "failed",
      description: "Échec de paiement - New York",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <SiteHeader />
      <div className="flex-1">
        <DashboardHeader />
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] px-4 md:px-6 py-6">
          <aside className="hidden md:block">
            <DashboardNav />
          </aside>
          <main className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold tracking-tight">Paiements</h1>
            <div className="grid gap-6">
              <PaymentMethods />

              <Card>
                <CardHeader>
                  <CardTitle>Historique des paiements</CardTitle>
                  <CardDescription>Consultez l'historique de vos transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Référence</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Méthode</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{formatPrice(payment.amount)}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                payment.status === "completed"
                                  ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                                  : payment.status === "pending"
                                    ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                                    : payment.status === "refunded"
                                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                      : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                              }
                            >
                              {payment.status === "completed"
                                ? "Payé"
                                : payment.status === "pending"
                                  ? "En attente"
                                  : payment.status === "refunded"
                                    ? "Remboursé"
                                    : "Échoué"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
