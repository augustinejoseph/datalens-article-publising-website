const { Article, Category } = require('../models/models');
const { DJANGO_SERVER } = require('../config/config');
const axios = require('axios')
const { ObjectId } = require('mongoose').Types;


const resolvers = {
  Query: {
    // All articles
    articles: async () => {
      try {
        console.log('inside all articles try');
        const articles = await Article.find().populate('category');
        return articles;
      } catch (error) {
        throw new Error('Error retrieving articles');
      }
    },




    // Featured Articles
    featuredArticles: async () => {
      try {
        const featuredArticles = await Article.find({ is_featured: true }).populate('category').limit(10);
        return featuredArticles;
      } catch (error) {
        throw new Error('Error retrieving featured articles');
      }
    },

    // Trending Articles
    trendingArticles: async () => {
      try {
        const lastWeekDate = new Date()
        lastWeekDate.setDate(lastWeekDate.getDate() - 7)
        const trendingArticles = await Article.find({ createdAt: { $gte: lastWeekDate } }).populate('category')
          .sort({ claps: -1, pageViews: -1 }).limit(10)
        return trendingArticles
      } catch (error) {
        console.log(error);
        throw new Error("Error retrieving trending articles")
      }
    },

    // Articles by author
    articlesByAuthor: async (_, { userName }) => {
      try {
        console.log("resolver user name", userName);
        // console.log('resolver articlesByAuthor try block');
        const articlesByAuthor = await Article.find({ user_name: userName }).populate('category');
        console.log('returned articles');
        return articlesByAuthor;
      } catch (error) {
        console.log('error articlesByAuthor', error);
        throw new Error("Error retrieving articles by author");
      }
    },

    // Articles by category
    articlesByCategory: async (_, { categoryName }) => {
      console.log('inside articlesby category resolver backend');
      try {
        console.log('Retrieving articles by category. Category Name:', categoryName);
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
          throw new Error(`Category '${categoryName}' not found`);
        }
        const articlesByCategory = await Article.find({ category: category._id }).sort({ createdAt: -1 });
        console.log('Articles retrieved:');
        return articlesByCategory;
      } catch (error) {
        console.log('Error retrieving articles by category:', error);
        throw new Error('Error retrieving articles by category');
      }
    },

    // Articles by tag
    articlesByHashtag: async (_, { hashtagName }) => {
      console.log('Inside articlesByHashtag resolver');
      try {
        console.log('Retrieving articles by hashtag. Hashtag Name:', hashtagName);
        const articles = await Article.find({ "hashtags": hashtagName });
        return articles;
      } catch (error) {
        console.log('Error retrieving articles by hashtag:', error);
        throw new Error('Error retrieving articles by hashtag');
      }
    },

    // Premium Articles
    premiumArticles: async () => {
      try {
        const premiumArticles = await Article.find({ is_premium: true }).populate('category')
        console.log();
        return premiumArticles

      } catch (error) {
        console.log("premium errro", error);
        throw new Error("Error retrieving premium articles")
      }
    },

    
    
    
    // Articles Based on user Interests


    articlesByUserInterest: async (_, { userId }) => {
      try {
        const response = await axios.get(`${DJANGO_SERVER}/user/user-interests/${userId}`);
        const userInterests = response.data.user_interests;
        console.log('User interests from Django:', userInterests);
        const articles = [];
    
        for (const interest of userInterests) {
          const lowercaseInterest = interest.interest.toLowerCase(); // Convert to lowercase
    
          // Find category document by lowercase name
          const category = await Category.findOne({ name: lowercaseInterest });
    
          if (category) {
            console.log('category id', category._id);
            // Find articles by matching category or hashtags
            const matchedArticles = await Article.find({
              $or: [
                { category: category._id },
                { hashtags: { $in: [lowercaseInterest] } }
              ]
            }).populate('category');
    
            articles.push(...matchedArticles);
          }
        }
    
        console.log('Articles based on user interests:', articles);
        return articles;
      } catch (error) {
        console.log('Error from Django in user interests:', error);
        throw new Error('Failed to fetch articles based on user interests');
      }
    }
    
    
    


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
        return 'Unknown';
      }
      return parent.name;
    },
  },
};

module.exports = resolvers;
