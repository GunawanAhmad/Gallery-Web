const User = require("../model/user");
const Album = require("../model/album");
const album = require("../model/album");
const user = require("../model/user");
const fileHelper = require("../util/file");

exports.getUserAlbums = (req, res, next) => {
  if (req.userId) {
    // console.log(req.userId)
    User.findById(req.userId)
      .populate("albums", "description albumName")
      .exec((err, user) => {
        if (err) {
          let error = new Error("load album failed");
          error.statusCode = 402;
          throw error;
        }
        return res.status(200).json({ msg: "succes", user: user });
      });
  } else {
    const username = req.params.username;
    User.findOne({ username: username })
      .populate({
        path: "albums",
        match: { albumType: "public" },
        select: "albumName description",
      })
      .exec((err, user) => {
        if (err) {
          let error = new Error("load album failed");
          error.statusCode = 402;
          throw error;
        }
        return res.status(200).json({ msg: "succes", user: user });
      });
  }
};

exports.getAlluser = (req, res, next) => {
  const user = req.params.q;
  const userId = req.userId;
  User.find({
    $and: [
      { _id: { $ne: userId } },
      {
        $or: [
          { name: { $regex: ".*" + user + ".*" } },
          { username: { $regex: ".*" + user + ".*" } },
        ],
      },
    ],
  })
    .select("username name")
    .limit(5)
    .then((response) => {
      return res.status(200).json({ msg: "succes", users: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserProfile = (req, res, next) => {
  const username = req.params.username;
  User.findById(req.userId)
    .select("name username bio avatar")
    .then((user) => {
      if (!user) {
        const error = new Error("user not found");
        error.statusCode = 404;
        throw error;
      }
      console.log(user);
      return res.json({ msg: "succes", user: user });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProfile = (req, res, next) => {
  const name = req.body.name;
  const bio = req.body.bio;
  let avatar = req.body.avatar;

  if (req.file) {
    avatar = req.file.path.replace("\\", "/");
  }
  console.log(avatar);
  const userId = req.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("user not found");
        error.statusCode = 404;
        throw error;
      }
      user.name = name;
      user.bio = bio;
      if (user.avatar && avatar == "delete") {
        fileHelper.deleteFile(user.avatar);
        // console.log("delete old avatar if there are exist");
        user.avatar = "";
      } else if (avatar == "delete" && !user.avatar) {
        user.avatar = "";
        // console.log("user want to delete ava when there are no ava set");
      } else if (avatar != "delete" && avatar != "" && user.avatar) {
        fileHelper.deleteFile(user.avatar);
        user.avatar = avatar;
        // console.log("change the old ava");
      } else {
        // console.log("new ava set");
        user.avatar = avatar;
      }
      return user.save();
    })
    .then((result) => {
      console.log("update succes");
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
