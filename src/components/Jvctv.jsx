import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const materialsByCartridgeId = {
  0: new THREE.MeshStandardMaterial({
    color: '#FCCA46',
    side: THREE.DoubleSide,
  }),
  1: new THREE.MeshStandardMaterial({
    color: '#FE7F2D',
    side: THREE.DoubleSide,
  }),
  2: new THREE.MeshStandardMaterial({
    color: '#F15BB5',
    side: THREE.DoubleSide,
  }),
  default: new THREE.MeshStandardMaterial({
    color: '#F15BB5',
    side: THREE.DoubleSide,
  }),
}

export function JVCTV(props) {
  const { nodes, materials } = useGLTF('/jvctv-transformed.glb')

  const lowPolyMaterial = materialsByCartridgeId[props.cartridgeId] || materialsByCartridgeId.default

  return (
    <group {...props} dispose={null}>
      <group rotation={[0, 0, -Math.PI]} scale={[5.981, 5.985, 3.997]}>
        <mesh geometry={nodes.Cube_1.geometry} material={materials.body} />
        <mesh geometry={nodes.Cube_2.geometry} material={props.isDown ? lowPolyMaterial : materials.screen} />
        <mesh geometry={nodes.Cube_3.geometry} material={materials.bottom} />
        <mesh geometry={nodes.Cube_4.geometry} material={materials.buttons} />
      </group>
    </group>
  )
}

useGLTF.preload('/jvctv-transformed.glb')
