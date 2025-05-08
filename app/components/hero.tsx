"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { useMobile } from "@/hooks/use-mobile"
import { TextReveal } from "./text-reveal"
import { InteractiveText } from "./interactive-text"

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [nameTyped, setNameTyped] = useState(false)
  const mousePosition = useMousePosition()
  const isMobile = useMobile()

  useEffect(() => {
    if (!nameRef.current) return

    const name = "Aman Murari Singh"
    let index = 0
    nameRef.current.textContent = ""

    const interval = setInterval(() => {
      if (index < name.length) {
        nameRef.current!.textContent += name[index]
        index++
      } else {
        clearInterval(interval)
        setNameTyped(true)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen pt-20 flex flex-col md:flex-row items-center justify-center px-4 md:px-12 relative"
    >
      <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0 z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-purple-400 mb-2"
        >
          Hi, I am
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <h1
            ref={nameRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 interactive-text"
          ></h1>

          {nameTyped && <InteractiveText mousePosition={mousePosition} isMobile={isMobile} />}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <TextReveal>
            <h3 className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg text-white font-semibold text-lg">
              AI Engineer
            </h3>
          </TextReveal>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-gray-300 mb-8 max-w-md mx-auto md:mx-0"
        >
          I want to become an AI Engineer specializing in data science and web development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center md:justify-start"
        >
          <a
            href="/Resume.pdf"
            download
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity relative group overflow-hidden"
          >
            <span className="relative z-10">Download CV</span>
            <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-transparent border border-purple-500 rounded-full text-white font-medium hover:bg-purple-500/20 transition-colors relative group overflow-hidden"
          >
            <span className="relative z-10">Hire Me</span>
            <span className="absolute inset-0 bg-purple-500/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full md:w-1/2 flex justify-center z-10"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500 transform-gpu hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 z-10"></div>
            <Image src="/aman.png" alt="Aman Murari Singh" fill className="object-cover" />
          </div>

          {!isMobile && (
            <>
              <motion.div
                className="absolute w-20 h-20 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/50"
                animate={{
                  x: [40, 80, 40],
                  y: [0, -40, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute w-12 h-12 rounded-full bg-pink-500/20 backdrop-blur-md border border-pink-500/50"
                animate={{
                  x: [-60, -100, -60],
                  y: [20, 60, 20],
                }}
                transition={{
                  duration: 7,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <a href="#about" className="text-white opacity-70 hover:opacity-100 transition-opacity">
          <ArrowDown size={24} />
        </a>
      </motion.div>
    </section>
  )
}
