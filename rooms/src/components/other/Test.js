import React,{ useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import ConnectWebcam from './ConnectWebcam'
import NewVideo from './NewVideo'

//i dont know what the hell is this and im afraid to touch it

const ThatVideoThing = ({videoSrc, videoRef}) => {
    return(
        <video src={videoSrc} autoPlay={true} muted={true} ref={videoRef} width='340px' height='180px'  />
    )
}

  export default function Test() {
let [peer, setPeer] = useState(new Peer(Math.floor(Math.random() * 10)))
const [text, setText] = useState('')
const videoSrc = useRef(null)
let videoSource = null;
    const videoRef = useRef(null)
    let [rray, setSrray] = useState([])
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

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

        peer.on('connection', (conn) => {
            conn.on('data', (data) => {
              console.log(data);
              const con = peer.connect(data)
              con.send('hejka')
            });
            conn.on('open', (mess) => {
              conn.send('hello!');
            });
            conn.on('video', (call) => {
                setSrray(e => [...e, [call.id, call.ref]])
                conn.send([peer.id, videoRef])
            })
            conn.on('admin', mess => {
                conn.send('whatsupp')
            })
          });
          peer.on('call', function(call) {
            getUserMedia({video: true, audio: true}, function(stream) {
              call.answer(stream); // Answer the call with an A/V stream.
              call.on('stream', function(remoteStream) {
                console.log('odebralem!')
                setSrray(e => [...e, remoteStream])
              });
            }, function(err) {
              console.log('Failed to get local stream' ,err);
            });
          });
    }, [])

    function handleChange (){
        const conn = peer.connect(text)
        conn.on('open', () =>{
            conn.send(peer.id)
        })
        getUserMedia({video: true, audio: true}, function(stream) {
            var call = peer.call(text, stream);
            call.on('stream', function(remoteStream) {
              console.log('polaczylem!')
              setSrray(e => [...e, remoteStream])
            });
          }, function(err) {
            console.log('Failed to get local stream' ,err);
          });
    }
      return (
          <div>
              <h1> twoje id: {peer.id}</h1>
              <input type='text' value={text} onChange={e => setText(e.target.value)} />
              <button onClick={handleChange} >Connect</button>
              {rray.map((k, i) => 
                {
                    return(
                       <div key={i}>
                            gościa: <NewVideo refer={k}  />
                       </div>
                    )
                
                }
                
                )}
                mój:
                <video src={videoSource} autoPlay={true} width='340px' height='180px'  muted={true}  ref={videoRef}  />
          </div>
      )
  }
  