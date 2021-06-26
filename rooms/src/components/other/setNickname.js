import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import generateUniqueId from 'generate-unique-id'

//this component is the window that pops up when you haven't got you nick set

//this is the window
 const styler={height: '100vh', background: 'rgba(20, 20, 20, 0.677)', width: '100vw', position: 'absolute', top: '0'}
const Input = ({isOpen, onClose, children, enabled}) => {
    if(!isOpen ){
        return null
    }
    return ReactDOM.createPortal(
        <div  style={styler} >
            {children}
        </div>, document.body
    )
}

//this is the logic of the window
export default function SetNickname({open, setOpen}) {
    const [enabled, setEnabled] = useState(true)
    const [nickname, setNickname] = useState('')
    const [good, setGood] = useState(true)

    const generator = generateUniqueId({
        length: 4,
        useNumbers: false
    })
    const handleClick = () => {
        if(nickname !== '' ){
            localStorage.setItem('nick', nickname)
            localStorage.setItem('nick-id', generator)
            setNickname('')
            setOpen(prev => !prev)
        }else{
            setGood(false)
            setNickname('')
            setTimeout(() => {
                setGood(true)
            }, 3000)
        }
    }
    const enterHandle = (e) => {
        if(e.key === "Enter"){
            handleClick()
        }
    }
    return (
        <div>
            <Input isOpen={open}  enabled={enabled}  >
                <div style={{ width: '25rem', background: 'white', position: 'absolute',height: '30rem', marginTop: '20vh', marginLeft:'50%', transform: 'translateX(-50%)', textAlign: 'center', padding: '2rem'}} >
                    <label style={{fontSize: '2.5rem'}} > Set your nickname </label>
                    <input  autoFocus placeholder='Your Nickname' type='text' value={nickname} onChange={e => setNickname(e.target.value)} maxLength='25' onKeyPress={enterHandle}  style={{width: '15rem', height: '2.5rem', marginTop: '2.5rem'}} />
                    <button onClick={handleClick} style={{height: '2.5rem', border: 'none', width: '5rem', color: 'white', background: '#34ef'}} > Confirm </button>
                    {good ? null : <p style={{color: 'red'}} >Please pass correct nickname</p>}
                </div>
           </Input>
        </div>
    )
}
