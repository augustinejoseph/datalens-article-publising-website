const express = require('express');
const router = express.Router();
const {Article} = require('../models/models');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

router.post('/', function(req, res) {
  // Extract the article data from req.body
  const { title, body,summary, description, images, name, category, hashtags, readingTime, comments, user_id, previewImage,  } = req.body;
  const createdAt = Date.now();
  const updatedAt = Date.now();
  const is_banned = false
  const is_premium = false
  const is_featured = false
  const claps = 0
  const slug = slugify(title, {
    replacement: '-', 
    lower: true,   
    strict: true 
  })
  const uuid = uuidv4()
  const articleId = `${slug}-${uuid}`;
  console.log('backend recieveed reading time', readingTime)

  // Create a new instance of the Article model
  const newArticle = new Article({
    articleId,
    uuid,
    title,
    body,
    description,
    images,
    name,
    category,
    hashtags,
    readingTime,
    updatedAt,
    createdAt,
    claps,
    comments,
    user_id,
    is_banned,
    is_premium,
    summary,
    previewImage,
    is_featured,
  });

  // Save the article in the database
  newArticle.save()
    .then((article) => {
      console.log('Article saved:', article);
      res.status(201).json(article.articleId);
    })
    .catch((error) => {
      console.error('Error saving article:', error);
      res.status(500).json({ error: 'Failed to create article',error });
    });
});

module.exports = router;
