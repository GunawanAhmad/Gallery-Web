const authMiddle = require('../middleware/authMiddle');
const express = require("express");
const router = express.Router();
const userControl = require("../controller/userControl");
const { check, body } = require("express-validator");

router.post('/add-album', authMiddle.accesCheck, userControl.createAlbum);

router.get('/:username', authMiddle.userCheck, userControl.getUserAlbums)



module.exports = router;