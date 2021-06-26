import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

//this component is the window that pops up when you haven't got you nick set

//this is the window
const Input = ({isOpen, onClose, children, enabled}) => {
    if(!isOpen ){
        return null
    }
    return ReactDOM.createPortal(
        <div  style={{height: '100vh', background: 'rgba(20, 20, 20, 0.677)', width: '100vw', position: 'fixed', top: '0'}} >
            {children}
        </div>, document.body
    )
}

//this is the logic of the window
export default function UltimatePop({open, setOpen, text}) {
    const [enabled, setEnabled] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setEnabled(false)
        }, 2000)
    }, [])
    return (
        <div>
            <Input isOpen={open}  enabled={enabled}  >
            <div style={{ width: '25rem', background: 'white', position: 'absolute',height: '30rem', marginTop: '20vh', marginLeft:'50%', transform: 'translateX(-50%)', textAlign: 'center', padding: '2rem'}} >
                <h1>{text} </h1>
             </div>
           </Input>
        </div>
    )
}
