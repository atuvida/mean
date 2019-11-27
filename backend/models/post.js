const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  id: String,
  title: String,
  content: String
});

module.exports = mongoose.model('Post', postSchema);
