const authMiddle = require("../middleware/authMiddle");
const express = require("express");
const router = express.Router();
const userControl = require("../controller/userControl");
const albumControl = require("../controller/albumControl");
const { check, body } = require("express-validator");
const multer = require("multer");

const fileStorageAlbums = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/albumPhotos");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileStorageAvatars = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/avatar");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const filterImg = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadPhoto = multer({
  storage: fileStorageAlbums,
  fileFilter: filterImg,
});

const uploadAvatar = multer({
  storage: fileStorageAvatars,
  fileFilter: filterImg,
});

router.post(
  "/add-photo/:albumId",
  uploadPhoto.single("photo"),
  albumControl.addPhoto
);

router.post("/add-album", authMiddle.accesCheck, albumControl.createAlbum);

router.get("/queryUser/:q", authMiddle.accesCheck, userControl.getAlluser);

router.delete(
  "/deleteAlbum/:id",
  authMiddle.accesCheck,
  albumControl.albumDelete
);

router.get("/profile", authMiddle.accesCheck, userControl.getUserProfile);

router.post(
  "/updateProfile",
  authMiddle.accesCheck,
  uploadAvatar.single("avatar"),
  userControl.updateProfile
);

router.get("/:username", authMiddle.userCheck, userControl.getUserAlbums);

router.get("/get-album-photos/:albumId", albumControl.getAlbumPhotos);

module.exports = router;
