// src/Wagon.jsx
import { useGLTF } from '@react-three/drei'

export function Cowboy(props) {
  const { scene } = useGLTF('/models/cowboy.glb')

  return (
    <primitive
      object={scene}
      scale={0.015}
      position={[8, -0.5, 0.5]} 
      rotation={[0, 2.3, 0]}
      {...props}
    />
  )
}
