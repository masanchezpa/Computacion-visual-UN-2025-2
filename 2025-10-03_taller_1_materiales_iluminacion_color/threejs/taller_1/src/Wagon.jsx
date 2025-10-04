import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Wagon({ isDay, ...props }) {
  const { scene } = useGLTF('/models/wagon.glb')
  const wagonRef = useRef()

  // Inicializamos materiales base
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#555555',  // gris metálico base
          roughness: 0.6,
          metalness: 0.8,
        })
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  // Animación PBR dinámica según el ciclo de luz
  useFrame(() => {
    if (!wagonRef.current) return

    wagonRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material

        // Más frío de día, más cálido al atardecer
        const targetColor = new THREE.Color(isDay ? '#b0b0b0' : '#ffb380')
        mat.color.lerp(targetColor, 0.05)

        // Rugosidad y metalicidad cambian suavemente
        mat.roughness = THREE.MathUtils.lerp(
          mat.roughness,
          isDay ? 0.4 : 0.85,
          0.05
        )
        mat.metalness = THREE.MathUtils.lerp(
          mat.metalness,
          isDay ? 0.7 : 0.2,
          0.05
        )

        // Intensidad del reflejo ambiental
        mat.envMapIntensity = THREE.MathUtils.lerp(
          mat.envMapIntensity ?? 1,
          isDay ? 1.2 : 0.3,
          0.05
        )
      }
    })
  })

  return (
    <primitive
      ref={wagonRef}
      object={scene}
      scale={1.3}
      position={[2.8, -1, 0.5]}
      rotation={[0, 2.3, 0]}
      {...props}
    />
  )
}
