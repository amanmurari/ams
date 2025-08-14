"use client"

import { useState, useEffect } from "react"
import { Menu, X, Github, Linkedin } from "lucide-react"
import Image from "next/image"

interface NavbarProps {
  isMobile: boolean
}

export default function Navbar({ isMobile }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"}`}
      >
        {isMobile && (
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-white">
              <Menu size={24} />
            </button>
          </div>
        )}

        <nav
          className={`${isMobile ? (isMenuOpen ? "block fixed inset-0 bg-black z-50" : "hidden") : "flex justify-between items-center px-8 py-4"}`}
        >
          {isMobile && isMenuOpen && (
            <div className="absolute top-4 right-4">
              <button onClick={closeMenu} className="text-white">
                <X size={24} />
              </button>
            </div>
          )}

          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500 relative">
              {imageError ? (
                <div className="w-full h-full bg-gradient-to-br from-purple-800 to-pink-700 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AS</span>
                </div>
              ) : (
                <Image
                  src="aman.png"
                  alt="Aman Murari Singh"
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>

          <ul
            className={`${isMobile ? "flex flex-col items-center justify-center h-full space-y-8" : "flex space-x-8"}`}
          >
            <li>
              <a
                href="#home"
                onClick={closeMenu}
                className="text-white hover:text-purple-400 transition-colors relative group"
              >
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={closeMenu}
                className="text-white hover:text-purple-400 transition-colors relative group"
              >
                About
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
            <li>
              <a
                href="#skills"
                onClick={closeMenu}
                className="text-white hover:text-purple-400 transition-colors relative group"
              >
                Skills
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={closeMenu}
                className="text-white hover:text-purple-400 transition-colors relative group"
              >
                Projects
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={closeMenu}
                className="text-white hover:text-purple-400 transition-colors relative group"
              >
                Contact
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/amanmurari/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-white hover:text-purple-400 transition-colors"
              >
                <Github className="inline" size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/amanmurarisingh/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-white hover:text-purple-400 transition-colors"
              >
                <Linkedin className="inline" size={20} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
