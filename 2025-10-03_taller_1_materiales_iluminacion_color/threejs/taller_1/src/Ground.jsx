import { useTexture } from '@react-three/drei'

export function Ground() {
  const textures = useTexture({
    map: '/textures/ground/Ground088_1K-JPG_Color.jpg',
    normalMap: '/textures/ground/Ground088_1K-JPG_NormalGL.jpg',
    roughnessMap: '/textures/ground/Ground088_1K-JPG_Roughness.jpg',
    aoMap: '/textures/ground/Ground088_1K-JPG_AmbientOcclusion.jpg',
    displacementMap: '/textures/ground/Ground088_1K-JPG_Displacement.jpg'
  })

  return (
    <mesh rotation-x={-Math.PI / 2} position={[15, -1.04, -6]} receiveShadow>
      <planeGeometry args={[55, 90, 512, 512]} />
      <meshStandardMaterial
        {...textures}
        displacementScale={0.25}
        roughness={1}
      />
    </mesh>
  )
}
