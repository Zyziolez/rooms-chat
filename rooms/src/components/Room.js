import React, { useEffect, useState, useRef } from 'react'
import openSocket from 'socket.io-client'
import { Redirect } from 'react-router-dom';
import {Chat, Users} from './video stuff/Chat&Users'
import { notMineDontTouch, reportRoom } from './other/functions';
import {pop} from '../index'
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
    const [ids, setIds] = useState([])
    const inputFocus = useRef(null)
    const [open, setOpen] = useRecoilState(pop)
    const [myPP, setMyPP] = useState('')
    const idkRef = useRef(null)

    //sends this rooms id from link to backend to recognize it
    let currId = window.location.href
    currId = currId.replace('https://itinit.pl/room/', '')
    let idsCopy = ids.slice(0)
    let arra = notMineDontTouch(idsCopy, myPP)


    useEffect(() => {

        //sends every time request to join the room (i should change that) *!*
        socket.emit('join-user', currId, localStorage.getItem('nick'))

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
            
        const enterHandle = (e) => {
            if(e.key === "Enter"){
                handleSendMessage()
            }
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
            {goHome ? <Redirect to='/'/>  : null}

        </div>
    )
    
}
