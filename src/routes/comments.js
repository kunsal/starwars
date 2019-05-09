const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {addComment, validate} = require('../models/comment');
const { getMovie } = require('../models/movie');
const { displaySuccess, displayError } = require('../helpers/response');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({status: 'error', message: error.details[0].message});
    try {
        // Validate existence of movie
        const movie_id = req.body.movie_id;

        const movie = await getMovie(movie_id);
        if(movie.statusCode === 404) return res.status(404).send({status: 'error', message: `No movie with the ID ${movie_id} found`});
        const newComment = {
            movie_id: req.body.movie_id,
            content: req.body.comment,
            commenter_ip: req.ip,
            created_at: new Date(),
        };
        const comment = await addComment(newComment);
        res.send(displaySuccess({comment_id: comment.id}, 'Comment added'));
    }catch (e) {
        console.log(e.message);
        res.status(500).send(displayError('An error occurred and could not add comment'))
    }
});

module.exports = router;