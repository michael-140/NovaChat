const model = require('./ai/model')

module.exports = (io) =>{
    io.on('connection', (socket)=>{

        socket.on('sendMessage', (data)=>{
            console.log("User message: ",data)
            const responseFromAI = model.sendToAI(data)
            console.log("AI response: ",responseFromAI)
            socket.emit('messageResponse', {
                sender: "bot",
                content: responseFromAI
            })
        })

        socket.on('disconnect', ()=>{
            console.log("User disconnect")
        })
    })
}

