"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import { TextReveal } from "./text-reveal"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error")
      return
    }

    // Simulate form submission
    setIsSubmitting(true)
    setTimeout(() => {
      setFormStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitting(false)

      // Reset status after 3 seconds
      setTimeout(() => setFormStatus(null), 3000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: <Mail className="text-purple-400" size={24} />,
      label: "Email",
      value: "amanmurarisingh94700@gmail.com",
    },
    {
      icon: <Phone className="text-purple-400" size={24} />,
      label: "Phone",
      value: "+91 9470013345",
    },
    {
      icon: <MapPin className="text-purple-400" size={24} />,
      label: "Location",
      value: "Arwal, Aurangabad, Bihar, India",
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 md:px-12 bg-black/30 relative z-10">
      <TextReveal>
        <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Contact Me
        </h2>
      </TextReveal>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700 relative overflow-hidden group"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500"></div>

          <h3 className="text-xl font-semibold mb-6 text-white">Get In Touch</h3>

          <div className="space-y-6 mb-8 relative z-10">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mt-1 relative">
                  {item.icon}
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">{item.label}</h4>
                  <p className="text-white group-hover:text-purple-300 transition-colors">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 relative z-10">
            <motion.a
              href="https://github.com/amanmurari/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-purple-600 transition-colors"
              aria-label="GitHub"
              whileHover={{ scale: 1.1, rotate: 5 }}
              data-cursor-text="GitHub"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/amanmurarisingh/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-purple-600 transition-colors"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.1, rotate: -5 }}
              data-cursor-text="LinkedIn"
            >
              <Linkedin size={20} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-300"
                placeholder="Your name"
                required
                data-cursor-text="Type here"
              />
              <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 w-0 group-focus-within:w-full transition-all duration-300"></div>
            </div>

            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-300"
                placeholder="Your email address"
                required
                data-cursor-text="Type here"
              />
            </div>

            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white resize-none transition-all duration-300"
                placeholder="Your message"
                required
                data-cursor-text="Type here"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              data-cursor-text="Send"
            >
              <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
              {!isSubmitting && <Send size={16} />}
              {isSubmitting && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span className="absolute inset-0 bg-white/20 transform translate-y-full hover:translate-y-0 transition-transform duration-300"></span>
            </motion.button>

            {formStatus === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-500 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Message sent successfully!
              </motion.p>
            )}

            {formStatus === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Please fill out all fields.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
