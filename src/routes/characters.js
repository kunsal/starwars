const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {People} = require('../models/character');
const {displayError, displaySuccess} = require('../helpers/response');

/**
 * Route for /people
 * */
router.get('/', async (req, res) => {
    let people = await People().catch(err => {
        return res.status(404).send(displayError('People can not be fetched at this time. Please check again'))
    });
    if (people.statusCode !== 200) {
        return res.status(404).send(displayError('Nobody is here'));
    }
    people = people.body.results;
    // Query parameters
    let sort_by = req.query.sort_by;
    let sort_order = req.query.sort_order;
    let filter_by = req.query.filter_by;
    // Do sorting if defined
    if(sort_by !== undefined || sort_order !== undefined) {
        // Check if sort_by value is accepted
        const can_sort_by = _.includes(['name', 'gender', 'height'], sort_by);
        const allowed_sort_order = _.includes(['desc', 'asc'], sort_order);
        people = _.orderBy(people, [can_sort_by ? sort_by : ''], [allowed_sort_order ? sort_order : 'asc'])
    }
    // Do filtering if defined
    if(filter_by !== undefined) {
        people = _.filter(people, {gender: filter_by})
    }
    // Calculate height in cm and ft
    res.send(people);

});

module.exports = router;