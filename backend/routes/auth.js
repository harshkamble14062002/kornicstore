const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// Sign Up
router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
         // Hash the password
        //  const salt = await bcrypt.genSalt(10);
        //  const hashedPassword = await bcrypt.hash(password, salt);
        const hashedPassword=password;

        // Create new user with hashed password
        user = new User({ name, email, password: hashedPassword, phone });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login
console.log("came till here 1");
router.post('/login', async (req, res) => {
    console.log("🔹 Login request received:", req.body); // Log request body
    const { email, password } = req.body;

    if (!email || !password) {
        console.log("❌ Missing email or password");
        return res.status(400).json({ message: 'Email and password are required' });
    }
    
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(400).json({ message: 'Invalid email or password  : User not found:' });
        } 

        // Compare passwords
        // const isMatch = await bcrypt.compare(password, user.password);
        // const isMatch = await bcrypt.compare(password, user.password);
        console.log(user.password  );
        if (password !== user.password) {
            console.log("❌ Incorrect password for:", email);
            return res.status(400).json({ message: 'Invalid email or password: Incorrect password ' });
        }

        // Generate JWT
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log("✅ Login successful for:", email);
        res.json({ success: true,token, message: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
