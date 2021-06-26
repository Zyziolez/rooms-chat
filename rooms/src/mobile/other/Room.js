import React, { useEffect, useState, useRef } from 'react'
import openSocket from 'socket.io-client'
import { Redirect } from 'react-router-dom';
import Peer from 'peerjs';
import {Chat, Users} from './video stuff/Chat&Users'
import { notMineDontTouch, reportRoom } from './other/functions';
import {pop} from './../index'
import {useRecoilState} from 'recoil'
import UltimatePop from './other/UltimatePop';

const socket = openSocket(window.location.origin, {secure: true});

//this code is nasty so get ready

export default function Room() {
    const [chat, setChat] = useState([])
    const [goHome, setGoHome] = useState(false)
    const [users, setUsers] = useState([])
    const [roomsName, setRoomsName] = useState('')
    const [chatMessage, setChatMessage] = useState('')
    const [maxUsers, setMaxUsers] = useState(0)
    let ids = [];
    const inputFocus = useRef(null)
    const [open, setOpen] = useRecoilState(pop)

    //sends this rooms id from link to backend to recognize it
    let currId = window.location.href
    currId = currId.replace('https://itinit.pl/room/', '')

    const peer = new Peer(localStorage.getItem('nick-id'))
   
    let idsCopy = [...ids]
    let arra = notMineDontTouch(idsCopy, localStorage.getItem('nick-id'))


    useEffect(() => {
        // localStorage.setItem('location', window.location.pathname)

        //sends every time request to join the room (i should change that) *!*
        socket.emit('join-user', currId, localStorage.getItem('nick'), localStorage.getItem('nick-id'))

        //adds our peers id to array to connect to others and also sends it to backend
        ids.push(peer.id)
        socket.emit('rooms-ids', currId, localStorage.getItem('nick-id'))

        //peers stuff, stil a lot work to do
        peer.on('connection', (conn) => {
            console.log('connected')
            conn.on('data', (data) => {
              const con = peer.connect(data)
              con.send('hejka')
              console.log(data)
            });
            conn.on('open', (mess) => {
              conn.send('hello!');
              console.log(mess)
            });
          });

          
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
             }
        })

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
            // arra.forEach(id => {
            //     const conn = peer.connect(id)
            //     conn.on('open', () =>{
            //     conn.send(peer.id)
            // })
            // });
            
            // console.log(pers)
            // if(arra.length > 0){
            //     try{
            //         const conn = peer.connect(pers)
            //         conn.on('open', () =>{
            //             conn.send(localStorage.getItem('nick-id'))
            //         })
            //         console.log('udalo sie i guess')
            //       }catch{
            //           console.log('just lose it')
            //       }
            //   }
            // if(arra.length > 0){
            //     try{
            //         const conne = peer.connect(arra[0])
            //         conne.on('open', () =>{
            //             conne.send(peer.id)
            //         })   
            //         console.log('poszlo')
            //     }catch{
            //         console.log('ups')
            //     }   
            // }   
        }
        const enterHandle = (e) => {
            if(e.key === "Enter"){
                handleSendMessage()
            }
        }

    return (
        <div className='room' >
            <UltimatePop open={open} setOpen={setOpen} text={`Could not find room with id: ${currId}`} />

            <div className='left' >
            <h1>Chat:</h1>
                <Chat chat={chat} />
                <input type='text' ref={inputFocus} maxLength='150' value={chatMessage} onKeyPress={enterHandle} onChange={e => setChatMessage(e.target.value)} />
                <button onClick={handleSendMessage} className='message-btn' >Send</button>
            </div>

            <div className='right' >
                <h1>Rooms name: {roomsName}</h1>
                <h3> {users.length}/{maxUsers} users</h3>
                <Users users={users} />
                <button onClick={e => {
                    reportRoom(currId) 
                    returnHomeAndDisconnect()
                } } >Report this Room</button>
            </div>

            {/* <button onClick={returnHomeAndDisconnect } > Return Home </button> */}
            {/* <ul>
                {ids.length > 0 ? ids.map((v, k) => 
                    <li key={k} >{v}</li>
                ) : null}
            </ul> */}

                {/* <h3>you:</h3>
                            <MyVideo/> */}
                {/* <button onClick={handlePeerConnect} >aaaaaaaaaaa</button> */}
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