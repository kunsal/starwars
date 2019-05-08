const request = require('request');
const swapiUrl = 'https://swapi.co/api';

/**
 * Get character
 * @param id
 * @return Promise
* */
function people() {
    const options = {
        url: `${swapiUrl}/people`,
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

module.exports.People = people;