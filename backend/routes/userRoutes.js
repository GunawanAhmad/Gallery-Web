const authMiddle = require('../middleware/authMiddle');
const express = require("express");
const router = express.Router();
const userControl = require("../controller/userControl");
const albumControl = require('../controller/albumControl')
const { check, body } = require("express-validator");

router.post('/add-photo/:albumId', userControl.addPhoto);

router.post('/add-album', authMiddle.accesCheck, userControl.createAlbum);

router.get('/queryUser/:q', authMiddle.accesCheck, userControl.getAlluser);

router.delete('/deleteAlbum/:id', authMiddle.accesCheck, albumControl.albumDelete)

router.get('/:username', authMiddle.userCheck, userControl.getUserAlbums);

router.get('/get-album-photos/:albumId', userControl.getAlbumPhotos);







module.exports = router;