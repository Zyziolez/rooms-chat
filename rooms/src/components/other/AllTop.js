import React, { useEffect, useState } from 'react'
import {  Link} from 'react-router-dom'
import SearchByCode from './SearchByCode'

export default function AllTop() {

    return (
        <div className='main-top'>
        <SearchByCode/>
        <div className='right' >
        <Link to='/create' > <button>Create Room</button> </Link>
        
            {/* <h1> Hello, {localStorage.getItem('nick')} </h1> */}
        </div>
        <div className='line' >
            <div className='shape' ></div>
        </div>
        {/* <button onClick={e => window.location.reload()} > <h1>REFRESH</h1> </button>   */}
    </div>
    )
}
