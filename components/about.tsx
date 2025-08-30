"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useMobile } from "../hooks/use-mobile"
import { TextReveal } from "./text-reveal"
import Image from "next/image"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const aboutTextRef = useRef<HTMLParagraphElement>(null)
  const isMobile = useMobile()
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!aboutTextRef.current || !isInView) return

    const aboutText = `AI Researcher and Engineer specializing in deep learning, large language models, and multi-agent systems with a strong foundation in both theoretical concepts and production-grade implementation. Currently advancing LLM research as an AI Intern at Vizuara AI Lab, I architect and deploy scalable AI solutions that bridge cutting-edge research with practical applications.

My expertise spans transformer architectures (GPT-2, LLaMA-3, DeepSeek-V3), reinforcement learning (DQN, PPO), and multi-agent frameworks (CrewAI, LangGraph, AutoGen). I've engineered end-to-end RAG systems using LangChain with Google Gemini, developed Django-based AI applications, and implemented transformer architectures from scratch with MoE routing and advanced attention mechanisms. My portfolio includes building a stock price prediction model with LSTM (85% accuracy), a dog emotion detection system (95% accuracy), and django-gpt—a specialized RAG agent for Django documentation.

Proficient in Python, PyTorch, TensorFlow, and full-stack development with Django, I combine data science skills (Pandas, NumPy, Scikit-learn) with modern AI tooling (LangChain, LlamaIndex, Vector DBs). Certified in Multi AI Agent Systems by CrewAI and TensorFlow development, I transform complex AI concepts into efficient, maintainable solutions. My open-source contributions reflect a commitment to advancing accessible, production-ready AI systems that solve real-world challenges across multiple domains.`

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
              {/* Removed the overlay filter */}
              {imageError ? (
                <div className="w-full h-full bg-gradient-to-br from-purple-800 to-pink-700 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">AS</span>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src="aman.png"
                    alt="Aman Murari Singh"
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}

              {!isMobile && !imageError && (
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
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
