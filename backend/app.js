const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();
const mongoPass = "sIeZERBbol7FYlpi";
mongoose.connect("mongodb+srv://xander:"+mongoPass+"@cluster0-ed93v.mongodb.net/test?retryWrites=true",{ useNewUrlParser: true })
.then(() => {
  console.log("Connected to database!");
})
.catch((response) => {
  console.log("Connection failed!", response);
});
//
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);

  res.status(201).json({
    message: "Post added successfully!"
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      title: "First server-side post",
      content: "this is coming from the server",
      id: "faf234f"
    },
    {
      title: "Second server-side post",
      content: "this is coming from the server",
      id: "fsdf234"
    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});

module.exports = app;
