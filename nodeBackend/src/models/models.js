const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: String,
});

const Category = mongoose.model('Category', categorySchema);

// Article Schema
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
  is_featured: Boolean,
  pageViews : Number

});
const Article = mongoose.model('Article', articleSchema);

// Draft Schema
const draftSchema = new mongoose.Schema({
  title : String,
  body : Object,
  user_id : Number,
  createdAt : Date,
  updatedAt : Date,
})
const Draft = mongoose.model("Draft", draftSchema)


module.exports = {Article, Category, Draft};
