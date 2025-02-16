require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
    console.log('✅ Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('❌ MongoDB connection error:', error);
});

// Read JSON file
const rawData = JSON.parse(fs.readFileSync('UsersData.json', 'utf-8'));

// Transform data to match our User schema with safe checks
const formattedUsers = rawData.map(user => ({
    username: user.username || "Unknown",  // Default username if missing
    email: user.email || "unknown@example.com", // Default email if missing
    city: user.address?.city || "Unknown City", // Handle missing address
    website: user.website || "http://example.com", // Default website if missing
    zipCode: user.address?.zipcode || "00000-0000", // Handle missing zipCode
    phone: user.phone || "1-000-000-0000" // Default phone if missing
}));

// Insert Users into MongoDB
const insertUsers = async () => {
    try {
        await User.insertMany(formattedUsers);
        console.log('✅ Users imported successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error inserting users:', error);
        mongoose.connection.close();
    }
};

insertUsers();
