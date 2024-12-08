// const express = require('express');
// const { getInvoices, getDueInvoices } = require('../controllers/invoiceController');
// const router = express.Router();

// const requireAuth = (req, res, next) => {
//   console.log('Session1:', req.session); // Add logging
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'You must log in!' });
//   }
//   next();
// };

// console.log('passed');

// router.get('/', requireAuth, getInvoices);
// router.get('/due', requireAuth, getDueInvoices);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { getInvoices, getDueInvoices } = require('../controllers/invoiceController');

router.get('/', getInvoices);
router.get('/due', getDueInvoices);

module.exports = router;