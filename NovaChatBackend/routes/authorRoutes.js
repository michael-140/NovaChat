const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt') // encrypt password
const { v4: uuidv4 } = require('uuid');

const userFilePath = path.join(__dirname, '..', 'data', 'users.json')
const dataDir = path.join(__dirname, '..', 'data');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(userFilePath)) fs.writeFileSync(userFilePath, '[]');

router.post('/login', (req, res) => {
    const { account, password } = req.body

    if (!account || !password) {
        return res.status(400).json({ error: "Account and password are required" })
    }

    const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8') || '[]')

    const user = users.find(user => user.account === account)

    // wrong account or password
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ error: "Account does not exist/Incorrect password" })
    }

    res.cookie('userId', user.id, {
        httpOnly: true, 
        maxAge: 60 * 60 * 1000, // 1 hour 
        sameSite: 'lax',
        secure: false // change it if use https 
        });


    res.json({ message: `Login successful`, user: { id: user.id, account: user.account } })

})

router.post('/register', (req, res) => {
    const { account, password } = req.body

    // empty 
    if (!account || !password) { 
        return res.status(400).json({ error: "Account and password are required" })
    }

    // length should be 3-20
    if (account.length < 3 || account.length > 20) {
        return res.status(400).json({ error: "Account must be between 3 and 20 characters" });
    }

    // password should be at least 8 characters, contain letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            error: "Password must be at least 8 characters long and contain both letters and numbers" 
        });
    }

    const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8') || '[]')

    if (users.find(user => user.account === account)) {
        return res.status(400).json({ error: 'Account exists' })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = { id: uuidv4(), account, password: hashedPassword }

    users.push(newUser)
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2))
    res.json({ message: `Registration successful ${account}` })
})

// for logout 
router.post('/logout', (req, res) => {
    res.clearCookie('userId', {
        httpOnly: true, 
        sameSite: 'lax',
        secure: false // change it if use https 
    });
    res.json({ message: "Logout successful" })
})

// for reloading 
router.get('/reload', (req,res)=>{
    const userId = req.cookies.userId
    if (!userId) return res.status(401).json({authenticated: false})

    const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8') || '[]')
    const user = users.find(user => user.id === userId)

    if (!user) return res.status(401).json({authenticated: false})

    res.json({authenticated: true, user: {id: user.id, account: user.account}})
})

module.exports = router