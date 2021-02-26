import React, {useRef, Suspense,  useEffect, useState} from 'react'
import {Canvas, useFrame, useThree } from 'react-three-fiber'
import * as THREE from "three";
import useSound from 'use-sound';
import Grid from './Grid';
import Box from './Box';
import Moon from './Moon';
import thud from '../sounds/thud.wav';
import steps from '../sounds/steps.wav';


const Scena = () => {

    var rX = parseInt(Math.floor(Math.random() * Math.floor(7)));
    var [randX, setRandX] = useState(parseInt(Math.floor(Math.random() * Math.floor(7))));
    var [randZ, setRandZ] = useState(parseInt(Math.floor(Math.random() * Math.floor(7))));
    var [dir, setDir] = useState(new THREE.Vector3(x, y, z));
    var [direction, setDirection] = useState(null);
   // var dir = new THREE.Vector3(1, 2, 3);

    var [x, setX] = useState(0);
    var [y, setY] = useState(0);
    var [z, setZ] = useState(0);

    const [playThud] = useSound(thud); 
    const [playSteps, {stop}] = useSound(steps);

    var [position, setPosition] = useState([0, 0, 12]);
    var [meshIndex, setMeshIndex] = useState(19);
    var [distance, setDistance] = useState(5);

    var [speed, setSpeed] = useState(0);

    var [aspect, setAspect] = useState(0);
    var [meshPosition, setMeshPosition] = useState({x: randX, y:0, z:randZ});

    var [move, setMove] = useState('ArrowUp');
    var [moveChanged, setMoveChanged] = useState(false);

    var [played, setPlayed] = useState(false);

    var [rad, setRad] = useState(-0.08);

    const style = {
        width: '100%',
        height: '900px',
        background: 'black'
    }

    const keyup = (event) => {
     
        if (played) {
            setTimeout(stop, 600);
            setPlayed(false);
        }
        

        let key = event.key;
        // console.log("key: " + key);
        // console.log("move: " + move);
        if (key!== move) {
            setMoveChanged(true);
        } else {
            setMoveChanged(false);
        }
        
        if (key === 'ArrowUp') {
            setSpeed(0);
            
           } else if (key === 'ArrowRight') {
 
           } else if (key === 'ArrowLeft') {
 
           } else if (key === 'ArrowDown') {
            setSpeed(0);
           }

           setMove(key);    
    }


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


const Blaster = () => {
    return (
        <mesh>
            <cylinderBufferGeometry />
            <meshNormalMaterial attach="material" />
        </mesh>
    )
}

    const intersectArray = (arr, pos) => {
        let status = false;



        for (var i = 0; i<arr; i++) {

            console.log('position' + i);

            if (intersect(arr[i], pos)) {
                status = true;
                break;
            }
        }

    }

    const intersect = (pos1, pos2) =>{

        // console.log("POSITION 1: " + pos1.x + " " + pos1.y + " " + pos1.z);
        // console.log("POSITION 2: " + pos2.x + " " + pos2.y + " " + pos2.z);
        var diff = Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) + Math.abs(pos1.z - pos2.z);
        
 
        if (diff < 1 && !moveChanged) {
            if(speed !== 0) {
                playThud();
            console.log("OUCH!");
            console.log(moveChanged);    
        }
            return true;
        } else {

            if(speed !== 0) {

            console.log(moveChanged);
            console.log("DIFF: " + diff);
            }
            return false;
        }

    }
    
    const keydown = (event) => {

    let key = event.key;
    let keys = ['ArrowUp','ArrowRight','ArrowLeft','ArrowDown'];
    console.log("MESHPOSITION: " + meshPosition.x + " " + meshPosition.z + " " + randX);
  if (!played && keys.includes(key)) {
      playSteps();
      setPlayed(true);
  }
   
 
        
        
        if (key === 'ArrowUp') {
    
            setSpeed(0.1);
        } else if (key === 'ArrowRight') {
            setAspect(aspect + rad);
        } else if (key === 'ArrowLeft') {
            setAspect(aspect - rad);
        } else if (key === 'ArrowDown') {
            setSpeed(-0.1);
        }
    //    console.log(position);
     
    }
    const ref = useRef(null);
    useEffect(() => {
      
    }, [keydown])



    const Camera = (props) => {
      const ref = useRef()
      const { setDefaultCamera } = useThree()
     
     useEffect(() => void setDefaultCamera(ref.current), [])


  
     
      useFrame(() => {
 
        if (ref.current && !intersect(position, meshPosition))  {
 

            ref.current.rotation.y = aspect;
            ref.current.getWorldDirection(dir);
            ref.current.position.addScaledVector(dir, speed);
            setPosition(ref.current.position);

 
        } else {
            if (played && intersect(position, meshPosition)) {
                stop();
                setPlayed(false);
                setRad(-rad);
            }
            
        }
        
    }
          
          )
      return <perspectiveCamera ref={ref} {...props} />
    }
   const positions = []; 
   const bx = [];
   (() => {
    for (var i = 0; i< 7; i++) {
        for (var j = 0; j<7; j++) {
            bx.push(<Box position={{x: -5 + (i*2), y:0, z: -5 + (j*2)}} />);
            positions.push({x: -5 + (i*2), y:0, z: -5 + (j*2)});
        }
        
    }
    
    })();




//setMeshPosition(positions[Math.floor() * Math.floor(49)]);

    return (
        <>
            <Canvas style={style} tabIndex="0" onKeyDown={keydown} onKeyUp={keyup}>
                <Camera position={position} />
                <Light brightness={11.6} color={"#bdefff"}  />
                {/* <Blaster position={[115,0,10]} /> */}
                <Suspense fallback={<>Loading...</>}>  
                    {/* <Box position={meshPosition} /> */}
                    {/* <Box position={{x: 5, y:0, z:5}} /> */}
                    {
                        bx
                    }
               </Suspense>
                <Suspense fallback={<div>Moon loading :)</div>}>
                    <Moon position={{x:7, y:35, z:-113}} />
                </Suspense>
                <Suspense fallback={<>Loading...</>}>
                
                <Grid />
              </Suspense>
            </Canvas>
        </>
    )
}

export default Scena
