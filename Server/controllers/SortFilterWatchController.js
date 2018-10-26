const express = require('express');
const router = express.Router();
const knex = require('../config/db');
const Promise = require('promise');
const SortFilter = require('../models/sortFilter.js');

const VerifyToken = require('../middleware/VerifyToken.js');

router.get('/condition/:conditionToFilterBy', VerifyToken, async (req, res) => {
    try 
    {
        let conditionToFilterBy = +req.params.conditionToFilterBy;
        console.log('fuckckck', conditionToFilterBy)
        let collection = await SortFilter.getWatchCollectionByCondition(req.id, conditionToFilterBy);
        console.log(collection)
        res.status(200).json({collection})
    }
    catch (err)
    {
        console.log(err)
        res.status(500).json({err})
    }  
})

router.get('/status/:statusToFilterBy', VerifyToken, async (req, res) => {
    try 
    {
        let statusToFilterBy = req.params.statusToFilterBy;
        let collection = await SortFilter.getWatchCollectionByStatus(req.id, statusToFilterBy)
        res.status(200).json({collection})
    }
    catch (err)
    {
        console.log(err)
        res.status(500).json({err})
    } 
})

router.get('/style/:styleToFilterBy', VerifyToken, async (req, res) => {
    try 
    {
        let styleToFilterBy = req.params.styleToFilterBy;
        let collection = await SortFilter.getWatchCollectionByStyle(req.id, styleToFilterBy);
        res.status(200).json({collection})
    }
    catch (err)
    {
        console.log(err)
        res.status(500).json({err})
    } 
})

router.get('/search/:searchTerm', VerifyToken, async (req, res) => {
    try 
    {
        let searchTerm = req.params.searchTerm;
        let collection = await SortFilter.getWatchCollectionBySearchTerm(req.id, searchTerm);
        res.status(200).json({collection})
    }
    catch (err)
    {
        console.log(err)
        res.status(500).json({err})
    } 
})


 module.exports = router;