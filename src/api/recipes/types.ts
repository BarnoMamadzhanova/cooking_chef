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
}

export interface IRecipeParams {
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
