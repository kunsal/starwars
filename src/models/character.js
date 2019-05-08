const request = require('request');
const swapiUrl = 'https://swapi.co/api';

/**
 * Get movie by ID
 * @param id
 * @return Promise
* */
function getMovie(id) {
    const options = {
        url: `${swapiUrl}/films/${id}`,
        json: true,
        headers: {
            'User-Agent': 'request',
        }
    }

    return new Promise((resolve, reject) => {
        request.get(options, (err, resp, body) => {
            if(err) {
                reject (err)
            }else {
                resolve(resp)
            }
        })
    })
}

/**
 * Get all movies
 * @return Promise
 * */
function getMovies() {
    const options = {
        url: `${swapiUrl}/films`,
        json: true,
        headers: {
            'User-Agent': 'request',
        }
    }

    return new Promise((resolve, reject) => {
        request.get(options, (err, res, body) => {
            if(err) {
                reject(err)
            }else{
                resolve(res)
            }
        })
    })
}

module.exports.getMovies = getMovies;
module.exports.getMovie = getMovie;