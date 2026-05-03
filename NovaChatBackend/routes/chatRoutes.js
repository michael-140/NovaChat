//  use js file to store the chat information
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'data', 'chatHistories.json')


// api for getting chat histories
router.get('/chatHistories', (req, res) => {


    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) { // handle file read error
            return res.status(500).json({ error: "Failed to read chat histories" })
        }

        try {
            res.json(JSON.parse(data))
        } catch (parseErr) { // handle JSON parse error
            res.status(500).json({ error: "Failed to parse chat histories" })
        }
    })
})

// api for updating chat history
router.post('/updateChatHistory', (req, res) => {
    const updatedChat = req.body

    fs.readFile(filePath, 'utf8', (err, data) => {
        let histories = err ? [] : JSON.parse(data);

        // Find if this chat already exists by ID
        const index = histories.findIndex(chat => chat.id === updatedChat.id);

        if (index !== -1) {
            histories[index] = updatedChat; // Update existing
        } else {
            histories.splice(0,0,updatedChat) // Add new
        }

        // Write the updated array back to the JSON file
        fs.writeFile(filePath, JSON.stringify(histories, null, 2), (writeErr) => {
            if (writeErr) return res.status(500).send("Error saving data");
            res.json({ message: "Saved successfully"
                // , chat: updatedChat 
            });
        });
    });
})

// api for deleting chat history
router.delete('/updateChatHistory/:id', (req, res) => {
    const chatId = req.params.id
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        let histories = err ? [] : JSON.parse(data)
        const updatedHistories = histories.filter(chat => chat.id !== chatId)

        fs.writeFile(filePath, JSON.stringify(updatedHistories, null, 2), (writeErr) => {
            if (writeErr) return res.status(500).send("Error deleting data")

            res.json({ message: "Deleted successfully" })
        })
    })
})

module.exports = router 