import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import AnimatedMesh from './components/AnimatedMesh'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 2.5, 6], fov: 60 }}>
        {/* iluminación */}
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          intensity={0.8}
          position={[5, 8, 5]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* plano simple */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]} receiveShadow>
          <planeGeometry args={[15, 15]} />
          <meshStandardMaterial metalness={0.5} roughness={1.0} />
        </mesh>

        <Suspense fallback={null}>
          {/*cubo que sigue la trayectoria circular */}
          <AnimatedMesh
            type="box"
            path="circular"
            radius={2}
            amplitude={0.5}
            speed={1}
            position={[0, 0.7, 0]}
          />
        </Suspense>

        {/* controles */}
        <OrbitControls enablePan enableZoom enableRotate />
        <Stats />
      </Canvas>
    </div>
  )
}

