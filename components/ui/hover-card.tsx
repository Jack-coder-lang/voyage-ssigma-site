"use client"

import type * as React from "react"
import { motion } from "framer-motion"

interface HoverCardProps {
  children: React.ReactNode
  className?: string
}

export function HoverCard({ children, className }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -5,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
