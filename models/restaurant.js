const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    cuisine: { type: [String], required: true },
    restaurant_id: { type: String, required: true },
    address: {
        building: { type: String },
        street: { type: String, required: true },
        zipcode: { type: String }
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
