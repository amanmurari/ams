"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

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

    // Create a hidden form
    const form = document.createElement('form')
    form.style.display = 'none'
    form.method = 'POST'
    form.action = 'https://formsubmit.co/13b66fbb476a87215abb41633a861eea'
    form.target = 'formsubmit-iframe'
    
    // Add form fields
    const fields = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      _subject: 'New Contact Form Submission',
      _template: 'basic',
      _captcha: 'false',
      _next: window.location.href
    }
    
    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value
      form.appendChild(input)
    })
    
    // Create hidden iframe for form submission
    let iframe = document.getElementById('formsubmit-iframe') as HTMLIFrameElement
    if (!iframe) {
      iframe = document.createElement('iframe')
      iframe.id = 'formsubmit-iframe'
      iframe.name = 'formsubmit-iframe'
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
    }
    
    // Handle successful submission
    iframe.onload = () => {
      setFormStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitting(false)
      setTimeout(() => setFormStatus(null), 3000)
      // Clean up
      document.body.removeChild(form)
    }
    
    // Handle errors
    iframe.onerror = () => {
      setFormStatus("error")
      setIsSubmitting(false)
      setTimeout(() => setFormStatus(null), 3000)
    }
    
    // Submit the form
    document.body.appendChild(form)
    form.submit()
    
    // Show loading state
    setIsSubmitting(true)
  }

  const contactInfo = [
    {
      icon: <Mail className="text-purple-400" size={24} />,
      label: "Email",
      value: "amanmuraris@gmail.com",
    },
    {
      icon: <Phone className="text-purple-400" size={24} />,
      label: "Phone",
      value: "+91 9229275147",
    },
    {
      icon: <MapPin className="text-purple-400" size={24} />,
      label: "Location",
      value: "Patan, Bihar, India",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const formVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3,
      },
    },
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 md:px-12 bg-black/30 relative z-10 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            variants={itemVariants}
          >
            Let's Connect
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Have a project in mind or want to chat? Feel free to reach out!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-500"
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

          {/* Right Column - Contact Form */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.5,
                },
              },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 relative overflow-hidden group hover:border-pink-500/50 transition-all duration-500"
          >
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all duration-700"></div>

            <form onSubmit={handleSubmit} className="space-y-6" target="formsubmit-iframe">
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
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 relative overflow-hidden w-full justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                data-cursor-text="Send"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
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
                  className="text-green-500 flex items-center gap-2 text-sm mt-4"
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
                  className="text-red-500 flex items-center gap-2 text-sm mt-4"
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
      </div>
    </section>
  )
}
