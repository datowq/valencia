import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export const SNES = (props) => {
  const { nodes, materials } = useGLTF('/snes-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.PaletteMaterial001} scale={[1.435, 0.445, 1.721]} />
    </group>
  )
}

useGLTF.preload('/snes-transformed.glb')
