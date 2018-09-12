
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
    accessKeyId: 'AKIAIP5R7F7RZ7EG5KDQ',
    secretAccessKey: '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',
    region: 'us-east-2'
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