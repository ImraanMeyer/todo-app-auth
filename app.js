const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');

// Make use of .env for config
require('dotenv').config();

// Init Express
const app = express();

// App middlewear
app.use(express.json()) // enable this to recieve JSON data from client
app.use(morgan('dev')) // visualize api requests
app.use(cors());

// Connect to MongoDb
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB connected ...'))
    .catch(err => console.log('DB CONNECTION ERROR', err))

// Import Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const todoRoutes = require('./routes/todo.routes');

// Use Routes middlewear
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', todoRoutes);

// Establish Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))