const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {getMovies, getMovie} = require('../models/movie');
const {Comment, getCommentsByMovie, countCommentsByMovieId} = require('../models/comment');
const {displayError, displaySuccess} = require('../helpers/response');
const {People} = require('../models/character');

/**
 * Route for /movies
 * */

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
    try {
        const movie_id = req.params.id;
        let movie = await getMovie(movie_id);
        if(movie.statusCode === 404) {
            return res.status(404).send({status: 'error', message: `No movie with the ID ${movie_id} found`});
        }
        const comments = await getCommentsByMovie(movie_id, ['content', 'commenter_ip', 'created_at']);
        movie.body.comments = comments;
        movie.body.comments_count = comments.length;
        const result = _.pick(movie.body, ['title', 'opening_crawl', 'release_date', 'comments_count', 'comments']);
        res.send(displaySuccess(result));
    } catch (e) {
        return res.status(500).send(displayError('An error occurred. Please try again'))
    }
});

router.get('/:id/comments', async (req, res) => {
    try {
        const movie_id = req.params.id;
        let movie = await getMovie(movie_id);
        if(movie.statusCode === 404) {
            return res.status(404).send({status: 'error', message: `No movie with the ID ${movie_id} found`});
        }
        const comments = await getCommentsByMovie(movie_id, ['movie_id','content', 'commenter_ip', 'created_at']);
        res.send(displaySuccess(comments));
    } catch (e) {
        return res.status(500).send(displayError('An error occurred. Please try again'))
    }
});

router.get('/:id/characters', async (req, res) => {
    try {
        const movie_id = req.params.id;
        let movie = await getMovie(movie_id);
        if(movie.statusCode === 404) {
            return res.status(404).send({status: 'error', message: `No movie with the ID ${movie_id} found`});
        }
        // Get list of people
        let people = await People();

        if (people.statusCode !== 200) {
            return res.status(404).send(displayError('Nobody is here'));
        }
        people = people.body.results;
        // Filter people by movie_id
        let characters = [];
        for(let i = 0; i < people.length; i++) {
            if(_.includes(people[i].films, `https://swapi.co/api/films/${movie_id}/`)){
                people[i].height_in_ft = toFeet(people[i].height);
                characters.push(people[i]);
            }
        }
        // Query parameters
        let sort_by = req.query.sort_by;
        let sort_order = req.query.sort_order;
        let filter_by = req.query.filter_by;
        // Do sorting if defined
        if(sort_by !== undefined || sort_order !== undefined) {
            // Check if sort_by value is accepted
            const can_sort_by = _.includes(['name', 'gender', 'height'], sort_by);
            const allowed_sort_order = _.includes(['desc', 'asc'], sort_order);
            characters = _.orderBy(characters, [can_sort_by ? sort_by : ''], [allowed_sort_order ? sort_order : 'asc'])
        }
        // Do filtering if defined
        if(filter_by !== undefined) {
            characters = _.filter(characters, {gender: filter_by})
        }
        // Calculate height in cm and ft
        res.send(displaySuccess(characters));

    }catch (e) {
        return res.status(500).send(displayError('An error occurred. Please try again'))
    }
});

function toFeet(n) {
    var realFeet = ((n*0.393700) / 12);
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + 'ft' + inches + 'in';
}

module.exports = router;