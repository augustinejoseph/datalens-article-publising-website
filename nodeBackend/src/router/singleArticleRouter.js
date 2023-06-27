const express = require('express')
const router = express.Router()
const {Article} = require('../models/models')

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    // console.log('id from frontend which is recieved  in backed', id);
    try{
        const article = await Article.findOne({articleId:id})
        console.log('article', article)
        if (!article){
            return res.status(404).json({error:'Article not found'})
        }
        res.json(article)
    }catch(error){
        console.log(error, 'error in single article')
        res.status(500).json({error: "Failed to Fetch Articles"})
    }
})

router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

  
module.exports = router