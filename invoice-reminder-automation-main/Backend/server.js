// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const session = require('express-session');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const invoiceRoutes = require('./routes/invoices');
// const zapierService = require('./services/zapier');

// const app = express();

// app.use(cors({
//     origin: 'http://localhost:3000', // Allow requests from this origin
//     credentials: true, // Allow cookies to be sent with requests
// }));

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Failed to connect to MongoDB', err);
// });

// app.use(express.json());
// app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport');

// app.use('/auth', authRoutes);
// app.use('/invoices', invoiceRoutes);

// // Default route to handle GET requests to the root URL
// app.get('/', (req, res) => {
//     res.send('Welcome to the backend server!');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// require('dotenv').config();
// require('./services/reminderService');
// const express = require('express');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// app.use(bodyParser.json());
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// const authRoutes = require('./auth/authRoutes');
// const invoiceRoutes = require('./routes/invoiceRoutes');
// const zapierRoutes = require('./routes/zapierRoutes');

// app.use('/auth', authRoutes);
// app.use('/invoices', invoiceRoutes);
// app.use('/zapier', zapierRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();
require('./services/reminderService');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoStore = require('connect-mongo');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Middleware setup
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/test',
    ttl: 24 * 60 * 60,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

// Import routes
const authRoutes = require('./auth/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const zapierRoutes = require('./routes/zapierRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/zapier', zapierRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
