const Sequelize = require('sequelize');
const Joi = require('joi');

const commentSchema = {
    movie_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    content: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    commenter_ip: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
}

const Comment = sequelize.define('Comment', commentSchema);

async function addComment(object) {
    return await Comment.create(object).catch(error => {
        throw error
    })
}

function getCommentsByMovie(id, attributes = []) {
    return Comment.findAll({
        raw: true,
        attributes: attributes,
        order: [['created_at', 'DESC']],
        where: {'movie_id': id}
    }).then((comments) => {
        return comments
    }).catch(error => {
        throw error
    });
}

function validateComment(comment) {
    const schema = {
        movie_id: Joi.number().required(),
        comment: Joi.string().required().min(2).max(500),
    }
    return Joi.validate(comment, schema);
}

function countCommentsByMovieId(id) {
    return Comment.count({
        where: {'movie_id': id}
    }).then(count => {
        return count;
    }).catch(err => {
        console.log(err)
    });
    //return Promise.all()
}

module.exports.validate = validateComment;
module.exports.addComment = addComment;
module.exports.getCommentsByMovie = getCommentsByMovie;
module.exports.countCommentsByMovieId = countCommentsByMovieId;
module.exports.Comment = Comment;