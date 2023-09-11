import { Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from "./Loader";

const Folder = () => {

    const folder = useGLTF('/cartridge.gltf')

    return (
    <mesh>
        <pointLight intensity={1000} position={[0, 10, 5]}/>
        <primitive 
            object={folder.scene}
            scale={0.5}
            position={[0, 0, 0]}
        />
    </mesh>
    )

}

const FolderCanvas = () => {
    return (
        <Canvas
            frameloop='demand'
            shadows
            camera={{position: [6, 10, 14], fov: 25}}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader/>}>
                <OrbitControls 
                    // enableRotate={false}
                    // enablePan={false}
                    // enableZoom={false}
                />
                <Folder/>
            </Suspense>

            <Preload all/>
        </Canvas>
    )
}

export default FolderCanvas