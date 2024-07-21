//users

export interface IUserProfile {
  id: number;
  name: string;
  bio: string;
  profileImageUrl: string;
  recipeCount: number;
  followerCount: number;
  followingCount: number;
  isFollowed: boolean;
}

export interface IUserListResponse {
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
  content: IUserSummary[];
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

export interface IUserSummary {
  name: string;
  profileImageUrl: string;
}

export interface IUpdateUserProfile {
  name: string;
  bio: string;
  profileImageId: number;
}
