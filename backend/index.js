const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS
app.use('/tasks', taskRoutes); // Use task routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todolist')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
