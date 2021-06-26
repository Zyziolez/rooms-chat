import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'


const PortalMenu = ({isOpened,  children, ready, klassName}) => {
   
    if(!isOpened){
        return null;
    }


    return ReactDOM.createPortal(
            <div className={klassName} style={{height: '100vh', background: '#34ef', width: '100vw', position: 'fixed', top: '0'}} >
                {children}
            </div>

                , document.body
    )
}

export default function MMenu({opened, setOpened, text}) {
    const [curr, setCurr] = useState( 'pop-menu' )
  const [ready, setReady] = useState(false)
  
  const closeMenu = () => {
      setReady(true)
      setCurr('pop-test')
      setTimeout(() => {
        setOpened(prev => !prev)
        setCurr('pop-menu')
      }, 1000)
  }
    return (
            <PortalMenu isOpened={opened} ready={ready} klassName={curr} >
                <button style={{border: 'none', background: 'transparent', color: 'white',position: 'absolute', right: '2rem', top: '1rem', fontSize: '3rem', fontWeight:'800', transform: 'rotate(90deg)'}}  className='menu-btn' onClick={closeMenu}  > ||| </button>
                <div className='m-menu' >
                    <Link to='/'> <button onClick={closeMenu} style={{display: 'block'}} >Home</button> </Link>
                    <button  onClick={closeMenu} style={{display: 'block'}} > <a> Change Nickname </a> </button>
                    <Link to='/news'> <button  onClick={closeMenu} style={{display: 'block'}} > News </button> </Link>
                    <button  onClick={closeMenu} style={{display: 'block'}} > <a href='https://discord.gg/37xBPH5Ec4' target='blank' > Discord </a> </button>
                    <button  onClick={closeMenu} style={{display: 'block'}} > <a href='https://patreon.com/roomschat' target='blank' > Donate </a> </button>
                    <Link to='/create' >  <button onClick={closeMenu} style={{display: 'block'}} >Create Room</button> </Link>
                </div>
            </PortalMenu>
    )
}
