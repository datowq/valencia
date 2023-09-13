import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { animated } from '@react-spring/three'

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

const blackMat = new THREE.MeshStandardMaterial({
  color: 'black',
  side: THREE.DoubleSide
})

export const Cartridge = (props) => {
  const { nodes, materials } = useGLTF('/cartridge-transformed.glb')

  const lowPolyMaterial = materialsByCartridgeId[props.cartridgeId] || materialsByCartridgeId.default

  return (
    <animated.group {...props} dispose={null}>
      <group scale={[1, 1, 0.325]}>
        <mesh geometry={nodes.Mesh.geometry} material={lowPolyMaterial} />
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.backsticker} />
        <mesh geometry={nodes.Mesh_2.geometry} material={blackMat} />
        <mesh geometry={nodes.Mesh_3.geometry} material={materials.screws} />
      </group>
    </animated.group>
  )
}

useGLTF.preload('/cartridge-transformed.glb')
