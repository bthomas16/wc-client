const express = require('express');
const router = express.Router();
const knex = require('../config/db');
const Promise = require('promise');
const WatchModel = require('../models/watch.js');

const VerifyToken = require('../middleware/VerifyToken.js');


router.post('/', VerifyToken, async (req, res) => {
    let formData = req.body;
    if(WatchModel.validateWatchFormData(formData, res))
    WatchModel.saveWatchToCollectionDB(formData, req.id, res); 
});

router.put('/:id', VerifyToken, (req, res) => {
    let formData = req.body;
    let id = req.params.id
    WatchModel.updateWatchById(req.params.id, formData, res);
});

router.get('/', VerifyToken, async (req, res) => {
    try
    {   
        await knex('watch').where('user_id', req.id)
            .then(collection => { 
            if(collection.length > 0) 
                res.status(200).json({collection});
            else 
                res.status(404).json({Collection: false, message: 'No collection'})
        }) 
    }
    catch
    {   
        res.status(403).json({isSuccess: false, message: 'Could not get collection at this time'})
    } 
})

module.exports = router;