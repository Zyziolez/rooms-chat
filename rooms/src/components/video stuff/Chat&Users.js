import React, { useEffect, useRef } from 'react'

//yes I will comment every component

export function Chat({chat}) { 
    const newChat = chat.slice(0)   
    const refer = useRef()
    // const newerChat = newChat.reverse()
    useEffect(() => {
        refer.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }, [chat])
    return (
        <div className='chat-list' >
            <ul style={{overflow: 'hidden'}} >
                {newChat.length > 0 ? newChat.map((message, i) => 
                <li key={i} > <b>{`${message[0]}:`}</b>  {`${message[1]}`} </li>
                ) : null}
                <div ref={refer} ></div>
            </ul>
        </div>
    )
}
export function Users({users}){
    return(
        <ul>
        { Array.isArray(users) ? users.map((user, i) => 
            <li key={i} > {user} </li>
         ) : null}
    </ul>
    )
}