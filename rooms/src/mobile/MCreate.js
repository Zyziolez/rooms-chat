import React, { useEffect, useState } from 'react'
import openSocket from 'socket.io-client'
import generateUniqueId from 'generate-unique-id'
import { Redirect } from 'react-router-dom';
import { pop } from './../index';
import UltimatePop from './../components/other/UltimatePop'
import {useRecoilState} from 'recoil'

const socket = openSocket(window.location.origin, {secure: true});

export default function MCreate() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('') 
    const [hidden, setHidden] = useState(false) 
    const [select, setSelect] = useState(2) 
    const [redirect, setRedirect]= useState(false)
    const [generated, setGenerated] = useState(null)
    const [open, setOpen] = useRecoilState(pop)
    const generator = generateUniqueId({
        length: 8
    })
    useEffect(() => {
        //set generated rooms id
        setGenerated(generator)
    }, [])
    const handleSubmit = () => {
        if( name != ''){
            //sends rooms info to backend
            socket.emit('create',generated , name,  description, select, hidden)
            setRedirect(true)
        }else{
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 2000)
        }
    }

    return (
        <div  className='create' >
            <UltimatePop open={open} setOpen={setOpen} text='Please fill form correctly :)' />
                <h1>Create Room</h1>
                 <input placeholder='Name' type='text' maxLength='20' name='name' value={name} onChange={e => setName(e.target.value)} /> <br></br>
                <input placeholder='Description (optional)' type='text' maxLength='40' name='description' value={description} onChange={e => setDescription(e.target.value)} /> <br></br>
                    <label>Number of guests:</label> <select   value={select} onChange={e => setSelect(e.target.value)}  style={{border: '1px solid gray', width: '3rem'}} >
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                </select> <br></br>
                <label  > Hidden (optional) </label> <input type="checkbox" value={hidden} onChange={e=> setHidden(!hidden) } className='che' /> <br></br><br></br>
                <br></br><br></br>
                <button type='submit' onClick={ handleSubmit } > Submit </button>
         
            {redirect ?  <Redirect to={`/room/${generated}`} />  : null}
        </div>
    )
}
