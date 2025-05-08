import * as THREE from "three"

export function createLogo() {
  // Create a group to hold all logo parts
  const logoGroup = new THREE.Group()

  // Create the infinity shape
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-2, 0, 0),
    new THREE.Vector3(-1, 1.5, 0),
    new THREE.Vector3(1, 1.5, 0),
    new THREE.Vector3(2, 0, 0),
  )

  const curve2 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(2, 0, 0),
    new THREE.Vector3(1, -1.5, 0),
    new THREE.Vector3(-1, -1.5, 0),
    new THREE.Vector3(-2, 0, 0),
  )

  const points = curve.getPoints(50).concat(curve2.getPoints(50))

  // Create tube geometry for the infinity shape
  const tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 100, 0.2, 16, false)

  // Create material with shiny metallic look
  const tubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1.0,
  })

  const infinityMesh = new THREE.Mesh(tubeGeometry, tubeMaterial)
  infinityMesh.castShadow = true
  infinityMesh.receiveShadow = true
  logoGroup.add(infinityMesh)

  // Create the emblem at the top
  const emblemGeometry = new THREE.SphereGeometry(0.2, 32, 32)
  const emblemMaterial = new THREE.MeshStandardMaterial({
    color: 0x8a2be2,
    metalness: 0.7,
    roughness: 0.2,
    emissive: 0x4a0082,
    emissiveIntensity: 0.5,
  })

  const emblem = new THREE.Mesh(emblemGeometry, emblemMaterial)
  emblem.position.set(0, 1.2, 0)
  emblem.castShadow = true
  logoGroup.add(emblem)

  // Add a subtle glow effect
  const glowGeometry = new THREE.SphereGeometry(0.25, 32, 32)
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x8a2be2,
    transparent: true,
    opacity: 0.5,
  })

  const glow = new THREE.Mesh(glowGeometry, glowMaterial)
  glow.position.set(0, 1.2, 0)
  logoGroup.add(glow)

  return logoGroup
}
