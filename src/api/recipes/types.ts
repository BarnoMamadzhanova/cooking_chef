//Recipe

export interface IRecipe {
  id: number;
  name: string;
  preparationTime: number;
  category: {
    id: number;
    name: string;
  };
  imageUrl: string;
  authorName: string;
  likesAmount: number;
  savesAmount: number;
  isLikedByUser: boolean;
  isSavedByUser: boolean;
}

export interface IRecipeParams {
  userId?: number;
  categoryId?: number;
  searchTerm?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface IRecipeResponse {
  totalElements: number;
  totalPages: number;
  pageable: {
    unpaged: boolean;
    paged: boolean;
    pageSize: number;
    pageNumber: number;
    offset: number;
    sort: {
      direction: string;
      nullHandling: string;
      ascending: boolean;
      property: string;
      ignoreCase: boolean;
    }[];
  };
  numberOfElements: number;
  size: number;
  content: IRecipe[];
  number: number;
  sort: {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }[];
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface IRecipeDetail {
  id: number;
  name: string;
  preparationTime: number;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  author: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  ingredients: {
    name: string;
    quantity: number;
    measure: "TEASPOON" | "TABLESPOON" | "CUP" | "GRAM" | "LITER" | string;
    quantityText: string;
  }[];
  createdAt: string;
  imageUrl: string;
  likesAmount: number;
  savesAmount: number;
  isLikedByUser: boolean;
  isSavedByUser: boolean;
}

export interface ICreateRecipe {
  name: string;
  preparationTime: number;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  imageId: number;
  categoryId: number;
  ingredients: {
    name: string;
    quantity: number;
    measure: string;
  }[];
}

export interface IToggleAction {
  recipeId: number;
}
