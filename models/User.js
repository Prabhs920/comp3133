const mongoose = require('mongoose');

// Define User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4 // Username must have at least 4 characters
    },
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Valid email format
    },
    city: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]+$/ // Only alphabets and space allowed
    },
    website: {
        type: String,
        required: true,
        match: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/ // Valid web URL
    },
    zipCode: {
        type: String,
        required: true,
        match: /^\d{5}-\d{4}$/ // Zip code format 12345-1234
    },
    phone: {
        type: String,
        required: true,
        match: /^1-\d{3}-\d{3}-\d{4}$/ // Phone format 1-123-123-1234
    }
});

// Create User Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
