"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"
import { TextReveal } from "./text-reveal"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const aboutTextRef = useRef<HTMLParagraphElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    if (!aboutTextRef.current || !isInView) return

    const aboutText = `I'm Aman Murari Singh, a passionate data scientist and web developer with a strong foundation in programming languages such as HTML, CSS, and JavaScript. With a strong aptitude for learning, I've completed various courses in web designing, marketing, and data science to stay ahead of the curve. 

My expertise lies in crafting user-centric experiences through intuitive web design, leveraging tools like HTML5, CSS3, and JavaScript. I'm also fascinated by the world of data science, where I've explored libraries like NumPy, pandas, and scikit-learn to extract insights from complex data sets. 

When I'm not coding or analyzing data, you can find me teaching, fighting, or learning new skills. I believe that staying curious and adapting to new technologies is key to success in today's fast-paced tech landscape.

Throughout my academic journey, I've consistently achieved high academic grades, with a 81% in 10th standard and 87% in 12th standard. I've also completed various certification courses in web design, marketing, and data science to stay updated with the latest industry trends.

As a data scientist and web developer, I'm driven by the pursuit of innovation, creativity, and collaboration. I'm committed to leveraging my skills to create impactful solutions that make a difference in people's lives.`

    let index = 0
    aboutTextRef.current.textContent = ""

    const interval = setInterval(() => {
      if (index < aboutText.length) {
        aboutTextRef.current!.textContent += aboutText[index]
        index++
      } else {
        clearInterval(interval)
      }
    }, 10)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 md:px-12 relative z-10">
      <TextReveal>
        <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          About Me
        </h2>
      </TextReveal>

      <div className="flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/3"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl blur-lg"></div>
            <div className="relative w-full max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden border-4 border-purple-500 shadow-xl shadow-purple-500/20 transform-gpu hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 z-10"></div>
              <Image src="/aman.png" alt="Aman Murari Singh" fill className="object-cover" />

              {!isMobile && (
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <p className="text-white text-lg font-medium">Aman Murari Singh</p>
                </div>
              )}
            </div>

            {!isMobile && (
              <>
                <motion.div
                  className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-purple-500/10 backdrop-blur-md border border-purple-500/30"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-pink-500/10 backdrop-blur-md border border-pink-500/30"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full md:w-2/3"
        >
          <div className="relative p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-xl border border-purple-500/20">
            <p ref={aboutTextRef} className="text-gray-300 leading-relaxed whitespace-pre-line"></p>

            {!isMobile && (
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-md border border-purple-500/20"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
