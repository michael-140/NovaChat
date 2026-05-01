const stimulateResponse = {
    "hi": "Hello! How can I help you with NovaChat today?",
    "hello": "Hi there! I am your AI assistant.",
    "bye": "Goodbye! Have a great day!",
    "help": "You can ask me about account settings or how to start a new chat.",
    "who are you": "I am Nova, the friendly chatbot for this platform!"
}

function sendToAI(message) {
    // pass to message to ai 
    // Use fixed question to stimulate AI response
    return stimulateResponse[message] || "Sorry~ So far AI function does not available! but you can try the following question:\n1. hi\n2.hello\n3.bye\n4.help\n5.who are you"
}

module.exports = sendToAI