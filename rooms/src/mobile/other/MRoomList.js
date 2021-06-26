import React, {useState} from 'react'

export default function MRoomList({rooms, connect}) {
    const [isDisabled, setIsDisabled] = useState(false)
    return (
        <div className='rooms-list' >
            <table>
                <tbody>
                <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Limit</th>
                <th></th>
            </tr>
                {rooms.map((room, i) => 
                    <tr key={i} onClick={(e) => connect(room[3])}  >
                        <td>{room[0]}</td>
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
