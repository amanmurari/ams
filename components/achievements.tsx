"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TextReveal } from "./text-reveal"
import { Trophy } from "lucide-react"

const achievementsData = [
  {
    title: "Hackathon Winner",
    organization: "First Place Achievement",
    date: "2025",
    description: "Won first place in a competitive hackathon, demonstrating exceptional problem-solving skills and innovative thinking in AL/ML field.",
    icon: <Trophy size={32} className="text-purple-400" />,
    color: "from-purple-600/20 to-cyan-600/20",
    borderColor: "border-purple-500/30 hover:border-purple-500"
  }
]

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 0, 0.3, 1] as const,
      },
    },
  }

  return (
    <section id="achievements" ref={sectionRef} className="py-20 px-4 md:px-12 bg-gradient-to-b from-black/50 to-gray-900/50 relative z-10">
      <TextReveal>
        <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-600">
          Achievements & Awards
        </h2>
      </TextReveal>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
      >
        {achievementsData.map((achievement, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`relative group bg-gradient-to-br ${achievement.color} backdrop-blur-sm rounded-xl p-8 border ${achievement.borderColor} transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10`}
          >
            {/* Floating background decoration */}
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            
            {/* Icon container */}
            <div className="flex items-start gap-6 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                  {achievement.icon}
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{achievement.date}</p>
                <p className="text-md font-medium text-gray-300">{achievement.organization}</p>
              </div>
            </div>
            
            <p className="text-purple-200 leading-relaxed">{achievement.description}</p>
            
            {/* Decorative corner accent */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl"></div>
    </section>
  )
}
