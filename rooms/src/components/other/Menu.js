import React, { useEffect, useState } from 'react'
import {  Link} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {isSetNickname} from './../../index'

export default function Menu() {
  const [open, setOpen] = useRecoilState(isSetNickname)
  const [nickname, setNickname] = useState(null)

  useEffect(() => {
    if(localStorage.getItem('nick') !== null){
        setNickname(localStorage.getItem('nick'))
        setOpen(false)
    }
}, [])

  const changeNickname = () => {
    localStorage.clear()
    setOpen(true)
}
    return (
        <div>
            <div className='menu' >
          <div className='buttons' >
            <Link to='/' > <button>Home</button> </Link>
          <button onClick={changeNickname} >Change Nickname</button>
          <Link to='/news' ><button>News</button></Link>
            <button> <a href='https://discord.gg/37xBPH5Ec4' target='blank' >Discord</a></button>
            {/* <Link to='/support' ><button>Support</button></Link> */}
            <button> <a href='https://patreon.com/roomschat' target='blank' >Donate</a> </button>
          </div>       
      </div>
        </div>
    )
}
