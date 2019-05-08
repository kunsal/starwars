// Imports
const config = require('config');
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');

// Database connection
require('./src/database/connection');

const movies = require('./src/routes/movies');
const comments = require('./src/routes/comments');

dotenv.config();
app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/comments', comments);
app.use('/api/movies', movies);

// Close database connection
//connection.end(function (err) {});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));