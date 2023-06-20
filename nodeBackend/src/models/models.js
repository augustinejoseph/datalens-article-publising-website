const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  body: Object,
  description: String,
  images: [String],
  author: String,
  category: String,
  hashtags: [String],
  readingTime: Number,
  updatedAt: Date,
  claps: Number,
  comments: [String],
  user_id: Number
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
