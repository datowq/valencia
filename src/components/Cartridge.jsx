import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import cartridgemodel from '/models/cartridge-transformed.glb'
import cartridge_data from '../data/cartridges.json'
import '../App.css'

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
const blackMat = new THREE.MeshStandardMaterial({
  color: 'black',
  side: THREE.DoubleSide
})

const catridge_label = cartridge_data.cartridgeText

export const Cartridge = (props) => {
  const { nodes, materials } = useGLTF(cartridgemodel)

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
            
          {catridge_label[props.cartridgeId]}
        </Html>
        <mesh geometry={nodes.Mesh.geometry} material={lowPolyMaterial} />
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.backsticker} />
        <mesh geometry={nodes.Mesh_2.geometry} material={blackMat} />
        <mesh geometry={nodes.Mesh_3.geometry} material={materials.screws} />
      </group>
    </animated.group>
  )
}

useGLTF.preload(cartridgemodel)
