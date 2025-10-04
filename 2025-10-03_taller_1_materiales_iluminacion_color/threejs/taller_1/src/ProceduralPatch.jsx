import React, { useMemo } from 'react'
import * as THREE from 'three'

function makeChecker(size=512, cells=8, colA='#7b5b3a', colB='#c9a877') {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  const cell = size / cells
  for (let y=0;y<cells;y++){
    for (let x=0;x<cells;x++){
      ctx.fillStyle = (x+y)%2===0 ? colA : colB
      ctx.fillRect(x*cell,y*cell,cell,cell)
    }
  }
  return new THREE.CanvasTexture(c)
}

function makeNoise(size=512) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  for (let i=0;i<size*size;i++){
    const v = Math.floor(Math.random()*255)
    img.data[i*4] = img.data[i*4+1] = img.data[i*4+2] = v
    img.data[i*4+3] = 255
  }
  ctx.putImageData(img,0,0)
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(4,4)
  return tex
}

export function ProceduralPatch({ position=[2.8, 1, 0.9], size=[10,10] }) {
  const checker = useMemo(()=> makeChecker(512, 12), [])
  const noise = useMemo(()=> makeNoise(512, 60), [])

  return (
    <mesh position={position} rotation-x={-Math.PI/2} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial
        map={checker}
        roughnessMap={noise}
        metalness={0}
        roughness={0.9}
        aoMapIntensity={1}
      />
    </mesh>
  )
}
