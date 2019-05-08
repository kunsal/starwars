const Joi = require('joi');
const sql = require('./db');

function addComment(newComment, result) {
    sql.query("INSERT INTO comments set ?", newComment, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    })
}

async function getById(id, result) {
    sql.query(`SELECT * FROM comments where id = ?`, id,(err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
        }else{
            console.log(res);
            result(null, res);
        }
    })
}

function validateComment(comment) {
    const schema = {
        movie_id: Joi.number().required(),
        comment: Joi.string().required().min(2).max(500),
    }

    return Joi.validate(comment, schema);
}

module.exports.validate = validateComment;
module.exports.add = addComment;
module.exports.getCommentsByMovie = getById;