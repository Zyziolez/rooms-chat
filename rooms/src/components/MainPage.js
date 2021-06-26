import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom';
import openSocket from 'socket.io-client'
import {isBigEnough, reportRoom} from './other/functions'
import RoomsList from './other/RoomsList';

const socket = openSocket(window.location.origin, {secure: true});
// const socket = openSocket(`http://itinit.pl:5000/`);


export default function MainPage() {
    const [rooms, setRooms] = useState([])
    const [redirect, setRedirect] = useState([false, ''])
    const filteredRooms = rooms.filter(isBigEnough)


     useEffect(() => {


        //this one gets roms from the back
        const promise = new Promise((res, rej) => {
            res( socket.on('display-rooms', msg => {
                if(msg != null){
                    setRooms(msg)
                }
            })  )
        })

        //checks if our nick is set

        return() => {
            setRooms([])
            setRedirect([false, ''])
        }
    }, [ ])

    //after passing code to input, reirects to room
    const connect = (id) => {
            setRedirect([true, id])
    }

    return (
        
        <div className='main-page' >
            <div className='existing' >
                <RoomsList rooms={filteredRooms}  connect={connect} />
            </div>
           {/* <Report/> */}

           { redirect[0] ? <Redirect to={`/room/${redirect[1]}`}/> : null}
        </div>
    )
}
