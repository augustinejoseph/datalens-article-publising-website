const mongoose = require("mongoose");

// Category Schema
const categorySchema = new mongoose.Schema({
  name: String,
});

const Category = mongoose.model("Category", categorySchema);

// Article Schema
const articleSchema = new mongoose.Schema({
  articleId: String,
  uuid: String,
  title: String,
  body: Object,
  description: String,
  images: [String],
  name: String,
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  hashtags: [String],
  readingTime: Number,
  updatedAt: Date,
  createdAt: Date,
  claps: Number,
  comments: Object,
  user_id: Number,
  is_banned: Boolean,
  is_premium: Boolean,
  summary: String,
  previewImage: String,
  is_featured: Boolean,
  pageViews: Number,
  user_name: String,
  commentsCount: { type: Number, default: 0 },
  comments: [
    {
      user_id: Number,
      user_name: String,
      comment: String,
      name: String,
      createdAt: Date,
    },
  ],
});
const Article = mongoose.model("Article", articleSchema);

// Draft Schema
const draftSchema = new mongoose.Schema({
  title: String,
  body: Object,
  user_id: Number,
  createdAt: Date,
  updatedAt: Date,
});
const Draft = mongoose.model("Draft", draftSchema);

module.exports = { Article, Category, Draft };
