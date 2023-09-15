import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const materialsByCartridgeId = {
  0: new THREE.MeshStandardMaterial({
    color: '#EF476F',
    side: THREE.DoubleSide,
  }),
  1: new THREE.MeshStandardMaterial({
    color: '#06D6A0',
    side: THREE.DoubleSide,
  }),
  2: new THREE.MeshStandardMaterial({
    color: '#FFA69E',
    side: THREE.DoubleSide,
  }),
  3: new THREE.MeshStandardMaterial({
    color: '#2D3047',
    side: THREE.DoubleSide,
  }),
  default: new THREE.MeshStandardMaterial({
    color: '#2D3047',
    side: THREE.DoubleSide,
  }),
}
export const SNES = (props) => {
  const { nodes, materials } = useGLTF('/snes-transformed.glb')

  const lowPolyMaterial = materialsByCartridgeId[props.cartridgeId] || materialsByCartridgeId.default

  return (
    <group {...props} dispose={null}>
      <group scale={[1.435, 0.445, 1.721]}>
        <mesh geometry={nodes.Cube_1.geometry} material={materials.PaletteMaterial001} />
        <mesh geometry={nodes.Cube_2.geometry} material={lowPolyMaterial} />
        <mesh geometry={nodes.Cube_3.geometry} material={materials.PaletteMaterial001} />
        <mesh geometry={nodes.Cube_4.geometry} material={materials.PaletteMaterial001} />
        <mesh geometry={nodes.Cube_5.geometry} material={lowPolyMaterial} />
      </group>
    </group>
  )
}

useGLTF.preload('/snes-transformed.glb')
