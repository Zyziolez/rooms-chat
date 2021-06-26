const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const https = require('https')
const http = require('http')
const socket = require('socket.io')
const fs = require('fs')
const FtpDeploy = require("ftp-deploy");
// const mysql  = require('mysql')
const {
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
  } = require('./users')

//cert stuff

//app stuff
const port = 5000
const app = express()
app.use(cors())
const ftpDeploy = new FtpDeploy();
const path = __dirname + '/views/';
app.set("trust proxy", 1)

const key = fs.readFileSync('/etc/letsencrypt/live/itinit.pl/privkey.pem', 'utf-8')
const cert = fs.readFileSync('/etc/letsencrypt/live/itinit.pl/cert.pem', 'utf-8')
const ca = fs.readFileSync('/etc/letsencrypt/live/itinit.pl/chain.pem', 'utf-8')

const options = {
    key: key,
    cert: cert,
    ca: ca
}

//json parser
const jsonParser = bodyParser.json()


// const server = app.listen(443, () => {
    // console.log(`Listening on port: ${port}`)
// })
const server = https.createServer(options, app).listen(80)
http.createServer( (request, response) => {
    response.writeHead(302, {'Location': 'https://itinit.pl' +request.url })
    response.end()
} ).listen(81)
//+ request.headers.host


//---------------sockets---------------
const io =socket(server)

io.on('connection', socket => {

    socket.on('create', (generated, name, description, maxUsers, hidden) => {
        userJoin(name, generated, name, description, maxUsers, hidden)
    })
    socket.on('report-room', id => {
        reportRoom(id)
    })
    socket.emit('display-rooms', allRooms())
 
     socket.on('join-user', (id, name) =>{
        if(getRoom(id) != null){
         
        const room = getRoom(id)

       if(room.users.length < room.maxUsers){
            joinUser(id, name)
            socket.join(room.roomId)

            io.to(room.roomId).emit('admin','users', [room.users, room.maxUsers])
            io.to(room.roomId).emit('admin', 'ids', room.usersIds)
            io.to(room.roomId).emit('admin','r-name', room.name)
            io.to(room.roomId).emit('chat', 'Chat-bot', `${name} joined the room!`)

            socket.on('chat', (msg, name) => {
                io.to(room.roomId).emit('chat', name, msg)
            })
            if(room.users.length === 0 || !room){
                socket.emit('admin','kick', 'wypierdalaj')
            }

            socket.on('disconnect', () => {
                deleteUser(id, name)
                io.to(room.roomId).emit('chat', 'Chat-bot', `${name} left the room!`)
                io.to(room.roomId).emit('admin','users', room.users)
                io.to(room.roomId).emit('admin', 'disc', 'henslo')
                io.to(room.roomId).emit('admin', 'ids', room.usersIds)
            })
       }else{
                socket.emit('admin','max-reached', true)
       }
    }else{
        socket.emit('admin','kick', 'wypierdalaj')
    }
 })


    socket.on('delete', (id) => {
        deleteRoom(id)
    })
    socket.on('disconnect-user', (id, name) => {
        deleteUser(id, name)
    })
    socket.on('rooms-ids', (roomId, id) => {
        const room = getRoom(roomId)
        if(room != null){
            roomIds(roomId, id)
            io.to(room.roomId).emit('admin','ids', room.usersIds)

            socket.on('disconnect', () => {
                deleteId(roomId, id)
            })
        }else{
            socket.emit('admin','kick', 'wypierdalaj')
        }
        
    })

})

//Katelin Koelpin -name
//katelin48@ethereal.email  -username
//yhdeQVs2bDwCBxMGPu -pass

app.use(express.static(__dirname, {dotfiles: 'allow'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path))


app.get('*',(req,res) =>{
    res.sendFile(path + "index.html");
    // res.redirect('https://' + req.headers.host + )
});
app.get('/', function (req,res) {

    res.sendFile(path + "index.html");
  });

