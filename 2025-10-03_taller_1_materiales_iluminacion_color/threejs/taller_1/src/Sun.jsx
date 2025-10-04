import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Sun({ isDay }) {
  const sunRef = useRef()
  const lightRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.7
    const angle = isDay ? Math.sin(t) * 0.2 : Math.sin(t) * 0.6 + 1.2
    const x =  -25
    const y = Math.cos(angle) * 25
    const z = -5

    // mover luz y sol
    lightRef.current.position.set(x, y, z)
    sunRef.current.position.set(x, y, z)

    // interpolar color
    const targetColor = new THREE.Color(isDay ? '#fdeb84ff' : '#ff7b00')
    lightRef.current.color.lerp(targetColor, 0.1)
    sunRef.current.material.emissive.lerp(targetColor, 0.3)
  })

  return (
    <>
      {/* Luz direccional que ilumina la escena */}
      <directionalLight
        ref={lightRef}
        castShadow
        intensity={isDay ? 1.2 : 0.6}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Malla del sol con material PBR */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[10, 64, 64]} />
        <meshStandardMaterial
          emissive={isDay ? '#fdeb84ff' : '#ff7b00'}  // brillo propio
          emissiveIntensity={isDay ? 5 : 2}
          metalness={0.6}
          roughness={0.1}
        />
      </mesh>
    </>
  )
}
