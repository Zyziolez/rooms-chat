import React, { useEffect, useRef } from 'react'

export default function NewVideo({refer}) {
    let videoSource = null;
    const videoRef = useRef(null)
    useEffect(() => {
        videoRef.current.srcObject = refer
    }, [])
    return (
        <div>
            <video src={videoSource} autoPlay={true} width='340px' height='180px'  muted={true}  ref={videoRef} />
        </div>
    )
}
