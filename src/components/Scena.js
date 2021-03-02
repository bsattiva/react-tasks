import React, {useRef, Suspense,  useEffect, useState} from 'react'
import {Canvas, useFrame, useThree } from 'react-three-fiber'
import * as THREE from "three";
import useSound from 'use-sound';
import Grid from './Grid';
import Box from './Box';
import Moon from './Moon';
import FireBall from './Boll';
import Monkey from './Monkey';
import Panel from './Panel';
 
import Control from './Control';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import thud from '../sounds/thud.wav';
import steps from '../sounds/steps.wav';
import laser from '../sounds/laser.wav';
import shot from '../sounds/shoot.wav';
import roar from '../sounds/roar.mp3';
import victory from '../sounds/victory.mp3';
import { getDefaultNormalizer } from '@testing-library/react';



const Scena = () => {

    
    var rX = parseInt(Math.floor(Math.random() * Math.floor(7)));
    var [shoot, setShoot] = useState(false);
    var [randX, setRandX] = useState(parseInt(Math.floor(Math.random() * Math.floor(7))));
    var [randZ, setRandZ] = useState(parseInt(Math.floor(Math.random() * Math.floor(7))));

    var [dir, setDir] = useState(new THREE.Vector3(x, y, z));
    var [monsterDir, setMonsterDir] = useState(new THREE.Vector3(-1,0,-1));
    var [direction, setDirection] = useState(null);
 
    var [x, setX] = useState(0);
    var [y, setY] = useState(0);
    var [z, setZ] = useState(0);

    const [playThud] = useSound(thud); 
    const [playSteps, {stop}] = useSound(steps);
    const [setPlayRoar] = useSound(roar);
    const [playLaser] = useSound(laser);
    const [playShoot] = useSound(shot);
    const [playVictory] = useSound(victory);

    var [position, setPosition] = useState([0, 0, 12]);
    var [ballPosition, setBallPosition] = useState({x:0, y:0, z:11.8});
    var [meshIndex, setMeshIndex] = useState(19);
    var [distance, setDistance] = useState(5);

    var [speed, setSpeed] = useState(0);

    var [aspect, setAspect] = useState(0);
    var [meshPosition, setMeshPosition] = useState({x: randX, y:0, z:randZ});

    var [move, setMove] = useState('ArrowUp');
    var [moveChanged, setMoveChanged] = useState(false);

    var [played, setPlayed] = useState(false);
    var [skull, setSkull] = useState(false);
    var [panel, setPanel] = useState(true);
    var [rad, setRad] = useState(-0.08);
    var [time, setTime] = useState(null);
    var [start, setStart] = useState(true);
    var [fireballs, setFireballs] = useState([<FireBall position={ballPosition} />]);
   // var [mPosition, setMposition] = useState([0,0.15,8]);
    var [mPosition, setMposition] = useState([randX,0.15,randZ]);
    var [win, setWin] = useState(0);
    const style = {
        width: '100%',
        height: '100vh',
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

        if(key === 't') {
           setTimeout(setVisible(false), 1000);
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
          <hemisphereLight
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



    const blowSkull = () => {
        setSkull(false);
        setPlayRoar();
        setTime(new Date());
        setWin(win + 1);
        if (win > 5) {
            playVictory();
            alert("YOU WIN!");
            setSpeed(0);
            setSkull(false);
            setPanel(true);
            setPosition([0,0,12]);
            
        }
    }  

    const intersectArray = (arr, pos) => {
        let status = false;



        for (var i = 0; i<arr; i++) {
 

            if (intersect(arr[i], pos)) {
                status = true;
                break;
            }
        }

    }

    const intersect = (pos1, pos2) =>{

 
        var diff = Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) + Math.abs(pos1.z - pos2.z);
        
 
        if (diff < 1 && !moveChanged) {
            if(speed !== 0) {
                playThud();
            console.log("OUCH!");
            console.log(moveChanged);    
        }
            return true;
        } else {

            
            return false;
        }

    }

 
    const containerRef = useRef();
    const { current } = containerRef;

 

 

  
    useEffect(() => {console.log("LOADEDDDD"); document.getElementsByTagName("canvas")[0].focus();}, [current]);

    const keydown = (event) => {
 
            let key = event.key;
            
            let keys = ['ArrowUp','ArrowRight','ArrowLeft','ArrowDown'];

            

            if (!played && keys.includes(key)) {
                playSteps();
                setPlayed(true);
            }
            
            if (key === 't') {
                setVisible(true);
                playLaser();
                // console.log("FIREBALL POSITION: " + ballPosition.x + " " + ballPosition.z)

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
 
     
    }
 

    const [visible, setVisible] = useState(false);
    const stopStart = () => {
        setPanel(false);
    }


      
    const skullHandler = () => {
 
        console.log("START")
        setPanel(false);
        setSkull(true);
        
    }

    const gameOver = () => {
        setPlayRoar();
        alert("GAME OVER!!!");
        setSpeed(0);
        setSkull(false);
        setPanel(true);
        setPosition([0,0,12]);
    }


    const setMonkey = (pos) => {
        setMposition(pos);
    }


    const Camera = (props) => {
      const ref = useRef()
      const { setDefaultCamera } = useThree()
     
     useEffect(() => void setDefaultCamera(ref.current), [])


  
     
      useFrame(() => {
 
        if (time !== null && !skull && ((new Date() - time)/1000 ) > 15) {
            console.log("TADA");
            setPlayRoar();
            setSkull(true);
       //     setMposition([0,0,11]);
            setTime(null);
        }


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
                gameOver();
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

 

    return (
        <>
            <Canvas style={style} tabIndex="0" onKeyDown={keydown} onKeyUp={keyup}>
                <Camera position={position} />
                <Light brightness={4.6} color={"#FFFFFF"}  />
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
 
                <FireBall position={ballPosition} pos={position} targ={mPosition} handler={blowSkull} dir={dir} visible={visible}/> 


                <Monkey position={mPosition} pos={position} monster={skull} dir={monsterDir} cadir={dir} handler={setMonkey} target={gameOver} />

                <Suspense fallback={<>Loading</>}>
                    <Panel position={[0,0,10]} visible={panel} handler={skullHandler}/>
                </Suspense>

                
            </Canvas>
        </>
    )
}

export default Scena
