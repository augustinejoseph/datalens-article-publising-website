const {Article} = require('../models/models');

const resolvers = {
  Query: {
    articles: async () => {
      try {
        const articles = await Article.find()
          .select('title category name createdAt articleId is_banned is_premium summary readingTime')
          .populate('category', 'name')
          .exec();
        return articles;
      } catch (error) {
        console.error('Error fetching articles:', error);
        throw new Error('Failed to fetch articles');
      }
    },
  },
};

module.exports = resolvers;