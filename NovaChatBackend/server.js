require('dotenv').config()
const express = require('express')
const  http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const session = require('express-session')
const chatSocket = require('./chatSocket')
const chatRoutes = require('./routes/chatRoutes')
const authorRoutes = require('./routes/authorRoutes')

const app = express()
const httpServer = http.createServer(app)
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: "http://localhost:5173", // allow frontend port only
    credentials: true
}))

app.use(express.json())
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || 'nova_secret',
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
app.use('/api', authorRoutes)

const PORT = process.env.PORT || 8000
httpServer.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})