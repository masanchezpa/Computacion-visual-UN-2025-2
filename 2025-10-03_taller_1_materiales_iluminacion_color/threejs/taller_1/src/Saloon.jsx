import { useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

export function Saloon(props) {

  const { scene } = useGLTF('/models/saloon.glb')

    
  
  useEffect(() => {
    scene.traverse((obj) => {
        if (obj.name.toLowerCase().includes('plane')) {
        obj.visible = false
        }
    })
  }, [scene])

  return (
    <primitive
      object={scene}
      scale={0.25}
      position={[23, -1.2, -10]} 
      rotation={[0, Math.PI / 2, 0]}
      {...props}
    />
  )
}
