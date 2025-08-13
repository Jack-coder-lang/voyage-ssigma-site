"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function DatabaseSettingsForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [testStatus, setTestStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    connectionString: "mongodb+srv://username:password@cluster.mongodb.net/voyage-explore",
    databaseName: "voyage-explore",
    useSSL: true,
    connectionTimeout: "30000",
    maxPoolSize: "10",
    authSource: "admin",
    replicaSet: "",
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTestConnection = async () => {
    setIsLoading(true)
    setTestStatus("idle")

    // Simuler un test de connexion
    setTimeout(() => {
      setIsLoading(false)
      setTestStatus("success")
      // Pour simuler une erreur, utilisez: setTestStatus('error')
    }, 2000)
  }

  const handleSave = async () => {
    setIsLoading(true)

    // Simuler une sauvegarde
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="connectionString">Chaîne de connexion MongoDB</Label>
          <Input
            id="connectionString"
            value={formData.connectionString}
            onChange={(e) => handleChange("connectionString", e.target.value)}
            placeholder="mongodb+srv://username:password@cluster.mongodb.net/database"
          />
          <p className="text-sm text-muted-foreground">
            Format: mongodb+srv://username:password@cluster.mongodb.net/database
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="databaseName">Nom de la base de données</Label>
          <Input
            id="databaseName"
            value={formData.databaseName}
            onChange={(e) => handleChange("databaseName", e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="useSSL"
            checked={formData.useSSL}
            onCheckedChange={(checked) => handleChange("useSSL", checked)}
          />
          <Label htmlFor="useSSL">Utiliser SSL</Label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="connectionTimeout">Timeout de connexion (ms)</Label>
            <Input
              id="connectionTimeout"
              value={formData.connectionTimeout}
              onChange={(e) => handleChange("connectionTimeout", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="maxPoolSize">Taille max du pool</Label>
            <Input
              id="maxPoolSize"
              value={formData.maxPoolSize}
              onChange={(e) => handleChange("maxPoolSize", e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="authSource">Source d'authentification</Label>
          <Select value={formData.authSource} onValueChange={(value) => handleChange("authSource", value)}>
            <SelectTrigger id="authSource">
              <SelectValue placeholder="Sélectionner une source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">admin</SelectItem>
              <SelectItem value="users">users</SelectItem>
              <SelectItem value="custom">custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="replicaSet">Replica Set (optionnel)</Label>
          <Input
            id="replicaSet"
            value={formData.replicaSet}
            onChange={(e) => handleChange("replicaSet", e.target.value)}
            placeholder="rs0"
          />
        </div>
      </div>

      {testStatus === "success" && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>Connexion à MongoDB réussie !</AlertDescription>
        </Alert>
      )}

      {testStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Échec de la connexion. Vérifiez vos paramètres et réessayez.</AlertDescription>
        </Alert>
      )}

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={handleTestConnection} disabled={isLoading}>
          {isLoading && testStatus === "idle" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Test en cours...
            </>
          ) : (
            "Tester la connexion"
          )}
        </Button>

        <Button type="button" onClick={handleSave} disabled={isLoading}>
          {isLoading && testStatus !== "idle" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            "Enregistrer les paramètres"
          )}
        </Button>
      </div>
    </form>
  )
}
