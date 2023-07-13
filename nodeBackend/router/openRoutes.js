const express = require('express');
const router = express.Router();
const {Category} = require('../models/models');
const {Article} = require('../models/models.js')


// Get all categories
router.get('/all-categories', async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Failed to fetch categories' });
    }
  });


// Get a specific category
router.get('/single-category/:id', async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ message: 'Failed to fetch category' });
    }
  });
  

//   get a article
  router.get('/article/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const article = await Article.findOne({articleId:id}).populate('category')
        if (!article){
            return res.status(404).json({message:'Article not found'})
        }
        article.pageViews += 1
        article.save()
        res.json(article)
    }catch(error){
        console.log(error, 'error in single article')
        res.status(500).json({message: "Failed to Fetch Articles"})
    }
})



// add clap
router.put('/add-clap/:id' , async (req, res) => {
    const {id} = req.params
    try{
      const article = await Article.findOne({articleId : id })
      console.log("clap article name", article);
      article.claps += 1
      article.save()
      res.status(200).json({message : "Added a clap"})
      console.log("one clap added ");
    }catch(error){
      console.log(error)
      res.status(500).json({message: "Internal Server error"})
    }
  })
  

module.exports = router
