import React from 'react'
export function LightPresets({ isDay }) {
  // key: sol principal (ya controlado por Sun component)
  // fill: luz de relleno fría
  // rim: contraluz
  return (
    <>
      {/* fill (relleno) */}
      <directionalLight
        position={[-5, 3, -3]}
        intensity={isDay ? 0.35 : 0.15}
        color={isDay ? '#cfe7ff' : '#552200'}
      />
      {/* rim (contraluz) */}
      <directionalLight
        position={[0, 2.5, -5]}
        intensity={isDay ? 0.45 : 0.28}
        color={isDay ? '#fff4d6' : '#ff9966'}
      />
    </>
  )
}
