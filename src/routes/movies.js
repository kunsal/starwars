const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {getMovies, getMovie} = require('../models/movie');
const {Comment, countCommentsByMovieId, getCommentsByMovie} = require('../models/comment');
const {displayError, displaySuccess} = require('../helpers/response');

/**
 * Route for /movies
 * */
router.get('/', async (req, res) => {
    const movies = await getMovies().catch(err => {
        return res.status(404).send(displayError('Movies can not be fetched at this time. Please check again'))
    });
    if (movies.statusCode !== 200) {
        return res.status(404).send(displayError('No movies found'));
    }
    const sorted_movies = _.sortBy(movies.body.results, ['release_date']);
    const movies_count = sorted_movies.length;
    var result = [];
    for (var i = 0; i < movies_count; i++) {
        let movie = sorted_movies[i];
        let url_array = movie.url.split('/');
        const movie_id = url_array[5];
        movie.comments_count = await Comment.count({
            where: {movie_id: movie_id}
        }).catch(err => {
           return res.status(500).send('An error occurred. Please try again')
        });
        result.push(_.pick(movie, ['title', 'opening_crawl', 'release_date', 'comments_count']));
    }

    Promise.all(result).then((movies) => {
         return res.send(movies);
    })
});

router.get('/:id', async (req, res) => {
    const movie_id = req.params.id;
    const movie = await getMovie(movie_id).catch(err => {
        return res.status(500).send(displayError('It\'s dark in here. Something went wrong'))
    });
    if(movie.statusCode === 404) {
        return res.status(404).send({status: 'error', message: `No movie with the ID ${movie_id} found`});
    }
   // movie.comments = await getCommentsByMovie(movie_id);
    const result = {
        title: movie.title,
        opening_crawl: movie.opening_crawl,
        release_date: movie.release_date,
        comments: movie.comments
    };
    res.send(displaySuccess(result));
});

module.exports = router;


//console.log(comments);
// movie.comments = await Comment.findAll({
//     raw: true,
//     attributes: ['id', 'content', 'commenter_ip', 'created_at'],
//     order: [['created_at', 'DESC']],
//     where: {movie_id: movie_id}
// }).catch(err => {
//     throw err
// });