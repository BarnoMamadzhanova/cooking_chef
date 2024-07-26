import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getProfile,
  getUsers,
  getSavedRecipes,
  getUserById,
  getUserRecipes,
  updateProfile,
  followUser,
} from "../../api/users/index";
import {
  IUserProfile,
  IUserListResponse,
  IUpdateUserProfile,
} from "../../api/users/types";
import { IRecipeResponse } from "../../api/recipes/types";

interface UserState {
  profile: IUserProfile | undefined;
  users: IUserListResponse | null;
  userRecipes: IRecipeResponse | null;
  savedRecipes: IRecipeResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  profile: undefined,
  users: null,
  userRecipes: null,
  savedRecipes: null,
  status: "idle",
  error: null,
};

export const fetchProfile = createAsyncThunk("users/fetchProfile", async () => {
  return await getProfile();
});

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: { searchTerm?: string; page?: number; size?: number }) => {
    return await getUsers(params.searchTerm, params.page, params.size);
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async (profile: IUpdateUserProfile) => {
    return await updateProfile(profile);
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId: number) => {
    return await getUserById(userId);
  }
);

export const fetchUserRecipes = createAsyncThunk(
  "users/fetchUserRecipes",
  async (params: { page?: number; size?: number }) => {
    return await getUserRecipes(params.page, params.size);
  }
);

export const fetchSavedRecipes = createAsyncThunk(
  "users/fetchSavedRecipes",
  async (params: { page?: number; size?: number }) => {
    return await getSavedRecipes(params.page, params.size);
  }
);

export const followUserAsync = createAsyncThunk(
  "users/followUser",
  async (userId: number) => {
    await followUser(userId);
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<IUserProfile>) => {
          state.status = "succeeded";
          state.profile = action.payload;
        }
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch profile";
      });

    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUserListResponse>) => {
          state.status = "succeeded";
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      });

    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<IUserProfile>) => {
          state.status = "succeeded";
          state.profile = action.payload;
        }
      )
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update profile";
      });

    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<IUserProfile>) => {
          state.status = "succeeded";
        }
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user by id";
      });

    builder
      .addCase(fetchUserRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserRecipes.fulfilled,
        (state, action: PayloadAction<IRecipeResponse>) => {
          state.status = "succeeded";
          state.userRecipes = action.payload;
        }
      )
      .addCase(fetchUserRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user recipes";
      });

    builder
      .addCase(fetchSavedRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSavedRecipes.fulfilled,
        (state, action: PayloadAction<IRecipeResponse>) => {
          state.status = "succeeded";
          state.savedRecipes = action.payload;
        }
      )
      .addCase(fetchSavedRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch saved recipes";
      });

    builder
      .addCase(followUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followUserAsync.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(followUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to follow user";
      });
  },
});

export default userSlice.reducer;
