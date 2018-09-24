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
            else res.status(404).json({Collection: false, message: 'No collection'})
        }) 
    }
    catch
    {
        res.json({isSuccess: false, message: 'Could not get collection at this time'})
    } 
})

router.put('/', VerifyToken, async (req, res) => {
    let userId = req.id;
    console.log(req.body)
    let watchToUpdate = req.body;
    updateWatchOrder(watchToUpdate).then(() => {
        shiftUsersWatchesAfterNewIndex(watchToUpdate, userId).then(() => {
            res.status(201).json({isSuccess: true, message: 'Watches updated very super sawesome', watchToUpdate})
        }) 
    })
})

function updateWatchOrder(watch) {
    
    return new Promise((resolve, reject) => {
        console.log('trying!!', watch)
        knex('watch')
        .where('id', watch.id)
        .update({ order: watch.order })
        .then((res) => {
            console.log('Watch order updated', res)
            resolve();
        }).catch((err) =>{
            console.log(err)
            reject();
        });
    })
}

function shiftUsersWatchesAfterNewIndex(watch, userId) {
    return new Promise((resolve, reject) => {    
        knex('watch').where('user_id', userId).andWhere('order', '>' , watch.order).then(watches =>{
            let ordersUpdated = watches.map(watch => {
                return watch.order + 1;
            });
            return ordersUpdated;
        }).update({order: ordersUpdated.order}).then(() => {
            console.log('even super further updated', res)
            resolve()
        }).catch((err) => {
            console.log(err);
            reject();
        });
    })
}
            
            
           





module.exports = router;



// knex('peeps')
//             .fullOuterJoin('watch','peeps.id', 'watch.user_id')
//             .then(collection => {
//             console.log('outer join worked!??@?!?!', collection)
//             res.json({isSuccess: true, collection})
//         }).catch(err => {
//             console.log(err)
//         })