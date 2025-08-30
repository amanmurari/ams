"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [hidden, setHidden] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    setIsVisible(true)

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => {
      setClicked(true)
      setTimeout(() => setClicked(false), 100)
    }
    
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
    <AnimatePresence>
      {isVisible && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
          overflow: 'hidden'
        }}>
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '24px',
              height: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.7)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 9999,
              mixBlendMode: 'difference'
            }}
            initial={{ opacity: 0 }}
            animate={{
              x: position.x,
              y: position.y,
              scale: clicked ? 0.7 : hovered ? 2 : 1,
              opacity: hidden ? 0 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              x: { type: 'spring', damping: 20, stiffness: 1000, mass: 0.5 },
              y: { type: 'spring', damping: 20, stiffness: 1000, mass: 0.5 },
              scale: { type: 'spring', damping: 20, stiffness: 500, mass: 0.5 },
              opacity: { duration: 0.2 }
            }}
          >
            <motion.div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }}
              animate={{
                scale: hovered ? 0.6 : 1,
                opacity: hovered ? 0.5 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeOut'
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
