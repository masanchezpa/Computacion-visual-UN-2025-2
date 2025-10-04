import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import React from 'react'

export function CameraToggle({ isOrtho }) {
  if (isOrtho) {
    return <OrthographicCamera makeDefault position={[0, 8, 35]} zoom={60} near={0.1} far={200} />
  } else {
    return <PerspectiveCamera makeDefault fov={50} position={[40, 10, 25]} />
  }
}
