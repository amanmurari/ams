"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([])
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Update trail positions
      setTrailPositions((prev) => {
        const newPositions = [...prev, { x: e.clientX, y: e.clientY }]
        if (newPositions.length > 5) {
          return newPositions.slice(-5)
        }
        return newPositions
      })

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
    const interactiveElements = document.querySelectorAll("a, button, .interactive-element, .project-card")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        setHovered(true)
        if (el.getAttribute("data-cursor-text")) {
          setText(el.getAttribute("data-cursor-text") || "")
        }
      })

      el.addEventListener("mouseleave", () => {
        setHovered(false)
        setText("")
      })
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)
      document.documentElement.classList.remove("custom-cursor")

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", () => setHovered(true))
        el.removeEventListener("mouseleave", () => setHovered(false))
      })
    }
  }, [])

  return (
    <>
      {/* Cursor trails */}
      {trailPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="cursor-trail fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
          animate={{
            x: pos.x - 5,
            y: pos.y - 5,
            opacity: 0.3 - index * 0.05,
            scale: 1 - index * 0.15,
          }}
          transition={{
            duration: 0.1,
            ease: "linear",
          }}
          style={{
            opacity: hidden ? 0 : 1,
          }}
        >
          <div className="w-2.5 h-2.5 bg-white rounded-full" />
        </motion.div>
      ))}

      {/* Main cursor dot */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          scale: clicked ? 0.8 : hovered ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
        style={{
          opacity: hidden ? 0 : 1,
        }}
      >
        <div className="w-2.5 h-2.5 bg-white rounded-full" />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="cursor-ring fixed top-0 left-0 z-50 flex items-center justify-center pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: clicked ? 1.2 : hovered ? 1.5 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 150,
          mass: 0.8,
        }}
      >
        <div className="w-12 h-12 rounded-full border-2 border-white opacity-80" />
        {text && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute text-white text-xs font-medium whitespace-nowrap"
          >
            {text}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
