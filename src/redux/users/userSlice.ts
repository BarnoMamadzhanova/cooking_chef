import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/instance";
import {
  IUserProfile,
  IUserListResponse,
  IUpdateUserProfile,
} from "../../api/users/types";
import { IRecipeResponse } from "../../api/recipes/types";

interface UserState {
  profile: IUserProfile | null;
  users: IUserListResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  users: null,
  status: "idle",
  error: null,
};

export const fetchProfile = createAsyncThunk("users/fetchProfile", async () => {
  const response = await axiosInstance.get<IUserProfile>("/v1/users/me");
  return response.data;
});

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: { searchTerm?: string; page?: number; size?: number }) => {
    const response = await axiosInstance.get<IUserListResponse>("/v1/users", {
      params,
    });
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async (profile: IUpdateUserProfile) => {
    const response = await axiosInstance.patch<IUserProfile>(
      "/v1/users/me",
      profile
    );
    return response.data;
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId: number) => {
    const response = await axiosInstance.get<IUserProfile>(
      `/v1/users/${userId}`
    );
    return response.data;
  }
);

export const fetchUserRecipes = createAsyncThunk(
  "users/fetchUserRecipes",
  async (params: { page?: number; size?: number }) => {
    const response = await axiosInstance.get<IRecipeResponse>(
      "/v1/users/me/recipes",
      {
        params,
      }
    );
    return response.data;
  }
);

export const fetchSavedRecipes = createAsyncThunk(
  "users/fetchSavedRecipes",
  async (params: { page?: number; size?: number }) => {
    const response = await axiosInstance.get<IRecipeResponse>(
      "/v1/users/me/recipes/saved",
      {
        params,
      }
    );
    return response.data;
  }
);

export const followUser = createAsyncThunk(
  "users/followUser",
  async (userId: number) => {
    await axiosInstance.post(`/v1/users/${userId}/follow`);
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
        }
      )
      .addCase(fetchSavedRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch saved recipes";
      });

    builder
      .addCase(followUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to follow user";
      });
  },
});

export default userSlice.reducer;
