const express = require('express')
const router = express.Router()
const {Article} = require('../models/models')

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    console.log('id from frontend which is recieved  in backed', id);
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
module.exports = router