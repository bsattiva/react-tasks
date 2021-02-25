import React, {useRef, useEffect, useState} from 'react'
import {Canvas, useFrame, useThree } from 'react-three-fiber'
import * as THREE from "three";
import { ZeroCurvatureEnding } from 'three';

const Scena = () => {
    var [dir, setDir] = useState(new THREE.Vector3(x, y, z));
    var [direction, setDirection] = useState(null);
   // var dir = new THREE.Vector3(1, 2, 3);

    var [x, setX] = useState(0);
    var [y, setY] = useState(0);
    var [z, setZ] = useState(0);

    var [position, setPosition] = useState([0, 0, 5]);

    var [distance, setDistance] = useState(5);

    var [speed, setSpeed] = useState(0);

    var [aspect, setAspect] = useState(0);

    const rad = 0.09;

    const style = {
        width: '100%',
        height: '900px'
    }

    const keyup = (event) => {
     
        let key = event.key;

        if (key === 'ArrowUp') {
            setSpeed(0);
           } else if (key === 'ArrowRight') {
 
           } else if (key === 'ArrowLeft') {
 
           } else if (key === 'ArrowDown') {
            setSpeed(0);
           }


 
    }
    
    const keydown = (event) => {


  
   
 
        
        let key = event.key;
        if (key === 'ArrowUp') {
    
            setSpeed(0.1);
        } else if (key === 'ArrowRight') {
            setAspect(aspect + rad);
        } else if (key === 'ArrowLeft') {
            setAspect(aspect - rad);
        } else if (key === 'ArrowDown') {
            setSpeed(-0.1);
        }
        console.log(position);
     
    }
    const ref = useRef(null);
    useEffect(() => {
      
    }, [keydown])


    function Box() {
        return (
          <mesh>
            <boxBufferGeometry />
            <meshNormalMaterial />
          </mesh>
        )
      }




    const Camera = (props) => {
      const ref = useRef()
      const { setDefaultCamera } = useThree()
     
     useEffect(() => void setDefaultCamera(ref.current), [])

  //   useEffect(() => {setPosition(ref.current.position)}, [speed])
  
     
      useFrame(() => {
       
        if (ref.current)  {
 

            ref.current.rotation.y = aspect;
            ref.current.getWorldDirection(dir);
            ref.current.position.addScaledVector(dir, speed);
            setPosition(ref.current.position);
            

//            setDir(dir);
 
 
        }
        
    }
          
          )
      return <perspectiveCamera ref={ref} {...props} />
    }
    

    return (
        <>
            <Canvas style={style} tabIndex="0" onKeyDown={keydown} onKeyUp={keyup}>
                <Camera position={position} />
                <Box />
            </Canvas>
        </>
    )
}

export default Scena
