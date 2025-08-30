"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase } from "lucide-react"

const experienceData = [
  {
    title: "AI Research Intern",
    company: "Vizuara Research Labs",
    date: "Aug 2025 - present",
    description: "Working on AI Research projects. which is not done this before.",
  },
  
]

const Branch = ({ isLeft }: { isLeft: boolean }) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  }
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className={`absolute top-1/2 ${isLeft ? "right-[-50px]" : "left-[-50px]"} -translate-y-1/2 z-0`}
      style={{ transform: isLeft ? "" : "scaleX(-1)" }}
    >
      <motion.path
        d="M0,50 C50,50 50,0 100,0"
        fill="none"
        stroke="hsl(260, 80%, 70%)"
        strokeWidth="2"
        variants={pathVariants}
      />
    </motion.svg>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.5 },
    },
  }

  const itemVariants = (isLeft: boolean) => ({
    hidden: { opacity: 0, x: isLeft ? -100 : 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  })

  const trunkVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 2, ease: "easeInOut" } },
  }

  return (
    <section id="experience" ref={ref} className="py-20 md:py-28 px-4 md:px-12 scroll-mt-20">
      <h2 className="text-3xl font-bold text-center mb-24 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        My Experience
      </h2>
      <div className="relative max-w-4xl mx-auto min-h-full">
        {/* Tree Trunk */}
        <svg className="absolute left-1/2 top-0 h-full w-20 -translate-x-1/2" viewBox="0 0 80 800">
          <motion.path
            d="M 40,0 V 800"
            fill="none"
            stroke="url(#trunk-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            variants={trunkVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          <defs>
            <linearGradient id="trunk-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-32"
        >
          {experienceData.map((exp, index) => {
            const isLeft = index % 2 === 0
            return (
              <motion.div
                key={index}
                variants={itemVariants(isLeft)}
                className={`relative flex items-center ${isLeft ? "justify-start" : "justify-end"}`}
              >
                {/* Branch */}
                <div className={`absolute top-0 w-1/2 ${isLeft ? "left-1/2" : "right-1/2"}`}>
                  <Branch isLeft={isLeft} />
                </div>

                {/* Content Card */}
                <div
                  className={`relative w-5/12 p-6 rounded-lg border bg-gray-800/30 backdrop-blur-sm transition-all duration-300 group ${
                    isLeft
                      ? "border-purple-500/30 hover:border-purple-500"
                      : "border-pink-500/30 hover:border-pink-500"
                  }`}
                >
                  <div className={`absolute -inset-px rounded-lg bg-gradient-to-r ${isLeft ? 'from-purple-500/20' : 'from-pink-500/20'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                  <p className={`text-sm mb-1 ${isLeft ? "text-purple-400" : "text-pink-400"}`}>{exp.date}</p>
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <p className="text-md text-gray-300 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-400">{exp.description}</p>
                </div>
                
                {/* Timeline Dot / Fruit */}
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-900 border-2 rounded-full flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${isLeft ? 'from-purple-600 to-pink-600' : 'from-pink-600 to-purple-600'} shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/30`}>
                     <Briefcase size={18} className="text-white" />
                   </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
