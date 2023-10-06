import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame  } from '@react-three/fiber'
import { OrbitControls, BakeShadows, Text, Stage, Environment, Preload } from '@react-three/drei'
import { useSpring, useSprings, animated } from '@react-spring/three'
import { Autofocus, Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { useControls, folder, button } from "leva";
import useSound from 'use-sound';
import { SNES } from './components/Snes'
import { Cartridge } from './components/Cartridge'
import { CanvasLoader } from "./Loader";
import { JVCTV } from './components/Jvctv'



export const Viewer = () => {

    const numCartridges = 8
    const [activeCartridge, setActiveCartridge] = useState(3)
    const [downpressed, setDownpressed] = useState(false)
    const [selectedScreen, setSelectedScreen] = useState(-1)
    const [playSwitch] = useSound('d.mp3')
    const [playSelect] = useSound('mega.mp3')

    

    const getTargetScale = (cartridgeId) => (activeCartridge === cartridgeId ? 0.5 : 0.4);
    const [{ xpos }] = useSpring(() => ({ to: { xpos: 3.5 - 3.5 * activeCartridge} }), [activeCartridge])

    const scaleSprings = useSprings(
        numCartridges, 
        Array.from({ length: numCartridges }, (_, i) => ({
            scale: getTargetScale(i)
        }))
    )

    document.onkeydown = (e) => {
        switch(e.key) {
            case 'ArrowLeft':
            case 'A':
            case 'a':
                if(activeCartridge == 0 || downpressed) return
                setActiveCartridge(activeCartridge - 1)
                playSwitch()
                break
            case 'ArrowRight':
            case 'D':
            case 'd':
                if(activeCartridge == numCartridges - 1 || downpressed) return
                setActiveCartridge(activeCartridge + 1)
                playSwitch()
                break
            case 'Enter':
            case 'ArrowDown':
            case 'S':
            case 's':
                if(downpressed) return
                setDownpressed(true)
                setSelectedScreen(activeCartridge)
                playSelect()
                break
            case 'Backspace':
            case 'ArrowUp':
            case 'W':
            case 'w':
                setDownpressed(false)
                setSelectedScreen(-1)
                break
        }
    }

    return (
        <>
            <Canvas
                frameloop='always'
                shadows
                camera={{position: [0, 4, 14], fov: 25}}
                gl={{ preserveDrawingBuffer: true, antialias: true }}
            >
                <Suspense fallback={<CanvasLoader/>}>
                <ambientLight intensity={1} />
                <directionalLight
                    color={0xffffff}
                    intensity={2}
                    position={[500, 0, 500]}
                    castShadow
                    shadow-camera-top={1000}
                    shadow-camera-bottom={-1000}
                    shadow-camera-left={-1000}
                    shadow-camera-right={1000}
                    shadow-camera-near={1200}
                    shadow-camera-far={1000}
                    shadow-bias={0.0001}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={1024}
                />
                    
                    <animated.group position-x={xpos} position-z={0}>
                        {scaleSprings.map((spring, i) => (
                            <Cartridge
                                key={i}
                                isDown={downpressed}
                                activeCartridge={activeCartridge}
                                cartridgeId={i}  
                                position={[-3.5 + 3.5 * i, 0, -0.3]}
                                scale={spring.scale}
                                zIndexRange={[110, 0]}
                            />
                        ))}
                    </animated.group>
                    <JVCTV 
                        isDown={downpressed} 
                        cartridgeId={activeCartridge} 
                        selectedScreen={selectedScreen}
                        position={[0, 0, -30]}
                        zIndexRange={[40, 0]}
                    />
                    <SNES isDown={downpressed} cartridgeId={activeCartridge} position={[0, -1.5, 0]}/>
                    <BakeShadows />
                </Suspense>
                <Preload all/>
                {/* <OrbitControls/> */}
            </Canvas>
        </>
    )
}