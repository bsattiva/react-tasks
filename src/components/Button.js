
import React, {useRef, Suspense,  useEffect, useState} from 'react'
import { extend } from 'react-three-fiber'
import { useFrame } from 'react-three-fiber'
import button from '../models/button.glb'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {useLoader } from 'react-three-fiber';
import * as THREE from "three";




const Button = (props) => {

    const PushButton = (props) => {
        const gltf = useLoader(GLTFLoader, button)
        return <primitive object={gltf.scene}  position={props.position} />
    }


    return (
 
        <Suspense fallback={<>Loading</>}>{props.visible && <PushButton  position={props.position}/>}</Suspense>
 
        
        
    )
}

export default Button
