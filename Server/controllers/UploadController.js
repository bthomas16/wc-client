const express = require('express');
const router = express.Router();
const knex = require('../config/db');

const VerifyToken = require('../middleware/VerifyToken');

const upload = require('../services/uploadService.js')

router.post('/', function(req, res, next) {
    console.log(req.files, req.file, req.body)
});

module.exports = router;