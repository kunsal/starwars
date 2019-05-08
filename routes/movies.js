const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { getMovies } = require('../models/movie');
const {getCommentsByMovie} = require('../models/comment');

router.get('/', async (req, res) => {

    try{
        const sortedMovies = _.sortBy(movies.results, ['release_date']);
        return res.send(sortedMovies);
        let my_movies = [];
        _.each(sortedMovies, (movie, key) => {
            let url_array = movie.url.split('/');
            const movie_id = url_array[5];
            const comments = [];
            getCommentsByMovie(movie_id, function (err, comments) {
                if (err) throw err;
                comments.push(comments);
            });
            movie['comments'] = comments;
            my_movies.push(_.pick(movie, ['title', 'opening_crawl', 'release_date', 'comments']))
        });
        res.send(my_movies);
    }catch (e) {
        throw e
    }

});

module.exports = router;