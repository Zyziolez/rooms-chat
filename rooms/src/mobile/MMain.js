import React, { useState, useEffect } from 'react'
import MRoomList from './other/MRoomList'
import MSearch from './other/MSearch'
import {isBigEnough} from './../components/other/functions';
import openSocket from 'socket.io-client'
import { Link, Redirect } from 'react-router-dom'

const socket = openSocket(window.location.origin, {secure: true});

export default function MMain() {
    const [rooms, setRooms] = useState([])
    const [redirect, setRedirect] = useState([false, ''])
    const filteredRooms = rooms.filter(isBigEnough)


     useEffect(() => {
        const promise = new Promise((res, rej) => {
            res( socket.on('display-rooms', msg => {
                if(msg != null){
                    setRooms(msg)
                }
            })  )
        })

        return() => {
            setRooms([])
            setRedirect([false, ''])
        }
    }, [ ])

    const connect = (id) => {
            setRedirect([true, id])
    }

    return (
        
        <div className='main-page' >
            <MSearch/>
            <p> You can easily enter a Room just by typing its code or choosing from the list below </p>
            <MRoomList rooms={filteredRooms} connect={connect} />
            <Link to='/create' > <div className='create-m-main' >Create a Room</div> </Link>

           { redirect[0] ? <Redirect to={`/room/${redirect[1]}`}/> : null}
        </div>
    )
}
