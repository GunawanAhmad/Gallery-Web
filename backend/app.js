const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(authRouter);
app.use(userRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  console.log(message);
  res.status(422).json({ message: message, errorData: data });
});

const port = 5000;
mongoose
  .connect("mongodb://localhost:27017/webGallery", {
    dbName: "Web-Gallery-App",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, (err) => {
      if (err) return console.log(`Something bad happened: ${err}`);
    });
  })
  .catch((err) => console.log(err));
