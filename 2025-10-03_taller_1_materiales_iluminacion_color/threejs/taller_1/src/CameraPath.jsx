import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function CameraPath({ enabled = true }) {
  const { camera } = useThree()
  const tRef = useRef(0)

  useFrame((state, delta) => {
    if (!enabled) return
    tRef.current += delta * 0.7
    const t = tRef.current
    // simple circular arc around scene center
    const radius = 5
    const x = Math.cos(t) * radius - 10
    const z = Math.sin(t) * radius + 14
    const y = 2 + Math.sin(t * 0.5) * 0.5
    camera.position.lerp(new THREE.Vector3(x, y, z), 0.05)
    camera.lookAt(6.5, -1, 6) // mirar hacia caballo 
  })
  return null
}