const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

exports.createUser = (req, res, next) => {
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  let loadedUser;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        const error = new Error("username sudah ada");
        error.statusCode = 401;
        throw error;
      }
      bcrypt.hash(password, 12).then((hashedPass) => {
        const user = new User({
          name: name,
          password: hashedPass,
          username: username,
          email: email,
        });
        loadedUser = user;
        user.save((err, doc) => {
          if (err) {
            throw new Error("register failed");
          }
          const token = jwt.sign(
            {
              username: doc.username,
              userId: doc._id.toString(),
            },
            "thisissecretkey",
            { expiresIn: "2h" }
          );
          res.status(200).json({
            token: token,
            username: doc.username,
            role: doc.role,
          });
        });
      });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let loadedUser = null;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        throw new Error("username is invalid");
      }
      loadedUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          username: loadedUser.username,
          userId: loadedUser._id.toString(),
        },
        "thisissecretkey",
        { expiresIn: "2h" }
      );
      res.status(200).json({
        token: token,
        username: loadedUser.username,
        avatar: loadedUser.avatar,
      });
      console.log("login succes");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.changeUsername = (req, res, next) => {
  const newUsername = req.body.newUsername;
  const oldUsername = req.body.oldUsername;
  const password = req.body.password;
  console.log(oldUsername, newUsername, password);
  let loadedUser = null;
  User.findOne({ username: oldUsername })
    .then((user) => {
      if (user) {
        loadedUser = user;
        return bcrypt.compare(password, user.password);
      }
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }
      loadedUser.username = newUsername;
      return loadedUser.save();
    })
    .then((result) => {
      res.status(200).json({ msg: "change username succes", user: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.changePassword = (req, res, next) => {
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;
  const username = req.body.username;
  const confirmPassword = req.body.confirmPassword;
  let loadedUser = null;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const error = new Error("username invalid");
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(oldPassword, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashed) => {
      loadedUser.password = hashed;
      return loadedUser.save();
    })
    .then((result) => {
      res.status(200).json({ msg: "change password succes", user: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
