
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../config/config.js')

const s3 = new aws.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region
});

const upload = multer({
    storage: multerS3({
      s3,
      bucket: 'wathcollectionbucket',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'TESTING_META_DATA!'});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
});

module.exports = upload;