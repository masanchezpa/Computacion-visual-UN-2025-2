import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export function Horse(props) {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/horse.glb')
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    console.log('Animaciones disponibles:', names)

    // Aplicar animación tipo "Ilde", es decir, que el caballo este quieto pero haciendo una animación por defecto
    const idleName =
      names.find((n) => n.toLowerCase().includes('ilde')) || names[0]

    if (idleName && actions[idleName]) {
      console.log('Reproduciendo animación:', idleName)
      actions[idleName].reset().fadeIn(0.5).play()
    }

    return () => {
      if (idleName && actions[idleName]) actions[idleName].fadeOut(0.5)
    }
  }, [actions, names])

  // Habilitar sombras y ajustar materiales
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      if (child.material) {
        child.material.roughness = 0.4
        child.material.metalness = 0.3
      }
    }
  })

  return (
    <group
      ref={group}
      dispose={null}
      scale={0.14}
      position={[6.5, -1, 6]}
      rotation={[0, Math.PI/1.5, 0]}
      {...props}
    >
      <primitive object={scene} />
    </group>
  )
}
