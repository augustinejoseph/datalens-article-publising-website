const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
});

const Category = mongoose.model('Category', categorySchema);

const articleSchema = new mongoose.Schema({
  articleId : String,
  uuid : String,
  title: String,
  body: Object,
  description: String,
  images: [String],
  name: String,
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  hashtags: [String],
  readingTime: Number,
  updatedAt: Date,
  createdAt: Date,
  claps: Number,
  comments: Object,
  user_id: Number,
  is_banned : Boolean,
  is_premium : Boolean,
  summary: String,
  previewImage:String,
  is_featured: Boolean

});

const Article = mongoose.model('Article', articleSchema);

module.exports = {Article, Category};
