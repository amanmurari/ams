"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        return newProgress > 100 ? 100 : newProgress
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-32 h-32 relative mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-purple-600 animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-r-4 border-l-4 border-pink-500 animate-spin-slow"></div>
        </div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="text-white text-2xl font-bold">{Math.round(progress)}%</div>
        </motion.div>
      </div>

      <motion.h1
        className="text-white text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        Aman Murari Singh
      </motion.h1>

      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
          style={{ width: `${progress}%` }}
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 0.8 }}
        />
      </div>
      <p className="text-gray-400 mt-4">Loading Portfolio...</p>

      <div className="absolute bottom-10 left-0 right-0">
        <div className="flex justify-center gap-4">
          <motion.div
            className="w-3 h-3 rounded-full bg-purple-500"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-pink-500"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-purple-500"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
