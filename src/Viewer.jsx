import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, BakeShadows, Stage, Preload } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { SNES } from './components/Snes'
import { Cartridge } from './components/Cartridge'
import { CanvasLoader } from "./Loader";

export const Viewer = () => {

    const [activeCartridge, setActive] = useState()
    const [selectedCartridge, setSelected] = useState(-1)

    const animations = {
        0: useSpring({ scale: [activeCartridge === 0 ? 0.5 : 0.4, activeCartridge === 0 ? 0.5 : 0.4, activeCartridge === 0 ? 0.5 : 0.4] }),
        1: useSpring({ scale: [activeCartridge === 1 ? 0.5 : 0.4, activeCartridge === 1 ? 0.5 : 0.4, activeCartridge === 1 ? 0.5 : 0.4] }),
        2: useSpring({ scale: [activeCartridge === 2 ? 0.5 : 0.4, activeCartridge === 2 ? 0.5 : 0.4, activeCartridge === 2 ? 0.5 : 0.4] })
    }

    return (
        <Canvas
            frameloop='always'
            shadows
            camera={{position: [0, 5, 15], fov: 25}}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader/>}>
                <Stage adjustCamera={0.75} environment='city' intensity={0.6}>
                    {/* <Cartridge position={[0,0.6,-0.3]} scale={0.4}/> */}
                    <animated.group>
                        <Cartridge onPointerOver={() => setActive(0)} 
                            position={[-3.5, 3, -0.3]} 
                            scale={animations[0].scale} />
                        <Cartridge onPointerOver={() => setActive(1)} 
                            position={[0, 3, -0.3]} 
                            scale={animations[1].scale} />
                        <Cartridge onPointerOver={() => setActive(2)} 
                            position={[3.5, 3, -0.3]} 
                            scale={animations[2].scale} />
                    </animated.group>
                    <SNES/>
                </Stage>
                <BakeShadows />
                <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
            </Suspense>

            <Preload all/>
        </Canvas>
    )
}