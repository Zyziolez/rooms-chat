import React, { useEffect, useRef } from 'react'

//our video element shown in room

export default function MyVideo() {
    const videoRef = useRef(null)
    const connect = async () => {
        try{
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then( stream =>{
                videoRef.current.srcObject = stream
            })
        }catch(err) {
            console.log('no i tu sie zesralo')
        }
    }
    useEffect(() => {
        connect()
    }, [])
    return (
        <div>
            <video autoPlay={true} width='340px' height='180px'  muted={true}  ref={videoRef} />
        </div>
    )
}
