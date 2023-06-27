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
