import { UserNav } from "@/components/dashboard/user-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <div className="border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <MobileNav />
        <div className="relative w-full max-w-sm md:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="w-full bg-gray-100 dark:bg-gray-800 pl-8 rounded-lg border-none"
          />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  )
}
