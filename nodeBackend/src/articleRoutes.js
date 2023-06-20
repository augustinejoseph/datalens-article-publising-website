const express = require('express');
const router = express.Router();
const Article = require('./models/models');

router.post('/', (req, res) => {
  // Create a new article instance
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });

  // Save the article in the database
  newArticle
    .save()
    .then((article) => {
      res.status(201).json(article);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create article' });
    });
});

module.exports = router;
