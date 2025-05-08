"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TextRevealProps {
  children: React.ReactNode
  delay?: number
}

export function TextReveal({ children, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
