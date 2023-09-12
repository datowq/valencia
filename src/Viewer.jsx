import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, BakeShadows, Stage, Preload } from '@react-three/drei'
import { SNES } from './components/Snes'
import { Cartridge } from './components/Cartridge'
import { CanvasLoader } from "./Loader";

export const Viewer = () => {
    return (
        <Canvas
            frameloop='demand'
            shadows
            camera={{position: [0, 5, 15], fov: 25}}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader/>}>
                <Stage adjustCamera={0.75} environment='city' intensity={0.6}>
                    {/* <Cartridge position={[0,0.6,-0.3]} scale={0.4}/> */}
                    <Cartridge position={[0,3,-0.3]} scale={0.4}/>
                    <Cartridge position={[3.5,3,-0.3]} scale={0.4}/>
                    <Cartridge position={[-3.5,3,-0.3]} scale={0.4}/>
                    <SNES/>
                </Stage>
                <BakeShadows />
                <OrbitControls/>
            </Suspense>
            <Preload all/>
        </Canvas>
    )
}