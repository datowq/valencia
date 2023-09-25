import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import '../App.css'

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

const blackMat = new THREE.MeshStandardMaterial({
  color: 'black',
  side: THREE.DoubleSide
})

const text = [
  'PROJECTS',
  'ABOUT',
  'CONTACT',
  'CREDITS'
]

export const Cartridge = (props) => {
  const { nodes, materials } = useGLTF('/cartridge-transformed.glb')

  const lowPolyMaterial = materialsByCartridgeId[props.cartridgeId] || materialsByCartridgeId.default

  const [{ ypos }] = useSpring(() => ({ to: 
  { ypos: (props.isDown && props.activeCartridge === props.cartridgeId) ? -0.8 : 1.5 }}), 
  [props.isDown])

  return (
    <animated.group {...props} position-y={ypos} dispose={null}>
      <group scale={[1, 1, 0.325]}>
        <Html 
          wrapperClass='cartridgetext'
          occlude
          castShadow
          zIndexRange={[150, 0]} 
          receiveShadow
          transform 
          position-z={1.23}
          position-y={1}
        >
            
          {text[props.cartridgeId]}
        </Html>
        <mesh geometry={nodes.Mesh.geometry} material={lowPolyMaterial} />
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.backsticker} />
        <mesh geometry={nodes.Mesh_2.geometry} material={blackMat} />
        <mesh geometry={nodes.Mesh_3.geometry} material={materials.screws} />
      </group>
    </animated.group>
  )
}

useGLTF.preload('/cartridge-transformed.glb')
