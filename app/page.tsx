"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import Hero from "../components/hero"
import About from "../components/about"
import Skills from "../components/skills"
import Experience from "../components/experience"
import Projects from "../components/projects"
import Contact from "../components/contact"
import Footer from "../components/footer"
import Loader from "../components/loader"
import CustomCursor from "../components/custom-cursor"
import { useMobile } from "../hooks/use-mobile"
import { AnimatePresence, motion } from "framer-motion"
import BackgroundScene from "../components/background-scene"
import AnimatedSection from "../components/animated-section"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const isMobile = useMobile()

  useEffect(() => {
    // Simple timeout for loading screen
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" />
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-x-hidden"
          style={{ perspective: "1000px" }}
        >
          {!isMobile && <CustomCursor />}
          <BackgroundScene />
          <Navbar isMobile={isMobile} />

                    <AnimatedSection delay={0.2}>
            <Hero />
          </AnimatedSection>

                    <AnimatedSection delay={0.3}>
            <About />
          </AnimatedSection>

                    <AnimatedSection delay={0.4}>
            <Skills />
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <Experience />
          </AnimatedSection>

                    <AnimatedSection delay={0.6}>
            <Projects />
          </AnimatedSection>

                    <AnimatedSection delay={0.7}>
            <Contact /> 
          </AnimatedSection>

                    <AnimatedSection delay={0.8}>
            <Footer />
          </AnimatedSection>
        </motion.main>
      )}
    </AnimatePresence>
  )
}
