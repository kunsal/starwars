const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {getMovies} = require('../models/movie');
const {Comment} = require('../models/comment');
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
    let result = [];
    let iterator = 0;

    await _.each(sorted_movies, async (movie, key) => {
        let url_array = movie.url.split('/');
        const movie_id = url_array[5];
        //console.log(comments);
        movie.comments = await Comment.findAll({
            raw: true,
            attributes: ['id', 'content', 'commenter_ip', 'created_at'],
            order: [['created_at', 'DESC']],
            where: {movie_id: movie_id}
        }).catch(err => {
                throw err
            });
        result.push(_.pick(movie, ['title', 'opening_crawl', 'release_date', 'comments']));
        if (iterator === movies_count) {
            return res.send(result)
        }
        iterator ++;
    });
    //res.send(result);
});

module.exports = router;