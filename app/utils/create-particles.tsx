import * as THREE from "three"

export function createParticles() {
  // Create particles for background effect
  const particlesCount = 2000
  const positions = new Float32Array(particlesCount * 3)
  const colors = new Float32Array(particlesCount * 3)

  const colorOptions = [
    new THREE.Color(0x8a2be2), // Purple
    new THREE.Color(0x4169e1), // Royal Blue
    new THREE.Color(0xffd700), // Gold
    new THREE.Color(0xff4500), // Orange Red
  ]

  for (let i = 0; i < particlesCount; i++) {
    // Position
    const radius = 5 + Math.random() * 10
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    // Color
    const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  const particlesGeometry = new THREE.BufferGeometry()
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  })

  return new THREE.Points(particlesGeometry, particlesMaterial)
}
