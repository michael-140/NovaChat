//  use js file to store the chat information
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')


const storageDir = path.join(__dirname, '..', 'data', 'chatHistories');

if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
}

const getUserFilePath = (userId) => path.join(storageDir, `${userId}.json`);


// api for getting chat histories
router.get('/chatHistories', (req, res) => {

    const userId = req.cookies.userId
    
    if (!userId) {
        // return res.status(401).json({ error: "Unauthorized" })
        return
    }

    const userFilePath = getUserFilePath(userId);

    if (fs.existsSync(userFilePath)) {
        try{
            const data = fs.readFileSync(userFilePath, 'utf-8');
            res.json(JSON.parse(data));
        }catch(err){res.status(500).json({ error: "Failed to read chat histories" })}

    } else {
        res.json([]); // return empty array if no history
    }
})

// api for updating chat history
router.post('/updateChatHistory', (req, res) => {
    const updatedChat = req.body
    const userId = req.cookies.userId

    if (!userId) {
        // return res.status(401).json({ error: "Unauthorized" })
        return
    }

    const userFilePath = getUserFilePath(userId);

    fs.readFile(userFilePath, 'utf8', (err, data) => {
        let histories = err ? [] : JSON.parse(data);

        // Find if this chat already exists by ID
        const index = histories.findIndex(chat => chat.id === updatedChat.id);

        if (index !== -1) {
            histories[index] = updatedChat; // Update existing
        } else {
            histories.splice(0,0,updatedChat) // Add new
        }

        // Write the updated array back to the JSON file
        fs.writeFile(userFilePath, JSON.stringify(histories, null, 2), (writeErr) => {
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
    const userId = req.cookies.userId

    if (!userId) {
        // return res.status(401).json({ error: "Unauthorized" })
        return
    }

    const filePath = getUserFilePath(userId);
    
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