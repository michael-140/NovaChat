const express = require('express')
const  http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const session = require('express-session')
const chatSocket = require('./chatSocket')
const chatRoutes = require('./routes/chatRoutes')

const app = express()
const httpServer = http.createServer(app)

app.use(cors({
    origin: "http://localhost:5173", // allow frontend port only
    credentials: true
}))

app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SCRET || 'nova_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false} // change it after using https
}))

// socket setting 
const io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:5173", // allow frontend port only
        credentials: true
    }
})

chatSocket(io)


app.get('/', (req, res)=>{
    res.send("Hi! Welcome to NovaChat backend server!")
})

app.use('/api', chatRoutes)

const PORT = process.env.PORT || 8000
httpServer.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})