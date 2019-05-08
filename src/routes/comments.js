const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {addComment, validate} = require('../models/comment');
const { getMovie } = require('../models/movie');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({status: 'error', message: error.details[0].message});
    // Validate existence of movie
    const movie_id = req.body.movie_id;
    const movie = await getMovie(movie_id).catch(err => {
        return res.status(500).send({status: 'error', message: 'Could not validate movie'})
    });
    if(movie.statusCode === 404) return res.status(404).send({status: 'error', message: `No movie with the ID ${movie_id} found`});
    const newComment = {
        movie_id: req.body.movie_id,
        content: req.body.comment,
        commenter_ip: req.ip,
        created_at: new Date(),
    };

    const comment = await addComment(newComment).catch(err => {
                return res.status(500).json({status: 'error', message: 'Could not add comment'});
            });
    res.send({status: 'success', body: {message: 'Comment added successfully', comment_id: comment}});
});

module.exports = router;