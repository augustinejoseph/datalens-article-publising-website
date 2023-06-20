


const Article = require('../models/models');

const resolvers = {
  Query: {
    articles: () => {
      try {
        return Article.find();
      } catch (error) {
        console.error('Error retrieving articles:', error);
        throw error;
      }
    },
    article: (_, { id }) => {
      try {
        return Article.findById(id);
      } catch (error) {
        console.error('Error retrieving article:', error);
        throw error;
      }
    },
  },
  Mutation: {
    createArticle: (_, { article }) => {
      try {
        return Article.create(article);
      } catch (error) {
        console.error('Error creating article:', error);
        throw error;
      }
    },
    updateArticle: (_, { id, article }) => {
      try {
        return Article.findByIdAndUpdate(id, article, { new: true });
      } catch (error) {
        console.error('Error updating article:', error);
        throw error;
      }
    },
    deleteArticle: (_, { id }) => {
      try {
        return Article.findByIdAndRemove(id);
      } catch (error) {
        console.error('Error deleting article:', error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
