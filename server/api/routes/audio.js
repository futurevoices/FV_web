const express = require('express');
const router = express.Router();
const audioController = require('../controller/audioController');
const upload = require('../../config/multer');
router.get('/single/:audioId', audioController.getSingleAudio);
router.get('/withid/', audioController.getAllAudiosWithId);
router.get('/', audioController.getAllAudios);
router.post('/updateSingleAudio', audioController.updateSingleAudio);
router.post('/', upload.upload.single('audio'), audioController.addNewAudio);
router.delete('/:audioId', audioController.deleteAudio);
module.exports = router;
