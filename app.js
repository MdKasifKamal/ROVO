const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/driver', require('./routes/driverRoutes'));
app.use('/rider', require('./routes/riderRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// Error Handling Middleware
app.use(require('./middlewares/errorMiddleware'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
