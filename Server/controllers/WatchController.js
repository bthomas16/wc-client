const express = require('express');
const router = express.Router();
const knex = require('../config/db');
const Promise = require('promise');
const Watch = require('../models/watch.js');

const VerifyToken = require('../middleware/VerifyToken');


router.post('/', VerifyToken, async (req, res) => {
    let formData = req.body;
    Watch.validateWatchFormData(formData, res);
    Watch.saveWatchToCollectionDB(formData, req.id, res); 
})

router.get('/', VerifyToken , async (req, res) => {
    try
    {
        knex('watch').where('collection_id', req.id).then(collection => {
            console.log(collection)
            res.json({isSuccess: true, collection})
        })
    }
    catch
    {
        res.json({isSuccess: false, message: 'Could not get collection at this time'})
    }
    
})




module.exports = router;