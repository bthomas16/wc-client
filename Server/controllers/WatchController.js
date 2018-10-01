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
});

router.get('/', VerifyToken, async (req, res) => {
    console.log('getting watches', req.id)
    try
    {
    console.log('getting watches trying')
        
        await knex('watch').where('user_id', req.id)
            .then(collection => {
    console.log('getting watches collection', collection)
                
            if(collection.length > 0) 
                res.status(200).json({collection});
            else 
                res.status(404).json({Collection: false, message: 'No collection'})
        }) 
    }
    catch
    {
    console.log('getting watches catching')
        
        res.json({isSuccess: false, message: 'Could not get collection at this time'})
    } 
})

router.get('/favorite', VerifyToken, (req, res) => {
    console.log('server getting faves');
    knex('user_watch_favorited').where('user_id', req.id).andWhere('isCurrentFavorite', true).then(favorites => {
        res.status(200).json({favorites});
    }).catch(err => {
        console.log(err)
        res.status(404).json({ favorites: []})
    })
})

router.get('/favorite-icon', VerifyToken, (req, res) => {
    knex('user_watch_favorited').where('user_id', req.id).then(favorites => {
        res.status(200).json({favorites});
    }).catch(err => {
        console.log(err)
        res.status(404).json({ favorites: []})
    })
})

// api request
router.post('/favorite', VerifyToken, async (req, res) => {
    let watchId = req.body.watchId; // watch to favorite id
    let userId = req.id;  // user adding watcht o favorites
    let isFavoriteRowExist = await getFavoriteRowExist(userId, watchId) // has this watch been favorited before?
        let favoriteWatch = isFavoriteRowExist;
        if(favoriteWatch) toggleWatchfavorite(favoriteWatch, res, userId) // if so, toggle it
        else createNewFavorite(userId, watchId, res)
})

function toggleWatchfavorite(favoriteWatch, res, userId) {
    knex('user_watch_favorited').where('id', favoriteWatch.id).returning('*').update({
        isCurrentFavorite: !favoriteWatch.isCurrentFavorite
    }).then( async (favorites) => {
        console.log('toggled', favorites)
        await getFavoriteWatches(userId, res);
    }).catch(err => {
        res.status(500).send(err)
    })
}

function getFavoriteWatches(userId, res) {
    knex('user_watch_favorited').where('user_id', userId).andWhere('isCurrentFavorite', true).then(favorites => {
        res.status(200).json({favorites})
    }).catch(err => { 
        res.status(404).res.json({favorites: []})
    })
}

function getFavoriteRowExist(userId, watchId) {
    return knex('user_watch_favorited').where('user_id', userId).andWhere('watch_id', watchId).first()
    .then(watch => {
        console.log('check this favorite status',  watch)
        return watch;
    }).catch(() => {
        return false
    })
}

function createNewFavorite(userId, watchId, res) {
    knex('user_watch_favorited')
    .returning('id')
    .insert({
        user_id: userId,
        watch_id: watchId,
        isCurrentFavorite: true
    }).then(id => {
        getFavoriteWatches(userId, res)
    }).catch(() =>{
        res.status(500).send();
    })
}











// UpdateWatchOrder

const getWatchByMovedId = function(movedWatchId) {
    return knex('watch').where('id', movedWatchId).then(watch => {
        return watch;
    })
}

const updateWatchOrder = async function(watch) {
    await knex('watch').where('id', watch.id).update({order: watch.order});
}

const updateWatchOrderNewIndex = async function(id, newIndex) {
    await knex('watch').where('id', id).update({order: newIndex});
}

const getWatchesToUpdate = function(userId, movedWatchId) {
    return knex('watch').where('user_id', userId).andWhere('id', '!=', movedWatchId).then(watches => {
        return watches;
    })
}

router.put('/', VerifyToken, async (req, res) => {
    let userId = req.id;
    w = req.body;
    await updateWatchOrderNewIndex(w.id, w.newIndex)
    let movedWatch = await getWatchByMovedId(w.id);
    let Collection = await getWatchesToUpdate(userId, w.id);    
    if(w.newIndex == w.oldIndex)        
        await Collection.forEach(async (watch) => {
            if(watch.order >= w.newIndex + 1) {
                if(watch.order < Collection.length + 2) 
                    watch.order += 1;
                else watch.order = Collection.length;
                updateWatchOrder(watch)
            }
            else {
                if(movedWatch[0].order < Collection.length + 2) 
                movedWatch[0].order += 1;
                else movedWatch[0].order = Collection.length;
                updateWatchOrder(w);
            }   
        })
    console.log('pushing', movedWatch)
    Collection.push(movedWatch[0]);
    await res.status(201).json({reorderedCollection: Collection});
});

module.exports = router;