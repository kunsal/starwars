// Imports
const winston = require('winston');
const Joi = require('joi');
const config = require('config');
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const movies = require('./routes/movies');

dotenv.config();
app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// async function connectDb() {
//     await mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true });
//     console.log('Database connected')
// }
// connectDb();

app.use('/api/movies', movies);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));