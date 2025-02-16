const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

// Import users route
const usersRoute = require('./routes/users');
app.use('/users', usersRoute); // This must be before app.listen()

app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
