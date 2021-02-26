import React from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import {useLoader } from 'react-three-fiber';
import Chrystal from '../textures/chrystal.jpg'

const Box = (props) => {

const gold = useLoader(TextureLoader, '/textures/gold.jpeg');
    return (
       
            <mesh position={[props.position.x, props.position.y, props.position.z]}>
              <boxBufferGeometry />
              <meshNormalMaterial map={gold} attach="material" />
            </mesh>
          )
   
}

export default Box
