require("dotenv").config();

const { Article, Category } = require("../models/models");
// const { DJANGO_SERVER } = require('../config/config');
const axios = require("axios");
const { ObjectId } = require("mongoose").Types;
const DJANGO_SERVER = process.env.DJANGO_SERVER;

const resolvers = {
  Query: {
    // All articles
    articles: async () => {
      try {
        
        const articles = await Article.find().populate("category");
        return articles;
      } catch (error) {
        throw new Error("Error retrieving articles");
      }
    },

    // Featured Articles
    featuredArticles: async () => {
      try {
        const featuredArticles = await Article.find({ is_featured: true })
          .populate("category")
          .limit(10);
        return featuredArticles;
      } catch (error) {
        throw new Error("Error retrieving featured articles");
      }
    },

    // Trending Articles
    trendingArticles: async () => {
      try {
        const lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);
        const trendingArticles = await Article.find({
          createdAt: { $gte: lastWeekDate },
        })
          .populate("category")
          .sort({ claps: -1, pageViews: -1 })
          .limit(10);
        return trendingArticles;
      } catch (error) {
        
        throw new Error("Error retrieving trending articles");
      }
    },

    // Articles by author
    articlesByAuthor: async (_, { userName }) => {
      try {
        
        // 
        const articlesByAuthor = await Article.find({
          user_name: userName,
        }).populate("category");
        
        return articlesByAuthor;
      } catch (error) {
        
        throw new Error("Error retrieving articles by author");
      }
    },

    // Articles by category
    articlesByCategory: async (_, { categoryName }) => {
      
      try {
        console.log(
          "Retrieving articles by category. Category Name:",
          categoryName,
        );
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
          throw new Error(`Category '${categoryName}' not found`);
        }
        const articlesByCategory = await Article.find({
          category: category._id,
        }).sort({ createdAt: -1 });
        
        return articlesByCategory;
      } catch (error) {
        
        throw new Error("Error retrieving articles by category");
      }
    },

    // Articles by tag
    articlesByHashtag: async (_, { hashtagName }) => {
      
      try {
        console.log(
          "Retrieving articles by hashtag. Hashtag Name:",
          hashtagName,
        );
        const articles = await Article.find({ hashtags: hashtagName });
        return articles;
      } catch (error) {
        
        throw new Error("Error retrieving articles by hashtag");
      }
    },

    // Premium Articles
    premiumArticles: async () => {
      try {
        const premiumArticles = await Article.find({
          is_premium: true,
        }).populate("category");
        console.log();
        return premiumArticles;
      } catch (error) {
        
        throw new Error("Error retrieving premium articles");
      }
    },

    // Articles Based on user Interests
    articlesByUserInterest: async (_, { userId }) => {
      try {
        
        
        const response = await axios.get(
          `${DJANGO_SERVER}/author/user-interests/${userId}`,
        );
        const userInterests = response.data.user_interests;
        
        const articles = [];

        for (const interest of userInterests) {
          const lowercaseInterest = interest.interest.toLowerCase(); // Convert to lowercase

          // Find category document by lowercase name
          const category = await Category.findOne({ name: lowercaseInterest });

          if (category) {
            
            // Find articles by matching category or hashtags
            const matchedArticles = await Article.find({
              $or: [
                { category: category._id },
                { hashtags: { $in: [lowercaseInterest] } },
              ],
            }).populate("category");

            articles.push(...matchedArticles);
          }
        }
        return articles;
      } catch (error) {
        
        throw new Error("Failed to fetch articles based on user interests");
      }
    },
  },

  Article: {
    category: (parent) => {
      // Perform null-check for category field
      if (!parent.category) {
        return [];
      }
      return parent.category;
    },
  },
  Category: {
    name: (parent) => {
      // Perform null-check for name field
      if (!parent.name) {
        return "Unknown";
      }
      return parent.name;
    },
  },
};

module.exports = resolvers;
