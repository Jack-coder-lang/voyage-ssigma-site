import { Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type LoyaltyLevel = "bronze" | "silver" | "gold" | "platinum"

interface LoyaltyLevelBadgeProps {
  level: LoyaltyLevel
}

export function LoyaltyLevelBadge({ level }: LoyaltyLevelBadgeProps) {
  const getLevelColor = (level: LoyaltyLevel) => {
    switch (level) {
      case "bronze":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
      case "silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300"
      case "platinum":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getAwardColor = (level: LoyaltyLevel) => {
    switch (level) {
      case "bronze":
        return "text-amber-700 dark:text-amber-500"
      case "silver":
        return "text-gray-500 dark:text-gray-400"
      case "gold":
        return "text-yellow-600 dark:text-yellow-500"
      case "platinum":
        return "text-purple-700 dark:text-purple-500"
      default:
        return "text-gray-500 dark:text-gray-400"
    }
  }

  return (
    <Badge variant="outline" className={`flex items-center gap-1 px-2 py-1 ${getLevelColor(level)}`}>
      <Award className={`h-3.5 w-3.5 ${getAwardColor(level)}`} />
      <span className="capitalize">{level}</span>
    </Badge>
  )
}
