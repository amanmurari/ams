"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { createLogo } from "../utils/create-logo"
import { createParticles } from "../utils/create-particles"
import { createText } from "../utils/create-text"

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000001)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxDistance = 10
    controls.minDistance = 3
    controls.enablePan = false

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x8a2be2, 2, 10)
    pointLight.position.set(0, 2, 2)
    scene.add(pointLight)

    // Create logo
    const logo = createLogo()
    scene.add(logo)

    // Create particles
    const particles = createParticles()
    scene.add(particles)

    // Create text
    createText().then((textMesh) => {
      scene.add(textMesh)
    })

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Rotate logo
      if (logo) {
        logo.rotation.y = elapsedTime * 0.2
        logo.position.y = Math.sin(elapsedTime * 0.5) * 0.2
      }

      // Animate particles
      if (particles) {
        particles.rotation.y = elapsedTime * 0.05
        const positions = particles.geometry.attributes.position
        const count = positions.count

        for (let i = 0; i < count; i++) {
          const i3 = i * 3
          const x = positions.getX(i)
          const y = positions.getY(i)
          const z = positions.getZ(i)

          positions.setY(i, y + Math.sin(elapsedTime + x * 0.5) * 0.01)
        }

        positions.needsUpdate = true
      }

      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      controls.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
