const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require('../models/User');


const fetchuser = require("../middleware/fetchUser")
let jwt = require("jsonwebtoken");

let JWT_SECRET = process.env.JWT_SECRET;

console.log(JWT_SECRET)

const { body, validationResult } = require("express-validator");

//create a user using: POST "/api/auth"
router.post('/register', [
    body("username", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 character's").isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    let user = await User.findOne({ username: req.body.username });
    if (user) {
        console.log(user.password)
        return res.status(400).json({ error: "username already exist, please pick a unique username " });

    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
        username: req.body.username,
        password: secPass,
    })

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, JWT_SECRET);
    res.json({ token });
})

//authenticate a user api/auth/login    
router.post(
    "/login",
    [
        body("username", "Enter a valid name").isLength({ min: 3 }),
        body("password", "Password is required").exists(),
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ success: success, error: "User does not exist" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success: success, error: "Wrong password" });
            }

            const data = {
                user: {
                    id: user.id,
                },
            };

            const token = jwt.sign(data, JWT_SECRET);
            console.log(token);
            success = true



            res.json({ success, token });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

router.post(
    "/updateUser",
    [
        body("newUsername", "Enter a valid new name").isLength({ min: 3 }),
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, newUsername } = req.body;

        console.log('request cam for :' + username);
        try {
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(400).json({ success, error: "User does not exist" });
            }

            // Update the username
            user.username = newUsername;
            await user.save();

            success = true;
            res.json({ success, message: "Username updated successfully", user });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);


// get logged in user details
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/fetchallusers', async (req, res) => {
    const users = await User.find({}, 'username');
    res.json(users);
})



module.exports = router