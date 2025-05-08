"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useMobile } from "@/hooks/use-mobile"

export default function BackgroundScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create particles
    const particlesCount = isMobile ? 500 : 2000
    const particlesGeometry = new THREE.BufferGeometry()
    const positionArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount; i++) {
      // Position
      positionArray[i * 3] = (Math.random() - 0.5) * 100
      positionArray[i * 3 + 1] = (Math.random() - 0.5) * 100
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 100

      // Scale
      scaleArray[i] = Math.random()
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3))
    particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      sizeAttenuation: true,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })

    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Mouse movement effect
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Update particles
      particles.rotation.x = elapsedTime * 0.05
      particles.rotation.y = elapsedTime * 0.03

      // Smooth mouse movement
      targetX = mouseX * 0.1
      targetY = mouseY * 0.1

      particles.rotation.x += (targetY - particles.rotation.x) * 0.05
      particles.rotation.y += (targetX - particles.rotation.y) * 0.05

      // Render
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [isMobile])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-60 pointer-events-none" />
}
