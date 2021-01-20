const express = require('express');
const router = express.Router();
const audioController = require('../controller/audioController');
const upload = require('../../config/multer');

// public
router.get('/single/:audioId', audioController.getSingleAudio);
router.get('/', audioController.getAllAudios);
router.post('/', upload.upload.single('audio'), audioController.addNewAudio);

// private
router.get('/private/withid/', audioController.getAllAudiosWithId); // this returns all with database _id
router.post('/private/updateSingleAudio', audioController.updateSingleAudio);
router.delete('/private/:audioId', audioController.deleteAudio);

// testing
router.delete('/private/test/:audioId', audioController.deleteAudioTest);

module.exports = router;
