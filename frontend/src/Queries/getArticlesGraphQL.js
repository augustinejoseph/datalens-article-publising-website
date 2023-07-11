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


// Articles by author
export const GET_ARTICLES_BY_AUTHOR = gql`
  query GetArticlesByAuthor($userName: String!) {
    articlesByAuthor(userName: $userName) {
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
      user_name
    }
  }
`;

// Articles by hashtag
export const GET_ARTICLES_BY_HASHTAG = gql`
  query GetArticlesByHashtag($hashtagName : String){
    articlesByHashtag(hashtagName : $hashtagName){
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
      user_name
    }
  }

`


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
      user_name
      user_id
    }
  }
`;
// Trending Articles
export const GET_TRENDING_ARTICLES = gql `
  query GetTrendingArticles {
    trendingArticles {
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
      user_name
      user_id
    }
  }
`;

// Premium Articles
export const GET_PREMIUM_ARTICLES = gql `
  query GetPremiumArticles{
    premiumArticles{
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
      user_name
      user_id
    }
  }
`