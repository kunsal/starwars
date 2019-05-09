// Imports
const config = require('config');
//const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');

// Database connection
require('./src/database/connection');

const movies = require('./src/routes/movies');
const comments = require('./src/routes/comments');
const characters = require('./src/routes/characters');

//dotenv.config();
app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/comments', comments);
app.use('/api/movies', movies);
app.use('/api/characters', characters);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));