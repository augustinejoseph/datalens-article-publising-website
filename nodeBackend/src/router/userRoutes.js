
const express = require('express')
const router = express.Router()
const {Article, Draft} = require('../models/models');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const { default: mongoose } = require('mongoose');


// Update an article
router.put('/update-article/:id', async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
      const updatedArticle = await Article.findOneAndUpdate(
        { articleId: id },
        { title, body },
        { new: true }
      );
      if (!updatedArticle) {
        return res.status(404).json({ error: 'Article not found' });
      }
      res.json(updatedArticle);
    } catch (error) {
      console.log(error, 'error in updating article');
      res.status(500).json({ error: 'Failed to update article' });
    }
  });

// Delete 
router.delete('/delete-article/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedArticle = await Article.findOneAndDelete({ articleId: id });
      if (!deletedArticle) {
        return res.status(404).json({ error: 'Article not found' });
      }
      res.json({ message: 'Article deleted successfully' });
    } catch (error) {
      console.log(error, 'error in deleting article');
      res.status(500).json({ error: 'Failed to delete article' });
    }
  });

// Add comments
router.post('/add-comment/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id, comment, user_name, name } = req.body;
  
    try {
      const article = await Article.findOne({ articleId: id });
  
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
      if (!user_id || !comment || !user_name || !name) {
        return res.status(400).json({ error: 'Invalid input data' });
      }
  
      if (!article.comments) {
        article.comments = []; 
      }
  
      const newComment = {
        user_id,
        comment,
        user_name,
        name,
        createdAt: new Date(),
      };
      article.commentsCount += 1;
      article.comments.push(newComment); 
      const updatedArticle = await article.save();
      res.json(updatedArticle);
    } catch (error) {
      console.log(error, 'error in adding comment');
      res.status(500).json({ error: 'Failed to add comment' });
    }
  });

  // Create a new Article
router.post('/new-article', function(req, res) {
    const { title, body,summary, description, images, name, category, hashtags, readingTime, comments, user_id, previewImage, user_name  } = req.body;
    console.log("all new article data in api body", req.body);
    if (!title || !body || !category || !name || !user_id || !user_name) {
      return res.status(400).json({ error: 'Please provide title, body, and category' });
    }
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const is_banned = false
    const is_premium = false
    const is_featured = false
    const claps = 0
    const pageViews = 0
    const slug = slugify(title, {
      replacement: '-', 
      lower: true,   
      strict: true 
    })
    const uuid = uuidv4()
    const articleId = `${slug}-${uuid}`;
    // console.log('backend recieveed reading time', readingTime)
  
  
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
      pageViews,
      user_name,
    });
  
    newArticle.save()
      .then((article) => {
        console.log('Article saved:', article);
        res.status(200).json(article.articleId);
      })
      .catch((error) => {
        console.error('Error saving article:', error);
        res.status(500).json({ error: 'Failed to create article',error });
      });
  });
  
  // Save to draft
  router.post('/save-to-draft',function(req, res) {
    const {title, body, user_id} = req.body
    if(!title, !body, !user_id){
      return res.status(400).json({ error: 'Please provide title, body, and category' });
    }
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
  router.get('/all-drafts/:user_id', async function(req, res) {
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
  router.delete('/delete-draft/:id', async  (req, res) => {
    const draftId = req.params.id
    try{
      const response = await Draft.findByIdAndDelete({_id : draftId})
      console.log('draft deleted backend', response);
      res.status(200).json({response})
    }catch(error){
      res.status(500).json(error)
    }
  })
  
  // Get a draft
  router.get('/draft/:id', async (req, res) => {
    const draftId = req.params.id
    console.log(('draft id from editor', draftId));
    try{
      const response = await Draft.findById({_id :draftId})
      res.status(200).json(response)
    }catch(error){
      res.status(500).json(error)
    }
  })
  module.exports = router;
  
  // Update a draft
  router.put('/update-draft/:id', async (req, res) => {
    const draftId = req.params.id
    const updatedContent = req.body
    try{
      const response = await Draft.findByIdAndUpdate(draftId, updatedContent, {new:true})
      console.log('update successful draft server', response);
      res.status(200).json(response)
    }catch(error){
      console.log('update draft serverside error', error);
      res.status(500).json(error)
    }
  })

module.exports = router

  