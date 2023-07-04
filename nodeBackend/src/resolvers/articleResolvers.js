const { Article, Category } = require('../models/models');

const resolvers = {
  Query: {
    // All articles
    articles: async () => {
      try {
        const articles = await Article.find().populate('category');
        return articles;
      } catch (error) {
        throw new Error('Error retrieving articles');
      }
    },

    // Featured Articles
    featuredArticles: async () => {
      try {
        const featuredArticles = await Article.find({ is_featured: true }).populate('category');
        return featuredArticles;
      } catch (error) {
        throw new Error('Error retrieving featured articles');
      }
    },

    // Articles by author
    articlesByAuthor: async (_, { userId }) => {
      try {
        // console.log("resolver user id", userId);
        // console.log('resolver articlesByAuthor try block');
        const articlesByAuthor = await Article.find({ user_id: userId }).populate('category');
        // console.log('returned articles', articlesByAuthor);
        return articlesByAuthor;
      } catch (error) {
        // console.log('error articlesByAuthor', error);
        throw new Error("Error retrieving articles by author");
      }
    },

// Articles by category
articlesByCategory: async (_, { categoryName }) => {
  console.log('inside articlesbucategory resolver backend');
  try {
    console.log('Retrieving articles by category. Category Name:', categoryName);
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      throw new Error(`Category '${categoryName}' not found`);
    }
    const articlesByCategory = await Article.find({ category: category._id }).sort({createdAt: -1});
    console.log('Articles retrieved:');
    return articlesByCategory;
  } catch (error) {
    console.log('Error retrieving articles by category:', error);
    throw new Error('Error retrieving articles by category');
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
        return 'Unknown';
      }
      return parent.name;
    },
  },
};

module.exports = resolvers;
