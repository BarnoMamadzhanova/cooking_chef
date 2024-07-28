import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  getRecipes,
  getRecipeDetails,
  addRecipe,
  toggleLike,
  toggleSave,
} from "../../api/recipes/index";
import {
  IRecipe,
  IRecipeParams,
  IRecipeResponse,
  IRecipeDetail,
  ICreateRecipe,
  IToggleAction,
} from "../../api/recipes/types";
import axios from "axios";

interface RecipeState {
  recipes: IRecipe[];
  recipeDetail: IRecipeDetail | null;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
  detailError: string | null;
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

const initialState: RecipeState = {
  recipes: [],
  recipeDetail: null,
  loading: false,
  detailLoading: false,
  error: null,
  detailError: null,
  totalElements: 0,
  totalPages: 0,
  currentPage: 0,
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (params: IRecipeParams, { rejectWithValue }) => {
    try {
      const response = await getRecipes(params);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchRecipeDetail = createAsyncThunk(
  "recipes/fetchRecipeDetail",
  async (recipeId: number, { rejectWithValue }) => {
    try {
      const response = await getRecipeDetails(recipeId);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (recipeData: ICreateRecipe, { rejectWithValue }) => {
    try {
      const response = await addRecipe(recipeData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const likeRecipe = createAsyncThunk(
  "recipes/likeRecipe",
  async ({ recipeId }: IToggleAction, { rejectWithValue }) => {
    try {
      const response = await toggleLike(recipeId);
      return { recipeId, response: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const saveRecipe = createAsyncThunk(
  "recipes/saveRecipe",
  async ({ recipeId }: IToggleAction, { rejectWithValue }) => {
    try {
      const response = await toggleSave(recipeId);
      return { recipeId, response: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    clearRecipes: (state) => {
      state.recipes = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchRecipes.fulfilled,
      (state, action: PayloadAction<IRecipeResponse>) => {
        state.loading = false;
        state.recipes = action.payload.content;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.number;
        state.error = null;
      }
    );
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchRecipeDetail.pending, (state) => {
      state.detailLoading = true;
      state.detailError = null;
    });
    builder.addCase(
      fetchRecipeDetail.fulfilled,
      (state, action: PayloadAction<IRecipeDetail>) => {
        state.detailLoading = false;
        state.recipeDetail = action.payload;
        state.detailError = null;
      }
    );
    builder.addCase(fetchRecipeDetail.rejected, (state, action) => {
      state.detailLoading = false;
      state.detailError = action.payload as string;
    });
    builder.addCase(createRecipe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createRecipe.fulfilled,
      (state, action: PayloadAction<IRecipeDetail>) => {
        state.loading = false;
        const newRecipe: IRecipe = {
          id: action.payload.id,
          name: action.payload.name,
          preparationTime: action.payload.preparationTime,
          category: action.payload.category,
          imageUrl: action.payload.imageUrl,
          authorName: action.payload.author.name,
          likesAmount: action.payload.likesAmount,
          savesAmount: action.payload.savesAmount,
          isLikedByUser: action.payload.isLikedByUser,
          isSavedByUser: action.payload.isSavedByUser,
        };
        state.recipes.push(newRecipe);
        state.error = null;
      }
    );
    builder.addCase(createRecipe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(likeRecipe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(likeRecipe.fulfilled, (state, action) => {
      state.loading = false;
      const { recipeId } = action.payload;

      const recipe = state.recipes.find((r) => r.id === recipeId);
      if (recipe) {
        recipe.likesAmount += recipe.isLikedByUser ? -1 : 1;
        recipe.isLikedByUser = !recipe.isLikedByUser;
        if (recipe.isLikedByUser) {
          localStorage.setItem(`liked_${recipe.id}`, "true");
        } else {
          localStorage.removeItem(`liked_${recipe.id}`);
        }
      }

      if (state.recipeDetail && state.recipeDetail.id === recipeId) {
        state.recipeDetail.likesAmount += state.recipeDetail.isLikedByUser
          ? -1
          : 1;
        state.recipeDetail.isLikedByUser = !state.recipeDetail.isLikedByUser;
        if (state.recipeDetail.isLikedByUser) {
          localStorage.setItem(`liked_${state.recipeDetail.id}`, "true");
        } else {
          localStorage.removeItem(`liked_${state.recipeDetail.id}`);
        }
      }
      state.error = null;
    });
    builder.addCase(likeRecipe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(saveRecipe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveRecipe.fulfilled, (state, action) => {
      state.loading = false;
      const { recipeId } = action.payload;

      const recipe = state.recipes.find((r) => r.id === recipeId);
      if (recipe) {
        recipe.savesAmount += recipe.isSavedByUser ? -1 : 1;
        recipe.isSavedByUser = !recipe.isSavedByUser;
        if (recipe.isSavedByUser) {
          localStorage.setItem(`saved_${recipe.id}`, "true");
        } else {
          localStorage.removeItem(`saved_${recipe.id}`);
        }
      }

      if (state.recipeDetail && state.recipeDetail.id === recipeId) {
        state.recipeDetail.savesAmount += state.recipeDetail.isSavedByUser
          ? -1
          : 1;
        state.recipeDetail.isSavedByUser = !state.recipeDetail.isSavedByUser;
        if (state.recipeDetail.isSavedByUser) {
          localStorage.setItem(`saved_${state.recipeDetail.id}`, "true");
        } else {
          localStorage.removeItem(`saved_${state.recipeDetail.id}`);
        }
      }
      state.error = null;
    });
    builder.addCase(saveRecipe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectRecipeDetail = (state: RootState) =>
  state.recipes.recipeDetail;
export const selectRecipesLoading = (state: RootState) => state.recipes.loading;
export const selectRecipeDetailLoading = (state: RootState) =>
  state.recipes.detailLoading;
export const selectRecipesError = (state: RootState) => state.recipes.error;
export const selectRecipeDetailError = (state: RootState) =>
  state.recipes.detailError;
export const selectTotalElements = (state: RootState) =>
  state.recipes.totalElements;
export const selectTotalPages = (state: RootState) => state.recipes.totalPages;
export const selectCurrentPage = (state: RootState) =>
  state.recipes.currentPage;
export const { clearRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
