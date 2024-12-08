// const express = require('express');
// const passport = require('passport');
// const { OAuth2Client } = require('google-auth-library');
// const User = require('../models/User');
// const router = express.Router();

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// router.post('/google', async (req, res) => {
//   const { token } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { sub, email, name, picture } = payload;

//     let user = await User.findOne({ googleId: sub });

//     if (!user) {
//       user = new User({
//         googleId: sub,
//         email,
//         name,
//         picture
//       });
//       await user.save();
//     }

//     req.session.userId = user.id;
//     // console.log('Session2:', req.session); // Add logging
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// module.exports = router;

const express = require('express');
const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    // Set userId in the session
    req.session.userId = user.id;

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
