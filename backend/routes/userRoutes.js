const authMiddle = require('../middleware/authMiddle')
const express = require("express");
const router = express.Router();
const userControl = require("../controller/userControl");
const { check, body } = require("express-validator");

router.post('/add-album', userControl.createAlbum);



module.exports = router;