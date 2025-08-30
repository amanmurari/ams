"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState(0)

  // Project data with more projects
  const projects = [
    {
      title: "Multi Model Chatbot",
      description: "A flexible and efficient system for retrieving and generating responses using both text and image data.",
      tags: ["Python", "pytorch","LangChain", "AI", "NLP","CV"],
      image: "placeholder.svg?height=300&width=400",
      githubLink: "https://github.com/amanmurari/multimodal-Rag",
      demoLink: "#",
    },
    {
      title: "Gemini RAG",
      description:
        "Implementation of Retrieval Augmented Generation using Google's Gemini model for enhanced information retrieval.",
      tags: ["Python", "Gemini API", "Vector DB", "RAG"],
      image: "placeholder.svg?height=300&width=400",
      githubLink: "#",
      demoLink: "#",
    },
    {
      title: "Django GPT: Agent-Oriented RAG for Django Development: Write Code, Not Docs",
      description:
        `django-gpt is a LangGraph-powered agent system that autonomously writes production-ready Django code by fusing official documentation, real-time web search, and project context. Unlike static RAG tools, it operates as a multi-agent workflow that:
1️⃣ Understands requirements via natural language prompts
2️⃣ Retrieves & verifies Django-specific knowledge (docs,SO, GitHub)
3️⃣ Generates, validates, and writes code directly to your project files
No more tab-switching between docs and IDE – it builds Django apps while you sip coffee. ☕`,
      tags: ["Python", "LangChain", "LangGraph", "Agent", "Web search"],
      image: "placeholder.svg?height=300&width=400",
      githubLink: "https://github.com/amanmurari/django-gpt",
      demoLink: "#",
    },
    {
      title: "Llama2 VLM from scratch",
      description:
        "Llama2-VLM-from-scratch is an open-source project to build a Vision-Language Model (VLM) entirely from scratch, inspired by Llama2's architecture but trained without pre-existing weights. Unlike fine-tuned VLMs (e.g., LLaVA), this project trains both the vision encoder and language decoder from random initialization on multimodal data, enabling true end-to-end vision-language understanding and generation.",
      tags: ["competition winner", "pytorch", "tiktoken", "Transformer", "CV", "NLP"],
      image: "placeholder.svg?height=300&width=400",
      githubLink: "https://github.com/amanmurari/Llama2-VLM-from-scratch",
      demoLink: "#",
    },

    {
      title: "nanoKimi-K2 from scratch",
      description:
        "nanoKimi is a lightweight, production-ready reimplementation of the cutting-edge Kimi-K2 architecture—distilling its breakthrough innovations (Muon optimizer, Mixture of Experts, Latent Attention) into a sub-1B parameter model optimized for edge devices, rapid fine-tuning, and low-cost scaling. Unlike resource-hungry LLMs, nanoKimi delivers 80% of Kimi-K2’s reasoning capabilities at 1/10th the compute, making next-gen language modeling accessible for startups, researchers, and embedded systems.",
      tags: ["Python", "pytorch", "tiktoken", "Transformer","NLP"],
      image: "placeholder.svg?height=300&width=400",
      githubLink: "https://github.com/amanmurari/nanokimi",
      demoLink: "#",
    },
    {
      title: "Fruit Detection",
      description: "Computer vision system that detects and classifies fruits and draw bounding box around them.",
      tags: ["Python", "OpenCV", "TensorFlow", "Computer Vision"],
      image: "/placeholder.svg?height=300&width=400",
      githubLink: "https://github.com/amanmurari/fruit-detection",
      demoLink: "#",
    },
    {
      title: "E-commerce Platform",
      description: "Django E-Commerce Platform Production-ready online store built with Django featuring secure user authentication, dynamic product catalog, and responsive shopping cart system. implements RESTful APIs, and follows MVC architecture. Includes inventory management, recommendation algorithms, and comprehensive testing. Scalable solution optimized for performance across all devices with clean, maintainable code structure.",
      tags: ["Python", "PyTorch", "Reinforcement Learning"],
      image: "/placeholder.svg?height=300&width=400",
      githubLink: "https://github.com/amanmurari/ecommerce-df",
      demoLink: "#",
    },
    // {
    //   title: "ChatBot",
    //   description: "Conversational AI assistant built with modern NLP techniques for natural interactions.",
    //   tags: ["Python", "NLP", "Transformers", "FastAPI"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   githubLink: "#",
    //   demoLink: "#",
    // },
    // {
    //   title: "Portfolio Website",
    //   description: "Interactive portfolio website with 3D animations and custom cursor effects.",
    //   tags: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   githubLink: "#",
    //   demoLink: "#",
    // },
    // {
    //   title: "E-commerce Platform",
    //   description: "Full-featured e-commerce platform with product management, cart, and checkout functionality.",
    //   tags: ["Next.js", "MongoDB", "Stripe", "Redux"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   githubLink: "#",
    //   demoLink: "#",
    // },
    // {
    //   title: "AI Image Generator",
    //   description: "Web application that generates images based on text prompts using AI models.",
    //   tags: ["React", "Node.js", "OpenAI API", "Canvas"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   githubLink: "#",
    //   demoLink: "#",
    // },
    // {
    //   title: "Social Media Dashboard",
    //   description: "Analytics dashboard for tracking social media performance across multiple platforms.",
    //   tags: ["Vue.js", "D3.js", "Firebase", "Social APIs"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   githubLink: "#",
    //   demoLink: "#",
    // },
    // {
    //   title: "Weather App",
    //   description: "Real-time weather application with location detection and forecast visualization.",
    //   tags: ["JavaScript", "Weather API", "Geolocation", "Chart.js"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   githubLink: "#",
    //   demoLink: "#",
    // },
    // {
    //   title: "Task Management System",
    //   description: "Collaborative task management system with real-time updates and team features.",
    //   tags: ["React", "Socket.io", "Express", "MongoDB"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   githubLink: "#",
    //   demoLink: "#",
    // },
  ]

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 md:px-12 relative z-10">
      <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        My Projects
      </h2>

      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10 group project-card interactive-element transform hover:-translate-y-2 duration-300"
              data-cursor-text="View Project"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                <img
                  src={project.image || "placeholder.svg"}
                  alt={`${project.title} screenshot`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              </div>

              <div className="p-6 relative">
                <div className="absolute -top-10 right-6 bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-top-6 transition-all duration-300">
                  {index + 1}
                </div>

                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.githubLink}
                    className="text-white/70 hover:text-white transition-colors group-hover:text-purple-300 interactive-element transform hover:scale-110 duration-200"
                    aria-label={`View ${project.title} code on GitHub`}
                    data-cursor-text="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.demoLink}
                    className="text-white/70 hover:text-white transition-colors group-hover:text-purple-300 interactive-element transform hover:scale-110 duration-200"
                    aria-label={`View ${project.title} live demo`}
                    data-cursor-text="Demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden">
        <div className="relative">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700"
          >
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
              <img
                src={projects[activeIndex].image || "placeholder.svg"}
                alt={projects[activeIndex].title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">{projects[activeIndex].title}</h3>
              <p className="text-gray-300 mb-4">{projects[activeIndex].description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {projects[activeIndex].tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={projects[activeIndex].githubLink}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={`View ${projects[activeIndex].title} code on GitHub`}
                >
                  <Github size={20} />
                </a>
                <a
                  href={projects[activeIndex].demoLink}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={`View ${projects[activeIndex].title} live demo`}
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-between mt-4">
            <button
              onClick={prevProject}
              className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center border border-gray-700 hover:bg-gray-700/50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-purple-500" : "bg-gray-600"} hover:bg-purple-400 transition-colors`}
                />
              ))}
            </div>
            <button
              onClick={nextProject}
              className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center border border-gray-700 hover:bg-gray-700/50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
