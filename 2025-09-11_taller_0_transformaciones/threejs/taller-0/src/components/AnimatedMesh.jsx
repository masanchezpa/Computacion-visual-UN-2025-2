import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'


export default function AnimatedMesh({
  radius = 2,        // radio de la trayectoria circular
  speed = 1,         // velocidad angular
  baseY = 0,         // altura base del cubo
  position = [0, 0, 0], // centro de la trayectoria
}) {
  const mesh = useRef()

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() * speed

    // rotación sobre el propio eje
    mesh.current.rotation.x += 0.6 * delta
    mesh.current.rotation.y += 1.2 * delta

    // traslación circular en plano XZ
    mesh.current.position.x = position[0] + Math.cos(t) * radius
    mesh.current.position.z = position[2] + Math.sin(t) * radius
    mesh.current.position.y = baseY

    // escalado suave 
    const s = 1 + Math.sin(t) * 0.25
    mesh.current.scale.set(s, s, s)
  })

  return (
    <mesh ref={mesh} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff6b6b" metalness={0.3} roughness={0.6} />
    </mesh>
  )
}