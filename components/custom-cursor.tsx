"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)
    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    // Make sure cursor is visible
    document.documentElement.classList.add("custom-cursor")

    // Set up event listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .interactive-element, .project-card, input, textarea, [role='button']",
    )

    const handleInteractiveEnter = () => {
      setHovered(true)
    }

    const handleInteractiveLeave = () => {
      setHovered(false)
    }

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleInteractiveEnter)
      el.addEventListener("mouseleave", handleInteractiveLeave)
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)
      document.documentElement.classList.remove("custom-cursor")

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleInteractiveEnter)
        el.removeEventListener("mouseleave", handleInteractiveLeave)
      })
    }
  }, [])

  // Don't render cursor on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
      animate={{
        x: position.x - 15,
        y: position.y - 15,
        scale: clicked ? 0.8 : hovered ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 150,
        mass: 0.8,
      }}
      style={{
        opacity: hidden ? 0 : 1,
      }}
    >
      <div className="w-8 h-8 rounded-full border-2 border-white opacity-80" />
    </motion.div>
  )
}
