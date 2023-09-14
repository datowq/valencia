import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import WebsiteTexture from './JvcScreen'

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
  const jvcref = useRef()
  
  const originalCameraPosition = new THREE.Vector3(0, 4, 14);

  const targetRotation = new THREE.Quaternion();
  const originalRotation = new THREE.Quaternion();
  const tempQuaternion = new THREE.Quaternion();

  useFrame((state) => {
    if (props.isDown) {
      // Calculate the position to look at (the position of the JVC TV)
      const lookAtPosition = jvcref.current.position.clone()
  
      // Adjust the lookAt position to make it look slightly higher
      lookAtPosition.y += 10
      lookAtPosition.z += 20
  
      state.camera.getWorldQuaternion(targetRotation)
      tempQuaternion.copy(state.camera.quaternion)
      state.camera.lookAt(lookAtPosition)
      state.camera.getWorldQuaternion(originalRotation)
      state.camera.quaternion.copy(tempQuaternion)
  
      state.camera.quaternion.slerp(targetRotation, 0.03)
  
      const cameraPosition = state.camera.position.clone()
      cameraPosition.y -= 0.13
    
      cameraPosition.lerp(lookAtPosition, 0.03)
      state.camera.position.copy(cameraPosition)
    } else {
      state.camera.getWorldQuaternion(targetRotation)
      tempQuaternion.copy(state.camera.quaternion)
      state.camera.lookAt(0, 0, 0)
      state.camera.getWorldQuaternion(originalRotation)
      state.camera.quaternion.copy(tempQuaternion)
  
      state.camera.quaternion.slerp(targetRotation, 0.03)
  
      const cameraPosition = state.camera.position.clone()

      cameraPosition.lerp(originalCameraPosition, 0.03)
      state.camera.position.copy(cameraPosition)
    }
  })

  return (
    <group ref={jvcref} {...props} dispose={null}>
      <group rotation={[0, 0, -Math.PI]} scale={[5.981, 5.985, 3.997]}>
        <mesh geometry={nodes.Cube_1.geometry} material={materials.body} />
        <mesh geometry={nodes.Cube_2.geometry} material={props.isDown ? lowPolyMaterial : materials.screen} />
        <WebsiteTexture/>
        <mesh geometry={nodes.Cube_3.geometry} material={materials.bottom} />
        <mesh geometry={nodes.Cube_4.geometry} material={materials.buttons} />
      </group>
    </group>
  )
}

useGLTF.preload('/jvctv-transformed.glb')
