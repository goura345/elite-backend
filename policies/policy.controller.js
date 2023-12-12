require('dotenv').config();
const express = require('express');
const router = express.Router();
const policyService = require('./policy.service');

const zlib = require('zlib');
const util = require('util');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
});
const multer = require('multer');
const storage = multer.memoryStorage(); // Store the file in memory instead of on disk
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // Limit file size to 10MB


// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/uploadFiles', upload.array('files'), uploadFiles);

module.exports = router;


function register(req, res, next) {
    policyService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    policyService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    policyService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    policyService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    policyService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    policyService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

async function uploadFiles(req, res, next) {
    console.log('uploadFiles method calling: ');

    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files provided' });
    }

    // console.log('files: ', files);

    const uploadedFileNames = [];

    try {
        await Promise.all(files.map(async (file) => {
            const fileName = file.originalname;
            const compressedBuffer = await util.promisify(zlib.gzip)(file.buffer);

            await s3.upload({
                Bucket: 'ebook-docs',
                Key: fileName,
                Body: compressedBuffer,
                ContentEncoding: 'gzip',
            }).promise();

            uploadedFileNames.push(fileName);
        }));

        console.log('Successfully uploaded!');

        // Verify that all uploads are done
        if (uploadedFileNames.length === files.length) {
            res.status(200).json({ message: 'Successfully uploaded!', fileNames: uploadedFileNames });
        } else {
            res.status(500).json({ error: 'Some files failed to upload', fileNames: uploadedFileNames });
        }
    } catch (e) {
        console.log('Error uploading data: ', e);
        res.status(500).json({ error: 'Some files failed to upload', fileNames: uploadedFileNames });
    }
}



