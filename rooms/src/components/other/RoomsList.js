import React, {useState} from 'react'
import {reportRoom} from './functions'

export default function RoomsList({rooms, connect}) {
    const [isDisabled, setIsDisabled] = useState(false)
    return (
        <div className='rooms-list' >
           <table>
           <tbody>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th></th>
                <th>Code</th>
                <th>Limit</th>
            </tr>
         
                {rooms.map((room, i) => 
                    <tr key={i} >
                        <td>{room[0]}</td>
                        <td style={{width: '50%'}} > {room[1]}</td>
                        <td style={{textAlign: 'center', userSelect: 'all'}} >{room[3]}</td>
                        <td style={{textAlign: 'center'}} > {room[2]} / {room[4]} </td>

                        <button onClick={(e) => connect(room[3])} >Join</button>
                    </tr>
                )}
            </tbody>
           </table>
        </div>
    )
}
