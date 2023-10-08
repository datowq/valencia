import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import '../App.css'

const materialsByCartridgeId = {
  0: new THREE.MeshToonMaterial({
    color: '#EF476F',
    side: THREE.FrontSide,
    transparent: 1,
  }),
  1: new THREE.MeshToonMaterial({
    color: '#06D6A0',
    side: THREE.DoubleSide,
  }),
  2: new THREE.MeshToonMaterial({
    color: '#FFA69E',
    side: THREE.DoubleSide,
  }),
  3: new THREE.MeshToonMaterial({
    color: '#2D3047',
    side: THREE.DoubleSide,
  }),
  4: new THREE.MeshToonMaterial({
    color: '#2D3047',
    side: THREE.DoubleSide,
  }),
  5: new THREE.MeshToonMaterial({
    color: '#EF476F',
    side: THREE.DoubleSide,
  }),
  default: new THREE.MeshToonMaterial({
    color: '#2D3047',
    side: THREE.DoubleSide,
  }),
}

const invisibleMaterial = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0,
});

const noise = 'https://datowq.github.io/bouncingemote/'
const sites = [
  'https://iframetester.com/',
  'https://www.urbandictionary.com/define.php?term=Pog',
  'https://notepoint.vercel.app/',
  'https://iframetester.com/',
  'https://notepoint.vercel.app/',
  'https://hack.uclaacm.com/',
  'https://hoth.uclaacm.com/',
  'https://sites.google.com/view/diahsdas8dyas8dbuq2bdu1bdb2u1/home'
]

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
      // setTimeout(() => {
        // Calculate the position to look at (the position of the JVC TV)
        const lookAtPosition = jvcref.current.position.clone();
  
        // Adjust the lookAt position to make it look slightly higher
        lookAtPosition.y += 10;
        lookAtPosition.z += 20;
  
        state.camera.getWorldQuaternion(targetRotation);
        tempQuaternion.copy(state.camera.quaternion);
        state.camera.lookAt(lookAtPosition);
        state.camera.getWorldQuaternion(originalRotation);
        state.camera.quaternion.copy(tempQuaternion);
  
        state.camera.quaternion.slerp(targetRotation, 0.3);
  
        const cameraPosition = state.camera.position.clone();
        cameraPosition.y -= 0.13;
  
        cameraPosition.lerp(lookAtPosition, 0.03);
        state.camera.position.copy(cameraPosition);
      // }, 200)
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
        {/* <mesh geometry={nodes.Cube_2.geometry} material={props.isDown ? invisibleMaterial : materials.screen} 
        > */}
        <Html 
          className='content'
          transform
          occlude='blending' 
          position-z={0.78}
          position-y={-0.137}
          distanceFactor={0.56}
          zIndexRange={[50, 0]}
          >
            <iframe
              //src = -1 for inception
              src={props.selectedScreen >= 0 ? sites[props.selectedScreen] : noise}
              style={{
                transform: 'scale(-1)',
                position: 'relative',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%'
              }}
             />
        </Html>
        {/* </mesh> */}
        <mesh geometry={nodes.Cube_3.geometry} material={materials.bottom} />
        <mesh geometry={nodes.Cube_4.geometry} material={materials.buttons} />
      </group>
    </group>
  )
}

useGLTF.preload('/jvctv-transformed.glb')
