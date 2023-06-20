const express = require('express');
const router = express.Router();
const Article = require('../models/models');

router.post('/newarticle', function(req, res) {
  // Extract the article data from req.body
  const { title, body, description, images, author, category, hashtags, readingTime, updatedAt, claps, comments } = req.body;

  // Create a new instance of the Article model
  const newArticle = new Article({
    title,
    body,
    description,
    images,
    author,
    category,
    hashtags,
    readingTime,
    updatedAt,
    claps,
    comments
  });

  // Save the article in the database
  newArticle.save()
    .then((article) => {
      console.log('Article saved:', article);
      res.status(201).json(article);
    })
    .catch((error) => {
      console.error('Error saving article:', error);
      res.status(500).json({ error: 'Failed to create article',error });
    });
});

module.exports = router;
