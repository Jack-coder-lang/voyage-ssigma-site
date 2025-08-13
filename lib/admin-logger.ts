// Types pour le journal d'activité
export type LogLevel = "info" | "warning" | "error" | "critical"
export type LogAction =
  | "create"
  | "update"
  | "delete"
  | "view"
  | "login"
  | "logout"
  | "export"
  | "import"
  | "permission_change"
  | "settings_change"
  | "other"

export type LogResource =
  | "user"
  | "destination"
  | "booking"
  | "payment"
  | "content"
  | "role"
  | "setting"
  | "loyalty"
  | "message"
  | "system"

export interface ActivityLog {
  id: string
  timestamp: Date
  userId: string
  userName: string
  userRole: string
  ipAddress: string
  action: LogAction
  resource: LogResource
  resourceId?: string
  details: string
  level: LogLevel
  userAgent?: string
  before?: any
  after?: any
}

// Fonction pour créer un nouvel enregistrement de journal
export async function logAdminActivity(
  userId: string,
  userName: string,
  userRole: string,
  action: LogAction,
  resource: LogResource,
  details: string,
  level: LogLevel = "info",
  resourceId?: string,
  before?: any,
  after?: any,
  ipAddress = "0.0.0.0",
  userAgent?: string,
): Promise<ActivityLog> {
  // Dans une application réelle, cette fonction enregistrerait les données dans une base de données
  // Pour cette démonstration, nous allons simplement retourner l'objet créé

  const log: ActivityLog = {
    id: Math.random().toString(36).substring(2, 15),
    timestamp: new Date(),
    userId,
    userName,
    userRole,
    ipAddress,
    action,
    resource,
    resourceId,
    details,
    level,
    userAgent,
    before,
    after,
  }

  console.log("Admin activity logged:", log)

  // Dans une implémentation réelle, vous enregistreriez ceci dans une base de données
  // await db.activityLogs.create({ data: log });

  return log
}

// Fonction pour récupérer les journaux d'activité avec filtrage et pagination
export async function getActivityLogs({
  page = 1,
  limit = 50,
  userId,
  action,
  resource,
  level,
  startDate,
  endDate,
  search,
}: {
  page?: number
  limit?: number
  userId?: string
  action?: LogAction
  resource?: LogResource
  level?: LogLevel
  startDate?: Date
  endDate?: Date
  search?: string
} = {}): Promise<{ logs: ActivityLog[]; total: number }> {
  // Dans une application réelle, cette fonction récupérerait les données depuis une base de données
  // Pour cette démonstration, nous allons générer des données fictives

  const mockLogs: ActivityLog[] = generateMockLogs(200)

  // Appliquer les filtres
  let filteredLogs = mockLogs

  if (userId) {
    filteredLogs = filteredLogs.filter((log) => log.userId === userId)
  }

  if (action) {
    filteredLogs = filteredLogs.filter((log) => log.action === action)
  }

  if (resource) {
    filteredLogs = filteredLogs.filter((log) => log.resource === resource)
  }

  if (level) {
    filteredLogs = filteredLogs.filter((log) => log.level === level)
  }

  if (startDate) {
    filteredLogs = filteredLogs.filter((log) => log.timestamp >= startDate)
  }

  if (endDate) {
    filteredLogs = filteredLogs.filter((log) => log.timestamp <= endDate)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredLogs = filteredLogs.filter(
      (log) =>
        log.userName.toLowerCase().includes(searchLower) ||
        log.details.toLowerCase().includes(searchLower) ||
        (log.resourceId && log.resourceId.toLowerCase().includes(searchLower)),
    )
  }

  // Trier par date (plus récent en premier)
  filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  // Pagination
  const total = filteredLogs.length
  const startIndex = (page - 1) * limit
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + limit)

  return {
    logs: paginatedLogs,
    total,
  }
}

// Fonction pour générer des données fictives pour la démonstration
function generateMockLogs(count: number): ActivityLog[] {
  const users = [
    { id: "1", name: "Sophie Martin", role: "admin" },
    { id: "2", name: "Thomas Dubois", role: "super_admin" },
    { id: "3", name: "Emma Petit", role: "editor" },
    { id: "4", name: "Lucas Bernard", role: "support" },
  ]

  const actions: LogAction[] = [
    "create",
    "update",
    "delete",
    "view",
    "login",
    "logout",
    "permission_change",
    "settings_change",
  ]
  const resources: LogResource[] = ["user", "destination", "booking", "payment", "content", "role", "setting", "system"]
  const levels: LogLevel[] = ["info", "warning", "error", "critical"]

  const ipAddresses = ["192.168.1.1", "10.0.0.5", "172.16.254.1", "127.0.0.1"]
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  ]

  const logs: ActivityLog[] = []

  // Générer des journaux d'activité aléatoires
  for (let i = 0; i < count; i++) {
    const user = users[Math.floor(Math.random() * users.length)]
    const action = actions[Math.floor(Math.random() * actions.length)]
    const resource = resources[Math.floor(Math.random() * resources.length)]
    const level = levels[Math.floor(Math.random() * levels.length)]

    // Générer une date aléatoire dans les 30 derniers jours
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60))

    let details = ""
    let resourceId = ""

    switch (action) {
      case "create":
        resourceId = Math.floor(Math.random() * 1000).toString()
        details = `A créé ${resource} #${resourceId}`
        break
      case "update":
        resourceId = Math.floor(Math.random() * 1000).toString()
        details = `A modifié ${resource} #${resourceId}`
        break
      case "delete":
        resourceId = Math.floor(Math.random() * 1000).toString()
        details = `A supprimé ${resource} #${resourceId}`
        break
      case "view":
        resourceId = Math.floor(Math.random() * 1000).toString()
        details = `A consulté ${resource} #${resourceId}`
        break
      case "login":
        details = `S'est connecté au tableau de bord`
        break
      case "logout":
        details = `S'est déconnecté du tableau de bord`
        break
      case "permission_change":
        const targetUser = users[Math.floor(Math.random() * users.length)]
        details = `A modifié les permissions de l'utilisateur ${targetUser.name}`
        resourceId = targetUser.id
        break
      case "settings_change":
        details = `A modifié les paramètres du site`
        break
    }

    logs.push({
      id: Math.random().toString(36).substring(2, 15),
      timestamp: date,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      ipAddress: ipAddresses[Math.floor(Math.random() * ipAddresses.length)],
      action,
      resource,
      resourceId,
      details,
      level,
      userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
    })
  }

  return logs
}

// Fonction pour exporter les journaux d'activité au format CSV
export function exportLogsToCSV(logs: ActivityLog[]): string {
  const headers = [
    "ID",
    "Date",
    "Utilisateur",
    "Rôle",
    "Adresse IP",
    "Action",
    "Ressource",
    "ID Ressource",
    "Détails",
    "Niveau",
  ]

  const rows = logs.map((log) => [
    log.id,
    log.timestamp.toISOString(),
    log.userName,
    log.userRole,
    log.ipAddress,
    log.action,
    log.resource,
    log.resourceId || "",
    log.details,
    log.level,
  ])

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

  return csvContent
}
