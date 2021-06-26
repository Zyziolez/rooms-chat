import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import openSocket from 'socket.io-client'

const socket = openSocket(window.location.href, {secure: true});

export default function MSearch() {
    const [value, setValue] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [notFocus, setNotFocus] = useState('Search by Code')

    const handleClick = () => {
        if( value !== '' ){
            setValue(value.toLowerCase())
            setRedirect(true)
        }
        
    }
    const enterHandle = (e) => {
        if(e.key === "Enter"){
            handleClick()
        }
    }
    return (
        <div className='m-main' >
            <input type='text' maxLength='8' placeholder={notFocus} value={value} onChange={e => setValue(e.target.value)} autoCapitalize='none' onKeyPress={enterHandle}  />
            <label>|</label>
            {redirect ? <Redirect to={`/room/${value}`}  />: null}
        </div>
    )
}
