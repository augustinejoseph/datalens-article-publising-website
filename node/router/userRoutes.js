const express = require("express");
const router = express.Router();
const { Article, Draft } = require("../models/models");
const { v4: uuidv4 } = require("uuid");
const slugify = require("slugify");
const { default: mongoose } = require("mongoose");

// Create a new Article
router.post("/new-article", function (req, res) {
  const {
    title,
    body,
    summary,
    description,
    images,
    name,
    category,
    hashtags,
    readingTime,
    comments,
    user_id,
    previewImage,
    user_name,
  } = req.body;
  
  if (!title || !body || !category || !name || !user_id || !user_name) {
    return res
      .status(400)
      .json({ error: "Please provide title, body, and category" });
  }
  const createdAt = Date.now();
  const updatedAt = Date.now();
  const is_banned = false;
  const is_premium = false;
  const is_featured = false;
  const claps = 0;
  const pageViews = 0;
  const slug = slugify(title, {
    replacement: "-",
    lower: true,
    strict: true,
  });
  const uuid = uuidv4();
  const articleId = `${slug}-${uuid}`;

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

  newArticle
    .save()
    .then((article) => {
      
      res
        .status(200)
        .json({ articleId: article.articleId, message: "Article Published" });
    })
    .catch((error) => {
      console.error("Error saving article:", error);
      res.status(500).json({ message: "Failed to create article" });
    });
});

// Update an article
router.put("/update-article/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const updatedArticle = await Article.findOneAndUpdate(
      { articleId: id },
      { title, body },
      { new: true },
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article Updated " });
  } catch (error) {
    
    res.status(500).json({ message: "Failed to update article" });
  }
});

// Delete an article
router.delete("/delete-article/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await Article.findOneAndDelete({ articleId: id });
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Failed to delete article" });
  }
});

// Add comments
router.post("/add-comment/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id, comment, user_name, name } = req.body;

  try {
    const article = await Article.findOne({ articleId: id });

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    if (!user_id || !comment || !user_name || !name) {
      return res.status(400).json({ error: "Invalid input data" });
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
    res
      .status(200)
      .json({ message: "Comment Added", comments: updatedArticle });
  } catch (error) {
    
    res.status(500).json({ message: "Failed to comment" });
  }
});

// Save to draft
router.post("/save-to-draft", function (req, res) {
  const { title, body, user_id } = req.body;
  if ((!title, !body, !user_id)) {
    return res
      .status(400)
      .json({ error: "Please provide title, body, and category" });
  }
  const createdAt = Date.now();
  const newDraft = new Draft({
    user_id,
    title,
    body,
  });
  newDraft
    .save()
    .then((draft) => {
      
      res
        .status(201)
        .json({ draftId: draft._id, message: "Draft added Successfully" });
    })
    .catch((error) => {
      console.error("error saving draft", error);
      res.status(500).json({ message: "Failed to save draft" });
    });
});

//  Get all drafts of a single author
router.get("/all-drafts/:user_id", async function (req, res) {
  const username = req.params.username;
  
  try {
    const drafts = await Draft.find({ user_name: username });
    if (drafts) {
      res.status(200).json(drafts);
      
    } else {
      res.status(404).json({ message: "No drafts Found..." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a draft
router.delete("/delete-draft/:id", async (req, res) => {
  const draftId = req.params.id;
  if (draftId) {
    try {
      const response = await Draft.findByIdAndDelete({ _id: draftId });
      
      res.status(200).json({ message: "Draft Deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(404).json({ message: "Draft not found" });
  }
});

// Get a draft
router.get("/draft/:id", async (req, res) => {
  const draftId = req.params.id;
  console.log(("draft id from editor", draftId));
  try {
    const response = await Draft.findById({ _id: draftId });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a draft
router.put("/update-draft/:id", async (req, res) => {
  const draftId = req.params.id;
  const updatedContent = req.body;
  try {
    const response = await Draft.findByIdAndUpdate(draftId, updatedContent, {
      new: true,
    });
    
    res.status(200).json({ message: "Draft Updated", DraftId: response });
  } catch (error) {
    
    res.status(500).json({ message: "Internal server error" });
  }
});

// Make an article premium
router.put("/make-premium/:id", async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await Article.findOne({ articleId: articleId });

    if (!article) {
      return res.status(404).json({ message: "Article does not exist" });
    }
    article.is_premium = !article.is_premium;
    await article.save();

    
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
