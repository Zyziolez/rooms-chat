import React, { useEffect, useRef } from 'react'

export default function ConnectWebcam() {
    let videoSource = null;
    const videoRef = useRef(null)
    const connect = async () => {
        try{
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then( stream =>{
                videoRef.current.srcObject = stream
            })
        }catch{
            console.log('error')
        }
    }
    useEffect(() => {
        connect()
    }, [])
    return (
        <div>
            <video src={videoSource} autoPlay={true} width='340px' height='180px'  muted={true}  ref={videoRef} />
        </div>
    )
}
