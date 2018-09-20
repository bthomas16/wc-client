const express = require('express');
const router = express.Router();
const knex = require('../config/db');
const Promise = require('promise');
const Watch = require('../models/watch.js');

const VerifyToken = require('../middleware/VerifyToken.js');


router.post('/', VerifyToken, async (req, res) => {
    let formData = req.body;
    if(Watch.validateWatchFormData(formData, res))
        Watch.saveWatchToCollectionDB(formData, req.id, res); 
})

router.get('/', VerifyToken , async (req, res) => {
    try
    {
        knex('watch').where('user_id', req.id).then(collection => {
            if(collection.length > 0) res.status(200).json({collection});
            else res.json({hasCollection: false, message: 'No collection'})
        }) 
    }
    catch
    {
        res.json({isSuccess: false, message: 'Could not get collection at this time'})
    }
    
})




module.exports = router;



// knex('peeps')
//             .fullOuterJoin('watch','peeps.id', 'watch.user_id')
//             .then(collection => {
//             console.log('outer join worked!??@?!?!', collection)
//             res.json({isSuccess: true, collection})
//         }).catch(err => {
//             console.log(err)
//         })