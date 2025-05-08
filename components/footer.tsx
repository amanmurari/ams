"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-4 text-center text-gray-400 border-t border-gray-800/50 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="relative inline-block">
            © {currentYear} All rights reserved by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ml-1">
              Aman Murari Singh
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
