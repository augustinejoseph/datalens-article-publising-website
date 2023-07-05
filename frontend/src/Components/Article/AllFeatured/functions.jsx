export const getQueryByLocation = (location) => {
  if (location.pathname === "/trending") {
    return GET_TRENDING_ARTICLES;
  } else if (location.pathname === "/featured") {
    return GET_FEATURED_ARTICLES;
  } else if (location.pathname === "/premium") {
    return GET_PREMIUM_ARTICLES;
  }
};

export const getTitleByLocation = (pathname) => {
  if (pathname === "/trending") {
    return "Trending Articles";
  } else if (pathname === "/featured") {
    return "Featured Articles";
  } else if (pathname === "/premium") {
    return "Premium Articles";
  }
};
