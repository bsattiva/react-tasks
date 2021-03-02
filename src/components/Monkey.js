import React, {useRef, Suspense,  useEffect, useState} from 'react'
import { extend } from 'react-three-fiber'
import { useFrame } from 'react-three-fiber'
import monster from '../models/monkey.glb'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {useLoader } from 'react-three-fiber';
import * as THREE from "three";


function Light({ brightness, color }) {
    return (
      <rectAreaLight
        width={3}
        height={3}
        intensity={brightness}
        color={color}
        position={[5, 1, 4]}
        lookAt={[0, 0, 0]}
        penumbra={2}
        castShadow
      />
    );
  }

const Monster =(props) => {

const ref = useRef();
var [dir, setDir] = useState(props.dir);    
const speed = 0.02;
const [cam, setCam] = useState(new THREE.Vector3(props.pos.x, props.pos.y, props.pos.z));
 

    const rand = () => {
        return Math.floor(Math.rand() * Math.floor(2))
    }

    const getVect = () => {

        if (!isNaN(position[0]) && !isNaN(props.pos.x)) {
        let vec = [position[0] - props.pos.x, position[1] - props.pos.y, position[2] - props.pos.z]; 
        
        let v = new THREE.Vector3(vec[0],0,vec[2]).normalize();
        console.log(v);
        return v;  
        } else {
            setPosition([0,0,7]);
            return new THREE.Vector3(0,0,1);
        }
        
    }


    //  useEffect(() => {
         
    //     if (ref.current && ref.current.position.x > 10) {
    //         setDir(new THREE.Vector3(-dir.x, 0, dir.z));
      
    //     } else if (ref.current && ref.current.position.x < -3) {
    //         setDir(new THREE.Vector3(-dir.x, 0, dir.z));
 
    //     }
        
    //     if (ref.current && ref.current.position.z > 13) {
    //         setDir(new THREE.Vector3(dir.x, 0, -dir.z));
 
    //     } else if (ref.current && ref.current.position.z < -3) {
    //        setDir(new THREE.Vector3(dir.x, 0, -dir.z));
  
    //     }
    //  }, [])


// useEffect(() => {
    
//     if (ref.current && ref.current.position.x > 10) {
//          ref.current.position.lookAt(new THREE.Vector3(-dir.x, 0, dir.z))
//     } else if (ref.current && ref.current.position.x < -3) {
        
//     }
    
//     if (ref.current && ref.current.position.z > 13) {
        
//     } else if (ref.current && ref.current.position.z < -3) {
         
//     }
// }, [ref.current])


var [position, setPosition] = useState(props.position);
var [vec, setVec] = useState(props.dir);

useFrame(() => {
    if (ref.current) {
 //   console.log(ref.current.position.distanceTo(props.pos));

    if (ref.current.position.distanceTo(props.pos) < 1) {
        props.over();
    } else {


       props.handler(ref.current.position);

        if (ref.current.position.x > 10 || ref.current.position.x < -3) {
         
            setDir(getVect());
        }


        if (ref.current.position.z >13 || ref.current.position.z < 1) {
            setDir(getVect());
        }
 
        ref.current.rotation.y += 0.01;
        ref.current.position.addScaledVector(dir, speed);
        
    }
}
    
})


    const gltf = useLoader(GLTFLoader, monster)
    return <primitive object={gltf.scene} scale={[0.025, 0.025, 0.025]} position={position} ref={ref} />
}



const Monkey = (props) => {


    return (
        <>
        <Suspense fallback={<>Loading</>}>{props.monster && <Monster dir={props.dir} cadir={props.cadir} pos={props.pos} over={props.target} handler={props.handler} position={props.position}/>}</Suspense>
        </>
        
        
    )
}

export default Monkey
