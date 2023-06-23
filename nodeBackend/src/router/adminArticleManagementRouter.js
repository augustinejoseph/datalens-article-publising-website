const express = require('express')
const router = express.Router()
const {Article} = require('../models/models.js')

router.put('/ban/:articleId', async (req, res) => {
    const {articleId} = req.params
    console.log("article id in ban article admin route", articleId)
    try{
        const article = await Article.findOne({articleId:articleId})
        if(!article){
            return res.status(404).json({error: "Article Not found"})
        }
        article.is_banned = !article.is_banned
        await article.save()
        res.status(200).json({ message: `Article with ID ${articleId} has been ${article.is_banned ? 'banned' : 'unbanned'}` });
    }catch(error){
        console.error(error)
        res.status(500).json({error: error})
    }
})
module.exports = router