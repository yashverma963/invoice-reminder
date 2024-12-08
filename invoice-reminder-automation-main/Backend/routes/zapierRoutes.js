const express = require('express');
const { sendReminder } = require('../controllers/zapierController');
const router = express.Router();

router.post('/send-reminder', sendReminder);

module.exports = router;
