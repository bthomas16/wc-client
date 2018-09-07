// const express = require('express');
// const router = express.Router();
// const knex = require('../config/db');
// const Promise = require('promise');
// const Collection = require('../models/collection.js');

// const VerifyToken = require('../middleware/VerifyToken');



// router.post('/', VerifyToken,  async (req, res) => {
//     console.log('token is chill', req.body.name)
//     let collectionName = req.body.name;
//     let user_id = req.id
//     if(Collection.validateCollectionFormData (collectionName, res)){
//         Collection.saveCollectionNameToDB(collectionName, user_id, res); 
//     }
// })

// router.get('/', VerifyToken, async (req, res) => {
//     try
//     {
//         knex('collection').where('collection_id', req.id).then(collection => {
//             console.log(collection, 'this be from the server the collection')
//             res.json({isSuccess: true, collection})
//         })
//     }
//     catch
//     {
//         res.json({isSuccess: false, message: 'Could not get collection at this time'})
//     }
    
// })




// module.exports = router;