const sendToAI = require('./ai/model')

module.exports = (io) =>{
    io.on('connection', (socket)=>{
        console.log("User connected: ", socket.id)
        socket.on('sendMessage', (data)=>{
            console.log("User message: ",data)
            const responseFromAI = sendToAI(data)
            console.log("AI response: ",responseFromAI)
            socket.emit('messageResponse', {
                id: crypto.randomUUID(),
                sender: "bot",
                content: responseFromAI
            })
        })

        socket.on('disconnect', ()=>{
            console.log("User disconnect")
        })
    })
}

