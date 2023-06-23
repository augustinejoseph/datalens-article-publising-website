const { gql } = require('apollo-server');

const typeDefs = gql`
  type Category {
    name: String!
  }

  type Article {
    title: String!
    category: [Category]
    name: String!
    createdAt: String
    summary: String
    is_premium: Boolean
    is_banned: Boolean
    readingTime: Int
    articleId: String
    previewImage: String
    claps: Int
    is_featured: Boolean
  }

  type Query {
    articles: [Article!]!
    featuredArticles: [Article]!  # New field for featured articles
  }
`;

module.exports = typeDefs;
