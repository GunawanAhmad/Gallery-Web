const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require("body-parser");


const authRouter = require("./routes/authRoutes.js");



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




app.use(authRouter);

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
    useUnifiedTopology: true
  })
  .then(result => {
    app.listen(port, err => {
      if (err) return console.log(`Something bad happened: ${err}`);
      console.log(`Node.js server listening on ${port}`);
    });
  })
  .catch(err => console.log(err));