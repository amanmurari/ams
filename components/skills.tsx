"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TextReveal } from "./text-reveal"
import {
  Code,
  Database,
  PenToolIcon as Tool,
  PiIcon as Python,
  CodepenIcon as Javascript,
  Heading5Icon as Html5,
  Coffee,
  FileCode,
  Cpu,
  DatabaseIcon,
  DatabaseIcon as Postgres,
  Server,
  Layers,
  BarChart,
  LineChart,
  Brain,
  Bot,
  Workflow,
} from "lucide-react"

export default function Skills() {
  const [activeTab, setActiveTab] = useState("languages")
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const tabs = [
    { id: "languages", label: "Languages", icon: <Code size={20} /> },
    { id: "databases", label: "Databases", icon: <Database size={20} /> },
    { id: "tools", label: "Tools & Libraries", icon: <Tool size={20} /> },
  ]

  const skills = {
    languages: [
      { name: "Python", icon: <Python size={24} className="text-blue-500" /> },
      { name: "JavaScript", icon: <Javascript size={24} className="text-yellow-400" /> },
      { name: "HTML", icon: <Html5 size={24} className="text-orange-500" /> },
      { name: "CSS", icon: <FileCode size={24} className="text-blue-400" /> },
      { name: "Java", icon: <Coffee size={24} className="text-red-500" /> },
      { name: "SQL", icon: <Database size={24} className="text-green-500" /> },
      { name: "PHP", icon: <FileCode size={24} className="text-purple-400" /> },
      { name: "C++", icon: <Cpu size={24} className="text-blue-600" /> },
      { name: "C", icon: <Cpu size={24} className="text-purple-600" /> },
      { name: "Rust", icon: <Cpu size={24} className="text-blue-600" /> },
      { name: "Julia", icon: <Javascript size={24} className="text-orange-400" /> },
    ],
    databases: [
      { name: "MySQL", icon: <DatabaseIcon size={24} className="text-blue-500" /> },
      { name: "PostgreSQL", icon: <Postgres size={24} className="text-blue-400" /> },
      { name: "SQLite", icon: <Server size={24} className="text-green-500" /> },
    ],
    tools: [
      { name: "NumPy", icon: <Layers size={24} className="text-blue-500" /> },
      { name: "Pandas", icon: <BarChart size={24} className="text-purple-500" /> },
      { name: "Matplotlib", icon: <LineChart size={24} className="text-green-500" /> },
      { name: "Scikit-learn", icon: <Brain size={24} className="text-orange-500" /> },
      { name: "TensorFlow", icon: <Brain size={24} className="text-orange-400" /> },
      { name: "PyTorch", icon: <Brain size={24} className="text-red-500" /> },
      { name: "Django", icon: <Server size={24} className="text-green-600" /> },
      { name: "Flask", icon: <Server size={24} className="text-gray-400" /> },
      { name: "FastAPI", icon: <Server size={24} className="text-teal-500" /> },
      { name: "LangChain", icon: <Bot size={24} className="text-purple-500" /> },
      { name: "Streamlit", icon: <Workflow size={24} className="text-red-400" /> },
      { name: "jQuery", icon: <Javascript size={24} className="text-blue-400" /> },
    ],
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 md:px-12 bg-black/30 relative z-10">
      <TextReveal>
        <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          My Skills
        </h2>
      </TextReveal>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mb-12"
      >
        <div className="flex flex-wrap gap-4 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20"
                  : "bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 border border-gray-700 hover:border-purple-500/50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
      >
        {skills[activeTab as keyof typeof skills].map((skill, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-gray-700/30 transition-colors border border-gray-700 hover:border-purple-500 group"
          >
            <motion.div
              className="w-12 h-12 flex items-center justify-center relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {skill.icon}
              <div className="absolute inset-0 bg-purple-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </motion.div>
            <h3 className="text-center font-medium group-hover:text-purple-300 transition-colors">{skill.name}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
