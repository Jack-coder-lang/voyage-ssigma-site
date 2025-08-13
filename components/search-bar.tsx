"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  variant?: "default" | "hero"
  className?: string
  placeholder?: string
  defaultValue?: string
}

export function SearchBar({
  variant = "default",
  className,
  placeholder = "Rechercher une destination...",
  defaultValue = "",
}: SearchBarProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(defaultValue)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    } else {
      router.push("/search")
    }
  }

  if (variant === "hero") {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex w-full max-w-xl items-center rounded-full bg-white/90 dark:bg-gray-900/90 shadow-lg",
          className,
        )}
      >
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-14 flex-1 border-none bg-transparent px-6 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-1.5 h-11 w-11 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Rechercher</span>
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative flex w-full items-center", className)}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pr-10"
      />
      <Button type="submit" size="icon" variant="ghost" className="absolute right-0 h-full rounded-l-none">
        <Search className="h-4 w-4" />
        <span className="sr-only">Rechercher</span>
      </Button>
    </form>
  )
}
