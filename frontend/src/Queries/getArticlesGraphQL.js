import { gql } from "@apollo/client";

// Main feed preview only
export const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      title
      category {
        name
      }
      name
      createdAt
      summary
      is_premium
      readingTime
      articleId
      previewImage
      user_id
      user_name
    }
  }
`;

// Featured
export const GET_FEATURED_ARTICLES = gql`
  query FeaturedArticles {
    featuredArticles {
      title
      category {
        name
      }
      name
      createdAt
      summary
      is_premium
      readingTime
      articleId
      previewImage
      is_featured
    }
  }
`;

// Articles by author
export const GET_ARTICLES_BY_AUTHOR = gql`
  query GetArticlesByAuthor($userId: ID!) {
    articlesByAuthor(userId: $userId) {
      title
      category {
        name
      }
      name
      createdAt
      summary
      is_premium
      readingTime
      articleId
      previewImage
      is_featured
    }
  }
`;


// Articles by category
export const GET_ARTICLES_BY_CATEGORY = gql`
  query GetArticlesByCategory($categoryName: String!) {
    articlesByCategory(categoryName: $categoryName) {
      title
      name
      createdAt
      summary
      is_premium
      readingTime
      articleId
      previewImage
      is_featured
      user_id
    }
  }
`;
