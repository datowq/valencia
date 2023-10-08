import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import SNESmodel from '/models/snes-transformed.glb'

const materialsByCartridgeId = {
  0: new THREE.MeshToonMaterial({
    color: '#bf5b5b',
    side: THREE.DoubleSide,
    transparent: 1,
  }),
  1: new THREE.MeshToonMaterial({
    color: '#c6b955',
    side: THREE.DoubleSide,
  }),
  2: new THREE.MeshToonMaterial({
    color: '#86b460',
    side: THREE.DoubleSide,
  }),
  3: new THREE.MeshToonMaterial({
    color: '#3c8d88',
    side: THREE.DoubleSide,
  }),
  4: new THREE.MeshToonMaterial({
    color: '#595758',
    side: THREE.DoubleSide,
  }),
  default: new THREE.MeshToonMaterial({
    color: '#595758',
    side: THREE.DoubleSide,
  }),
}
export const SNES = (props) => {
  const { nodes, materials } = useGLTF(SNESmodel)

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

useGLTF.preload(SNESmodel)
