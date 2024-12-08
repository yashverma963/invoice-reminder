const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios'); // Import Axios
const User = require('../models/User'); // Ensure you have a User model
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST request handler for Google authentication
router.post('/google', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub, email, name, picture } = payload;

        let user = await User.findOne({ googleId: sub });

        if (!user) {
            user = new User({
                googleId: sub,
                email,
                name,
                picture
            });
            await user.save();
        }

        req.session.userId = user.id;
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

// GET request handler for logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
});

module.exports = router;
