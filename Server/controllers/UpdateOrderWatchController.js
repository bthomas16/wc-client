const express = require('express');
const router = express.Router();
const knex = require('../config/db');
const Promise = require('promise');
const WatchModel = require('../models/watch.js');

const VerifyToken = require('../middleware/VerifyToken.js');

async function updateWatchOrder(watch, index) {
    await knex('watch').where('id', watch.id).returning('*').update({
        order: index
    }).then(w => {
        console.log(w, 'updatef this ish')
    })
}

router.put('/', VerifyToken, async (req, res) => {
    let collection = req.body;
    collection.forEach(async (watch, index) => {
        await updateWatchOrder(watch, index);
    })
});

module.exports = router;