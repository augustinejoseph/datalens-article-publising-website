// const { gql } = require('apollo-server');


// const typeDefs = gql`
//   type Article {
//     title: String!
//     category: [Category]
//     name: String!
//     createdAt: String
//     summary: String
//     is_premium: Boolean
//     readingTime : Int
//     articleId: String
    
//   }

//   type Query {
//     articles: [Article!]!
//   }
// `;

// module.exports = typeDefs;

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
    readingTime : Int
    articleId: String
  }

  type Query {
    articles: [Article!]!
  }
`;

module.exports = typeDefs;
