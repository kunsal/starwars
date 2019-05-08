const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {add, validate} = require('../models/comment');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({status: 'error', message: error.details[0].message});
    //return res.send(req.body);
    try {
        const newComment = {
            movie_id: req.body.movie_id,
            body: req.body.comment,
            commenter_ip: req.ip,
        };
        add(newComment, function (err, comment) {
            if(err) {
                res.status(500).json({status: 'error', message: 'Could not add comment'});
            }
            res.send({status: 'success', body: {message: 'Comment added successfully', comment_id: comment}});
        })
    }catch (e) {
        console.log(e);
        res.status(500).send('An error occurred')
    }
});

module.exports = router;