const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express'); // Import Apollo Server
const dotenv = require('dotenv');
const typeDefs = require('./schema'); // Import GraphQL schema
const resolvers = require('./resolvers'); // Import GraphQL resolvers

dotenv.config();

// MongoDB Atlas Connection String
const mongodb_atlas_url = process.env.MONGODB_URL;

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongodb_atlas_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Success: MongoDB connected');
    } catch (error) {
        console.error(`❌ Error: Unable to connect to DB: ${error.message}`);
        process.exit(1); // Exit process if unable to connect
    }
};

// Initialize Express Server
const app = express();
app.use(express.json());
app.use('*', cors());

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    // Start Express Server AFTER MongoDB connection
    app.listen(process.env.PORT || 4000, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
    });
}

// Start everything
connectDB().then(() => startServer());
