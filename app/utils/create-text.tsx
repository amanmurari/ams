import * as THREE from "three"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"

export async function createText() {
  // Create a group to hold text elements
  const textGroup = new THREE.Group()

  // Load font
  const fontLoader = new FontLoader()

  return new Promise<THREE.Group>((resolve) => {
    fontLoader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
      // Create "FIFA WORLD CUP" text
      const textGeometry = new TextGeometry("FIFA WORLD CUP", {
        font: font,
        size: 0.3,
        height: 0.05,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 5,
      })

      textGeometry.center()

      const textMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.8,
        roughness: 0.2,
      })

      const textMesh = new THREE.Mesh(textGeometry, textMaterial)
      textMesh.position.y = -1.5
      textMesh.castShadow = true
      textGroup.add(textMesh)

      // Create "2022" text
      const yearGeometry = new TextGeometry("2022", {
        font: font,
        size: 0.4,
        height: 0.08,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 5,
      })

      yearGeometry.center()

      const yearMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700, // Gold color
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0xffd700,
        emissiveIntensity: 0.2,
      })

      const yearMesh = new THREE.Mesh(yearGeometry, yearMaterial)
      yearMesh.position.y = -2.1
      yearMesh.castShadow = true
      textGroup.add(yearMesh)

      resolve(textGroup)
    })
  })
}
