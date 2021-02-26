import React from 'react'

const Moon = (props) => {
    return (
        <mesh position={[props.position.x, props.position.y, props.position.z]}>
            <sphereGeometry  attach="geometry" args={[2, 32, 32]}/>
            <meshBasicMaterial color="#E5FFCC" attach="material" />
        </mesh>
    )
}

export default Moon
