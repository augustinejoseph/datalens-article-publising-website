const express = require('express');
const router = express.Router();
const {Article, Draft} = require('../models/models');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const { default: mongoose } = require('mongoose');

// Create a new Article
router.post('/', function(req, res) {
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

// Save to draft
router.post('/savetodraft',function(req, res) {
  const {title, body, user_id} = req.body
  const createdAt = Date.now()

  const newDraft = new Draft({
    user_id,
    title,
    body,

  });
  newDraft.save()
  .then((draft) => {
    console.log("draft saved", draft);
    res.status(201).json(draft._id)
  }).catch((error) => {
    console.error("error saving draft", error)
    res.status(500).json({error: "Failed to save draft", error})
  })
 })


//  Get all drafts of a single author
router.get('/alldrafts/:user_id', async function(req, res) {
  const user_id = req.params.user_id
  console.log('user id in draft fetch req', user_id);
  try{
    const drafts = await Draft.find({user_id : user_id})
    if(drafts){
      res.status(200).json(drafts)
      console.log('drafts found', drafts);
    }else{
      res.json({message: "No drafts Found..."})
    }
  }catch(error){
    res.status(500).json({error: "Internal server error"})
  }
})

// Delete a draft
router.delete('/delete/:id', async  (req, res) => {
  const draftId = req.params.id
  try{
    const response = await Draft.findByIdAndDelete({_id : draftId})
    console.log('draft deleted backend', response);
    res.status(200).json({response})
  }catch(error){
    res.status(500).json(error)
  }
})
module.exports = router;
