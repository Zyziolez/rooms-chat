import React, { useEffect, useState, useRef } from 'react'
import openSocket from 'socket.io-client'
import { Redirect } from 'react-router-dom';
import Peer from 'peerjs';
import {Chat, Users} from './video stuff/Chat&Users'
import { notMineDontTouch, reportRoom } from './other/functions';
import {pop} from '../index'
import {useRecoilState} from 'recoil'
import UltimatePop from './other/UltimatePop';
import MyVideo from './video stuff/MyVideo';

const socket = openSocket(window.location.origin, {secure: true});

//this code is nasty so get ready

export default function Room() {
    const [chat, setChat] = useState([])
    const [goHome, setGoHome] = useState(false)
    const [users, setUsers] = useState([])
    const [roomsName, setRoomsName] = useState('')
    const [chatMessage, setChatMessage] = useState('')
    const [maxUsers, setMaxUsers] = useState(0)
    const [ids, setIds] = useState([])
    const inputFocus = useRef(null)
    const [open, setOpen] = useRecoilState(pop)
    const [myPP, setMyPP] = useState('')
    const videoRef = useRef(null)
    const idkRef = useRef(null)

    //sends this rooms id from link to backend to recognize it
    let currId = window.location.href
    currId = currId.replace('https://itinit.pl/room/', '')

    const peer = new Peer({
        'iceServers': [{
            "urls": "stun.ipfire.org:3478"
          },
          {
            "urls": "turn:numb.viagenie.ca",
            "username": "zyziolez@gmail.com",
            "credential": "Adminio@123"
          }]
    })
   
    let idsCopy = ids.slice(0)
    let arra = notMineDontTouch(idsCopy, myPP)


    useEffect(() => {

        //sends every time request to join the room (i should change that) *!*
        socket.emit('join-user', currId, localStorage.getItem('nick'))

        //peers stuff, stil a lot work to do
        peer.on('open', function(id) {
            socket.emit('rooms-ids', currId, id)
            setMyPP(id)
            
          });
        peer.on('connection', function(conn) {
            conn.on('data', data => {
                console.log(data)
            })
            conn.on('open', () => {
                conn.send('hello')
            })
        })
        peer.on('call', call => {
            console.log('hejka dzwonionko')
            navigator.mediaDevices.getUserMedia({video: true, audio: true}, (stream) => {
                call.answer(stream); // Answer the call with an A/V stream.
                call.on('stream', (remoteStream) => {
                  idkRef.current.srcObject = remoteStream
                    
                });
              }, (err) => {
                console.error('Failed to get local stream', err);
              });
        })

          
        //sets messages to chat
        socket.on('chat', (name, msg)=> {
            if(msg != null){
                setChat(prev => [...prev, [name, msg]])
            }else{
                console.log('wtf')
            }  
        })

        //i know this part is trashy. Socket on the backend sends multiple messages and this shit recognizes it
        socket.on('admin', (info, secret) => {
            if(info == 'kick'){
                setOpen(true)
                setTimeout(() => {
                    setOpen(false)
                    setGoHome(true)
                    window.location.reload()
                }, 2000)
                
            }else if(info == 'users'){
                setUsers(secret[0])
                setMaxUsers(secret[1])
            }else if(info == 'max-reached'){
                alert(`Max number of guests reached!`)
                setGoHome(true) 
                window.location.reload()
            }else if(info === "r-name"){
                setRoomsName(secret)
             }else if(info === "disc"){
                 window.location.reload()
             }else if( info === "ids" ){
                 setIds( secret )
             }
        })

        // const connect = async () => {
        //     try{
        //         navigator.mediaDevices.getUserMedia({
        //             video: true,
        //             audio: true
        //         }).then( stream =>{
        //             videoRef.current.srcObject = stream
        //         })
        //     }catch(err) {
        //         console.log('no i tu sie zesralo')
        //     }
        // }

        connect()

        //that should be a cleanup but idk
        return () => {
            setChat([])
            setUsers([])
            window.location.reload()
        }
    }, [])

        const returnHomeAndDisconnect = () => {
            socket.disconnect()
            setGoHome(true)
        }
        const handleSendMessage =() => {
            if(chatMessage != ''){
                socket.emit('chat', chatMessage, localStorage.getItem('nick'))
                setChatMessage('')
                inputFocus.current.focus()
            }
            
        }

        const handlePeerConnect = () => {
            const conn = peer.connect(arra[0])
                conn.on('open', () => {
                    console.log('auba')
                    conn.send('hi!')
                })
              
        }
        const call = () => {
            navigator.mediaDevices.getUserMedia({video: true, audio: true}, (stream) => {
                console.log(stream)
            const call = peer.call(arra[0], stream);
            call.on('stream', (remoteStream) => {
                console.log('dzwonionko')
              idkRef.current.srcObject = remoteStream
                });
            }, (err) => {
                console.error('Failed to get local stream', err);
            });
        }
        const enterHandle = (e) => {
            if(e.key === "Enter"){
                handleSendMessage()
            }
        }

    return (
        <div className='room' >
            <UltimatePop open={open} setOpen={setOpen} text={`Could not find room with id: ${currId}`} />
                <button onClick={call} > <h1>CALL</h1> </button>
            
            {/* <video autoPlay={true} width='340px' height='180px'  muted={true}  ref={videoRef} /> */}
            <video  width='340px' height='180px'  muted={true}  ref={idkRef} />
           
            <div className='left' >
            <h1>Chat:</h1>
                <Chat chat={chat} />
                <input type='text' ref={inputFocus} maxLength='150' value={chatMessage} onKeyPress={enterHandle} onChange={e => setChatMessage(e.target.value)} />
                <button onClick={handleSendMessage} className='message-btn' >Send</button>
            </div>

            {console.log(ids)}
            {console.log(myPP)}

            <div className='right' >
                <h1>Rooms name: {roomsName}</h1>
                <h3> {users.length}/{maxUsers} users</h3>
                <Users users={users} />
                <button onClick={e => {
                    reportRoom(currId) 
                    returnHomeAndDisconnect()
                } } >Report this Room</button>
            </div>
            {console.log(idkRef)}
            <button onClick={handlePeerConnect} > AAAAAAAAAAAAAAAAAAAAAAAAAAAAA </button>
               
            {goHome ? <Redirect to='/'/>  : null}

        </div>
    )
    
}



// else if(info == "ids"){
//     if(secret.length > 1){
//         const secrets = secret.splice(0)
//     const secretss = notMineDontTouch(secrets, localStorage.getItem('nick-id'))
//     secretss.forEach(person => {
//         const conn = peer.connect(person)
//         conn.on('open', () =>{
//             conn.send(localStorage.getItem('nick-id'))
//         })
//     });
//     }
// }