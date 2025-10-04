// src/App.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState, useMemo } from 'react'
import * as THREE from 'three'

// Componentes principales
import { Ground } from './Ground'
import { Horse } from './Horse'
import { Saloon } from './Saloon'
import { Wagon } from './Wagon'
import { Cowboy } from './Cowboy'
import { Sun } from './Sun'

// Nuevos componentes
import { CameraToggle } from './CameraToggle'
import { CameraPath } from './CameraPath'
import { LightPresets } from './LightPresets'
import { ProceduralPatch } from './ProceduralPatch'


export default function App() {
  const [preset, setPreset] = useState('day')
  const [isOrtho, setIsOrtho] = useState(false)
  const [cameraPathEnabled, setCameraPathEnabled] = useState(false)

  const isDay = preset === 'day'

  // Colores dinámicos del cielo y ambiente (modelo HSL)
  const { skyColor, ambientColor } = useMemo(() => {
    const sky = new THREE.Color()
    const ambient = new THREE.Color()

    if (isDay) {
      // Día: cielo azul brillante, luz fría
      sky.setHSL(0.55, 0.7, 0.6)
      ambient.setHSL(0.55, 0.4, 0.9)
    } else {
      // Atardecer: tonos cálidos naranjas
      sky.setHSL(0.08, 0.8, 0.3)
      ambient.setHSL(0.08, 0.6, 0.4)
    }

    return { skyColor: sky, ambientColor: ambient }
  }, [isDay])

  return (
    <>
      {/* === Botones de control === */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        <button
          onClick={() => setPreset(isDay ? 'sunset' : 'day')}
          style={btnStyle}
        >
          Cambiar a {isDay ? 'atardecer' : 'día'}
        </button>
        <button onClick={() => setIsOrtho(!isOrtho)} style={{ ...btnStyle, marginTop: 10 }}>
          Vista {isOrtho ? 'perspectiva' : 'ortográfica'}
        </button>
        <button
          onClick={() => setCameraPathEnabled(!cameraPathEnabled)}
          style={{ ...btnStyle, marginTop: 10 }}
        >
          {cameraPathEnabled ? 'Detener recorrido' : 'Recorrido cámara'}
        </button>
      </div>

      {/* Indicador visual del color del cielo */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: '50px',
          height: '50px',
          backgroundColor: skyColor.getStyle(),
          borderRadius: '10px',
          border: '2px solid white',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          zIndex: 1,
        }}
        title={`Cielo (${isDay ? 'día' : 'atardecer'}) - ${skyColor.getStyle()}`}
      ></div>

      {/* === Escena 3D === */}
      <Canvas shadows camera={{ position: [-5, 1.5, 3], fov: 50 }}>
        {/* Cámara activa (perspectiva u ortográfica) */}
        <CameraToggle isOrtho={isOrtho} />

        {/* Fondo dinámico */}
        <color attach="background" args={[skyColor]} />

        {/* Luz ambiental + esquema key/fill/rim */}
        <ambientLight intensity={isDay ? 0.5 : 0.25} color={ambientColor} />
        <LightPresets isDay={isDay} />

        {/* Sol animado (PBR + movimiento) */}
        <Sun isDay={isDay} />

        {/* Escena principal */}
        <Ground />
        <Horse />
        <Saloon />
        <Wagon isDay={isDay} />
        <Cowboy />

        {/* Parche procedural junto al vagón */}
        <ProceduralPatch position={[6, -0.9, 2]} size={[4, 4]} />

        {/* Recorrido automático de cámara */}
        <CameraPath enabled={cameraPathEnabled} />

        {/* Control manual de cámara */}
        <OrbitControls target={[2.5, 0, 1]} />
      </Canvas>
    </>
  )
}

// Estilo de los botones
const btnStyle = {
  background: 'rgba(255,255,255,0.7)',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  display: 'block',
}
