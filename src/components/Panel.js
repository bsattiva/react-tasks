import React, {Suspense, useState} from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import {useLoader } from 'react-three-fiber';
import but from '../textures/but.png'

const Panel = (props) => {

    const button = useLoader(TextureLoader, but);
    var [position, setPosition] = useState(props.position)
    return (
        
        <Suspense fallback={<>Loading</>}>
        {props.visible && (
        //<mesh position={props.position} onClick={()=>{setClick(!click)}}>
        <mesh position={position} onClick={props.handler}>
            <planeBufferGeometry attach="geometry" args={[3,3]}/>
            <meshBasicMaterial map={button} attach="material" />
        </mesh>
        )}
        </Suspense>
    )
}

export default Panel
