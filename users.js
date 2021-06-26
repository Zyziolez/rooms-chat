const users = [];

//ROOM

class Room{
    constructor(name, roomId, description, maxUsers, hidden){
        this.name = name,
        this.roomId = roomId,
        this.description = description || '',
        this.maxUsers = maxUsers,
        this.numOfReports = 0,
        this.hidden = hidden,
        this.users = [],
        this.usersIds = []
    }
    addUser (username){
        users.push(username)
    }
    deleteUser(username){
        const num = userss.findIndex(user => user.username === username)
        if( num !== -1 ){
            return users.splice(num, 1)[0]
            }
        }
}

//FUNCTIONS


const userJoin = (name, roomId, roomName, description, maxUsers, hidden) => {
    name = new Room ( roomName, roomId, description, maxUsers, hidden)

    users.push(name)
}

const getRoom = (roomId) => {
   let wynik = users.find(id => id.roomId === roomId)
    if(wynik != undefined){
        return wynik
    }else{
        return null
    }
}

const joinUser = (roomId, user) => {
    const room = getRoom(roomId)
        room.users.push(user)
}

const deleteUser = (roomId, user) => {
    const room = getRoom(roomId)

    if(room != null){
        const index = room.users.indexOf(user);
        if (index > -1) {
            room.users.splice(index, 1);
        }
    }
}

const allRooms = () => {
    const all = []
    users.forEach(room => {
        all.push([ room.name, room.description, room.users.length, room.roomId, room.maxUsers, room.hidden ])
    })
    if(all.length > 0){
        return all
    }else{
        return null
    }
}

const deleteRoom = (id) => {
    let index = users.find(o => o.roomId === id);

    const place = users.indexOf(index)
    if(place > -1){
        users.splice(place, 1)
        console.log('jupi!')
    }else{
        console.log('Could not delete room')
    }

}

const reportRoom = (id) => {
    const room = getRoom(id)

    if(room.numOfReports < 5){
        room.numOfReports = room.numOfReports +1
    }else{
        deleteRoom(id)
    }
}

const roomIds = (roomId, id) => {
    const room = getRoom(roomId)
    if(id){
        room.usersIds.push(id)
    }
}
const deleteId = (roomId, id) => {
    const room = getRoom(roomId)

    if(room != null){
        const index = room.usersIds.indexOf(id);
        if (index > -1) {
            room.usersIds.splice(index, 1);
        }
    }
}

//EXPORTS

module.exports = {
    users,
    userJoin,
    getRoom,
    joinUser,
    deleteUser,
    allRooms,
    deleteRoom,
    reportRoom,
    roomIds,
    deleteId
}