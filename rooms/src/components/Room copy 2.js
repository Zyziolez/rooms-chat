import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import openSocket from 'socket.io-client'
import { Redirect } from 'react-router-dom';
import Peer from 'peerjs';
import MyVideo from './rooms stuff/MyVideo';
import {Chat, Users} from './rooms stuff/Chat&Users'
import { reportRoom } from './other/functions';

const socket = openSocket('/socket');
// const socket = openSocket(`http://itinit.pl:5000/`);

export default function Room() {
    const [chat, setChat] = useState([])
    const [goHome, setGoHome] = useState(false)
    const [users, setUsers] = useState([])
    const [chatMessage, setChatMessage] = useState('')
    const [maxUsers, setMaxUsers] = useState(0)
    

    let currId = window.location.href
    currId = currId.replace('http://178.235.196.39:5000/', '')

    // currId = currId.replace('http://itinit.pl:3000/room/', '')

    let [peer, setPeer] = useState(new Peer(currId))

    useEffect(() => {
        peer.connect(currId)
            socket.emit('join-user', currId, localStorage.getItem('nick'))


        try{
            axios.get(`/http://178.235.196.39:5000/${currId}`)
            // axios.get(`http://itinit.pl:5000/room/${currId}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        }catch{
            console.log('err')
        }
        
        socket.on('chat', (name, msg)=> {
            if(msg != null){
                setChat(prev => [...prev, [name, msg]])
            }else{
                console.log('wtf')
            }
            peer.on('connection', conn => {
                console.log('CONN-ected!')
                conn.on('open', (msg) =>{
                    conn.send('hello')
                    console.log(msg)
                })
            })
        })

        socket.on('admin', (info, secret) => {
            if(info == 'kick'){
                alert(`Could not find the room with id: ${currId}`)
                setGoHome(true)
                window.location.reload()
            }else if(info == 'users'){
                setUsers(secret[0])
                setMaxUsers(secret[1])
            }else if(info == 'max-reached'){
                alert(`Max number of guests reached!`)
                setGoHome(true)
                window.location.reload()
            }
        })


        return () => {
            setChat([])
            setUsers([])
            window.location.reload()
        }
    }, [])

        const returnHomeAndDisconnect = () => {
            // socket.emit('delete', currId)
            // socket.disconnect()
            // setGoHome(true)
            socket.disconnect()
            setGoHome(true)
        }
        const handleSendMessage =() => {
            if(chatMessage != ''){
                socket.emit('chat', chatMessage, localStorage.getItem('nick'))
                setChatMessage('')
            }
            
        }
    return (
        <div>
            <button onClick={returnHomeAndDisconnect } > Return Home </button>
            <h2> {users.length}/{maxUsers} users</h2>
                <Users users={users} />
                <Chat chat={chat} />
                <button onClick={e => {
                    reportRoom(currId) 
                    returnHomeAndDisconnect()
                } } >Report this room</button>
                <input type='text' value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
                <button onClick={handleSendMessage} >send message</button>
                <h3>you:</h3>
                <MyVideo/>

                <button onClick={e => {
                    const conn = peer.connect(currId)
                    conn.on('open', () =>{
                        conn.send('hellooooo')
                    })
                }} ></button>

            {goHome ? <Redirect to='/'/>  : null}

        </div>
    )
    
}
