const express = require("express");
const router = express.Router();
const { Category } = require("../models/models");
const { Article } = require("../models/models.js");

router.post("/category", async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name }); // Await the query result
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: "Created category successfully" });
  } catch (error) {
    console.error("Error category:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
});

// Update a category
router.put("category/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true },
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .json({ category: category, message: "Updated category successfully" })
      .res.status(200);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a category
router.delete("/category/:id", async (req, res) => {
  

  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

module.exports = router;

// Ban article
router.put("/article/ban/:articleId", async (req, res) => {
  const { articleId } = req.params;
  
  try {
    const article = await Article.findOne({ articleId: articleId });
    if (!article) {
      return res.status(404).json({ error: "Article Not found" });
    }
    article.is_banned = !article.is_banned;
    await article.save();
    res
      .status(200)
      .json({
        message: `Article with id has been ${
          article.is_banned ? "banned" : "unbanned"
        }`,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server errro" });
  }
});

// Delete
router.delete("/article/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await Article.findOneAndDelete({ articleId: id });
    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).res.json({ message: "Article deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Failed to delete article" });
  }
});

// Dashboard statistics
router.get("/statistics", async (req, res) => {
  try {
    const result = await Article.aggregate([
      {
        $group: {
          _id: null,
          totalPageViews: { $sum: "$pageViews" },
        },
      },
    ]);

    const totalArticlesCount = await Article.count();

    if (result.length > 0) {
      const totalPageViews = result[0].totalPageViews;
      
      res.json({
        totalPageViews: totalPageViews,
        totalArticlesCount: totalArticlesCount,
      });
    }
  } catch (error) {
    res.json(error).status(500);
  }
});

module.exports = router;
