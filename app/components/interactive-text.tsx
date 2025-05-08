"use client"

import { useEffect, useRef } from "react"

interface InteractiveTextProps {
  mousePosition: { x: number; y: number }
  isMobile: boolean
}

export function InteractiveText({ mousePosition, isMobile }: InteractiveTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMobile || !textRef.current) return

    const handleMouseMove = () => {
      if (!textRef.current) return

      const textRect = textRef.current.getBoundingClientRect()
      const textCenterX = textRect.left + textRect.width / 2
      const textCenterY = textRect.top + textRect.height / 2

      const distanceX = mousePosition.x - textCenterX
      const distanceY = mousePosition.y - textCenterY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      // Only repel if mouse is close to the text
      if (distance < 200) {
        const repelFactor = 0.2
        const repelX = (distanceX / distance) * (200 - distance) * repelFactor
        const repelY = (distanceY / distance) * (200 - distance) * repelFactor

        textRef.current.style.transform = `translate(${-repelX}px, ${-repelY}px)`
      } else {
        textRef.current.style.transform = "translate(0, 0)"
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mousePosition, isMobile])

  if (isMobile) return null

  // Return an empty div with the ref but no visible text
  return <div ref={textRef} className="absolute top-full left-0 mt-2 text-sm text-purple-300 opacity-0"></div>
}
