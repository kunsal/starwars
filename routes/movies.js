const express = require('express');
const router = express.Router();
const request = require('request');
const swapiUrl = 'https://swapi.co/api';
const movies = require('../movies');
const _ = require('lodash');

router.get('/', async (req, res) => {
    // request(`${swapiUrl}/people/1`, {json: true, method:'get'}, (err, response, body) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).send('An error occurred. Please try again')
    //     }
    //     return res.send({sender: req.ip, response: response, body: body})
    // })

    const sortedMovies = _.sortBy(movies.results, ['release_date']);
    let my_movies = [];
    _.each(sortedMovies, (value, key) => {
        my_movies.push(_.pick(value, ['title', 'opening_crawl', 'release_date']))
    });
    res.send(my_movies);
});

module.exports = router;