//hello :)

const openSocket = require( 'socket.io-client')

const socket = openSocket(window.location.href, {secure: true});


 export const join = (roomId, roomsName, username, description) => {
    if(username){
        socket.emit('join', roomId, roomsName, username, description)
    }else{
        return false
    }

}

export function isBigEnough (num) {
    if(!num[5]){
        return num[2] > 0
    }
    
}
export function reportRoom(num){
    socket.emit('report-room', num)
    alert('Room reported!')
}
export function notMineDontTouch(arr, me){
    const newArr = arr.splice(0)
    const index = newArr.indexOf(me)
    newArr.splice(index, 1)
    return newArr
}