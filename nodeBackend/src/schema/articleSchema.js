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
    user_id : Int
    user_name : String
  }

  type Query {
    articles: [Article!]!
    featuredArticles: [Article]!
    trendingArticles: [Article] !
    premiumArticles: [Article] !
    articlesByAuthor(userName : String!) : [Article]
    articlesByCategory(categoryName: String!) : [Article]
    articlesByHashtag(hashtagName : String!) : [Article]
    
  }
`;

module.exports = typeDefs;
