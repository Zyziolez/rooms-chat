import React, { useEffect, useState, useRef } from 'react'
import openSocket from 'socket.io-client'
import { Redirect } from 'react-router-dom';
import Peer from 'peerjs';
import {Chat, Users} from './../components/video stuff/Chat&Users'
import { notMineDontTouch, reportRoom } from './../components/other/functions';
import {pop} from './../index'
import {useRecoilState} from 'recoil'
import UltimatePop from './../components/other/UltimatePop';
import {menuOpen} from './../index'
import MMenu from './MMenu'

const socket = openSocket(window.location.origin, {secure: true});

//this code is nasty so get ready

export default function MRoom() {
    const [chat, setChat] = useState([])
    const [goHome, setGoHome] = useState(false)
    const [users, setUsers] = useState([])
    const [roomsName, setRoomsName] = useState('')
    const [chatMessage, setChatMessage] = useState('')
    const [maxUsers, setMaxUsers] = useState(0)
    let ids = [];
    const inputFocus = useRef(null)
    const [open, setOpen] = useRecoilState(pop)
    const [opened, setOpened] = useRecoilState(menuOpen)

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

        const enterHandle = (e) => {
            if(e.key === "Enter"){
                handleSendMessage()
            }
        }

    return (
        <div className='m-room' >
            <UltimatePop open={open} setOpen={setOpen} text={`Could not find room with id: ${currId}`} />

            <div className='m-r-up' >
                <h1>Rooms name: {roomsName}</h1>
                <h3> {users.length}/{maxUsers} users</h3>
                <Users users={users} />
                <button onClick={e => {
                    reportRoom(currId) 
                    returnHomeAndDisconnect()
                } } >Report this Room</button>
            </div>

            <div className='m-r-down' >
                <Chat chat={chat} />
                <input type='text' ref={inputFocus} maxLength='150' value={chatMessage} onKeyPress={enterHandle} onChange={e => setChatMessage(e.target.value)} />
                <button onClick={handleSendMessage} className='message-btn' >Send</button>
            </div>

            
            <MMenu opened={opened} setOpened={setOpened} />
            {goHome ? <Redirect to='/'/>  : null}

        </div>
    )
    
}
