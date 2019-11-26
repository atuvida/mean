const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();
const mongoPass = "Passw0rd";
//const mongoPass = "B5l2mtv9yJtosND7";
mongoose
  .connect(
    //"mongodb+srv://xander:" +
    "mongodb://meanUser:" +
      mongoPass +
      "@localhost:27017/meandb",
      //"@cluster0-ed93v.mongodb.net/node-test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(response => {
    console.log("Connection failed!", response);
  });
//
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
