const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {getMovies, getMovie} = require('../models/movie');
const {Comment, getCommentsByMovie, countCommentsByMovieId} = require('../models/comment');
const {displayError, displaySuccess} = require('../helpers/response');

/**
 * Route for /movies
 * */
// router.get('/', async (req, res) => {
//     const movies = await getMovies().catch(err => {
//         return res.status(404).send(displayError('Movies can not be fetched at this time. Please check again'))
//     });
//     if (movies.statusCode !== 200) {
//         return res.status(404).send(displayError('No movies found'));
//     }
//     const sorted_movies = _.sortBy(movies.body.results, ['release_date']);
//     const movies_count = sorted_movies.length;
//     let result = [];
//     for (var i = 0; i < movies_count; i++) {
//         let movie = sorted_movies[i];
//         let url_array = movie.url.split('/');
//         const movie_id = url_array[5];
//         movie.comments_count = await Comment.count({
//             where: {movie_id: movie_id}
//         }).catch(err => {
//            return res.status(500).send('An error occurred. Please try again')
//         });
//         movie.movie_id = movie_id;
//         result.push(_.pick(movie, ['movie_id', 'title', 'opening_crawl', 'release_date', 'comments_count']));
//     }
//
//     Promise.all(result).then((movies) => {
//          return res.send(displaySuccess(movies));
//     })
// });

router.get('/', async (req, res) => {
    try {
        const movies = await getMovies();
        if (movies.statusCode !== 200) return res.status(404).send(displayError('No movies found'));
        const sorted_movies = _.sortBy(movies.body.results, ['release_date']);
        const movies_count = sorted_movies.length;
        let result = [];
        for (var i = 0; i < movies_count; i++) {
            let movie = sorted_movies[i];
            let url_array = movie.url.split('/');
            const movie_id = url_array[5];
            movie.comments_count = await countCommentsByMovieId(movie_id);
            movie.movie_id = movie_id;
            result.push(_.pick(movie, ['movie_id', 'title', 'opening_crawl', 'release_date', 'comments_count']));
        }
        return res.send(displaySuccess(result));
    }catch (e) {
        return res.status(500).send('An error occurred. Please try again')
    }

});

/**
 * movies/<id>
 */
router.get('/:id', async (req, res) => {
    const movie_id = req.params.id;
    let movie = await getMovie(movie_id).catch(err => {
        return res.status(500).send(displayError('It\'s dark in here. Something went wrong'))
    });
    if(movie.statusCode === 404) {
        return res.status(404).send({status: 'error', message: `No movie with the ID ${movie_id} found`});
    }
    const comments = await getCommentsByMovie(movie_id);
    movie.body.comments = comments;
    movie.body.comments_count = comments.length;
    const result = _.pick(movie.body, ['title', 'opening_crawl', 'release_date', 'comments_count', 'comments']);
    res.send(displaySuccess(result));
});

module.exports = router;