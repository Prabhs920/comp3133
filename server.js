require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Restaurant = require('./models/restaurant');  // Adjust the path if needed

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// 4. GET All Restaurant Details (Select All Columns)
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();  // Retrieve all restaurants
        res.json(restaurants);  // Send all restaurant data
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 5. GET Restaurants by Cuisine (e.g., `/restaurants/cuisine/Japanese`)
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    try {
        const cuisine = req.params.cuisine;
        const restaurants = await Restaurant.find({ cuisine: { $in: [cuisine] } });  // Filter by cuisine
        res.json(restaurants);  // Send filtered restaurant data
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 6. GET Restaurants Sorted by restaurant_id (Ascending or Descending)
app.get('/restaurants', async (req, res) => {
    try {
        const sortBy = req.query.sortBy === 'ASC' ? 1 : -1;  // ASC or DESC sorting
        const restaurants = await Restaurant.find({}, 'restaurant_id cuisine name city restaurant_id')
            .sort({ restaurant_id: sortBy });  // Sort restaurants by restaurant_id
        res.json(restaurants);  // Send sorted restaurant data
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 7. GET Restaurants where Cuisine is "Delicatessen" and City is Not "Brooklyn"
app.get('/restaurants/Delicatessen', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({
            cuisine: { $in: ['Delicatessen'] },  // Filter by "Delicatessen" cuisine
            city: { $ne: 'Brooklyn' }  // Exclude "Brooklyn" city
        }, 'cuisine name city')  // Select only `cuisine`, `name`, `city`
            .sort({ name: 1 });  // Sort results in ascending order by `name`
        res.json(restaurants);  // Send filtered and sorted restaurant data
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
