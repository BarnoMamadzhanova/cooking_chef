import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getRecipes } from "../../api/recipes/index";
import {
  IRecipe,
  IRecipeParams,
  IRecipeResponse,
} from "../../api/recipes/types";
import axios from "axios";

interface RecipeState {
  recipes: IRecipe[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
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

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
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
  },
});

export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectRecipesLoading = (state: RootState) => state.recipes.loading;
export const selectRecipesError = (state: RootState) => state.recipes.error;
export const selectTotalElements = (state: RootState) =>
  state.recipes.totalElements;
export const selectTotalPages = (state: RootState) => state.recipes.totalPages;
export const selectCurrentPage = (state: RootState) =>
  state.recipes.currentPage;

export default recipeSlice.reducer;
