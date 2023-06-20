const { gql } = require('apollo-server');

const articleSchema = gql`
  type Article {
    id: ID!
    title: String!
    body: String!
    description: String
    images: [String]
    author: String
    category: String
    hashtags: [String]
    readingTime: Int
    updatedAt: String
    claps: Int
    comments: [String]
  }

  input ArticleInput {
    title: String!
    body: String!
    description: String
    images: [String]
    author: String
    category: String
    hashtags: [String]
    readingTime: Int
    updatedAt: String
    claps: Int
    comments: [String]
  }

  type Query {
    articles: [Article]
    article(id: ID!): Article
  }

  type Mutation {
    createArticle(article: ArticleInput!): Article
    updateArticle(id: ID!, article: ArticleInput!): Article
    deleteArticle(id: ID!): Article
  }
`;

module.exports = articleSchema;
