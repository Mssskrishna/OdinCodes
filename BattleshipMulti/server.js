const express = require('express')
const path = require("path")
const http = require("http")

const PORT = process.env.PORT || 3001
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)

const io = socketio(server)

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//start server
server.listen(PORT, () => console.log("Server runnnig on http://localhost:3001/"))


// handle a socket connection request from web client
const connections = [null, null]

io.on("connection", socket => {
    console.log("New WS connection")

    //Find the available player number

    let playerIndex = -1
    for (const i in connections) {
        if (connections[i] === null) {
            playerIndex = i;
            break;
        }
    }
    // console.log(playerIndex);



    //tell the client player what number they are
    socket.emit("player-number", playerIndex)
    console.log(`player : ${playerIndex} has connected`)


    //ignore player more than 3
    if (playerIndex === -1) {
        return
    }

    connections[playerIndex] = false

    //tell everyone what player number just connected
    socket.broadcast.emit("player-connection", playerIndex);

    socket.on("disconnect", () => {
        console.log(`Player ${playerIndex} disconnected`)
        connections[playerIndex] = null

        //Tell everyone what player number choosed disconnected
        socket.broadcast.emit('player-connection', playerIndex);
    })

    //on ready
    socket.on('player-ready', () => {
        socket.broadcast.emit('enemy-ready', playerIndex)
        connections[playerIndex] = true;
    })

    //check player connections
    socket.on('check-players', () => {
        const players = []
        for (const i in connections) {
            if (connections[i] === null) {
                players.push({ connected: false, ready: false })
            } else {
                players.push({ connected: true, ready: connections[i] })
            }
        }
        socket.emit('check-players', players)
    })

    //on fire received
    socket.on('fire',id=>{
        console.log(`shot fired from ${playerIndex}`,id)

        //emit the move to the other player
        socket.broadcast.emit('fire',id)
    })

    //on fire reply
    socket.on('fire-reply',square =>{
        console.log(square)

        //forward the message to all players
        socket.broadcast.emit('fire-reply',square)
    })

    setTimeout(()=>{
        connections[playerIndex] = null;
        socket.emit('timeout');
        socket.disconnect()
    },600000)
})


