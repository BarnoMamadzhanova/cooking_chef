const Endpoints = {
  AUTH: {
    LOGIN: "/v1/auth/login",
    REFRESH: "/v1/auth/refresh-token",
    REGISTER: "/v1/auth/register",
    LOGOUT: "/v1/auth/logout",
  },
  USERS: {
    USERS_LIST: "/v1/users",
  },
  CATEGORIES: {
    CATEGORIES_LIST: "/v1/categories",
    NEW_CATEGORY: "/v1/categories",
  },
  IMAGE: {
    UPLOAD: "/v1/images/upload",
    DELETE: "/v1/images/upload",
  },
  RECIPES: {
    RECIPES_LIST: "/v1/recipes",
    CREATE: "/v1/recipes",
    SAVE: "/v1/recipes/{recipeId}/save",
    UNSAVE: "/v1/recipes/{recipeId}/unsave",
    LIKE: "/v1/recipes/{recipeId}/like",
    UNLIKE: "/v1/recipes/{recipeId}/unlike",
    DETAILS: "/v1/recipes/{recipeId}",
  },
};

export default Endpoints;
