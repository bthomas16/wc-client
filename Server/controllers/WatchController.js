const express = require('express');
const router = express.Router();
const knex = require('../config/db');
const Promise = require('promise');
const Watch = require('../models/watch.js');

const VerifyToken = require('../middleware/VerifyToken');


router.post('/', VerifyToken, async (req, res) => {
    let formData = req.body.watch;
    console.log(req.body, 'checking body')
    if(Watch.validateWatchFormData(formData, res))
        Watch.saveWatchToCollectionDB(formData, req.id, res); 
})

router.get('/', VerifyToken , async (req, res) => {
    try
    {
        knex('watch').where('user_id', req.id).then(collection => {
            console.log('collection would be', collection)
            res.json({collection})
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