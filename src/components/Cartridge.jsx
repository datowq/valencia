import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export const Cartridge = (props) => {
  const { nodes, materials } = useGLTF('/cartridge-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={[1, 1, 0.325]}>
        <mesh geometry={nodes.Mesh.geometry} material={materials.body} />
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.backsticker} />
        <mesh geometry={nodes.Mesh_2.geometry} material={materials.frontsticker} />
        <mesh geometry={nodes.Mesh_3.geometry} material={materials.screws} />
      </group>
    </group>
  )
}

useGLTF.preload('/cartridge-transformed.glb')
