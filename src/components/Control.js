import React, {Suspense, useState, useRef} from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import {useLoader, useFrame } from 'react-three-fiber';
import pan from '../textures/panel.png'

const Control = (props) => {
    const panel = useLoader(TextureLoader, pan);

    var [position, setPosition] = useState(props.position);

    var ref = useRef();
    useFrame(() => {
        if (ref.current) {
            setPosition([props.position.x, 0, props.position.z -2]);
        }
    })
 
    return (
        
        <Suspense fallback={<>Loading</>}>

        <mesh position={position} onClick={props.handler}>
            <circleBufferGeometry attach="geometry" args={[3,3]}/>
            <meshBasicMaterial map={panel} attach="material" />
        </mesh>
        
        </Suspense>
    )
}

export default Control
