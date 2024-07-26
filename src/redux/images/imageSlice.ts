import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUploadedImage } from "../../api/images/types";
import { uploadImage, deleteImage } from "../../api/images";

interface ImageState {
  image: IUploadedImage | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ImageState = {
  image: null,
  status: "idle",
  error: null,
};

export const uploadImageAsync = createAsyncThunk(
  "images/upload",
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadImage({ file: formData });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Failed to upload image");
      }
    }
  }
);

export const deleteImageAsync = createAsyncThunk(
  "images/delete",
  async (imageId: number, { rejectWithValue }) => {
    try {
      const response = await deleteImage(imageId);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Failed to delete image");
      }
    }
  }
);

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    clearImage: (state) => {
      state.image = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadImageAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.image = action.payload;
      })
      .addCase(uploadImageAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to upload image";
      })
      .addCase(deleteImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteImageAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.image = null;
      })
      .addCase(deleteImageAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to delete image";
      });
  },
});

export const { clearImage } = imageSlice.actions;

export default imageSlice.reducer;
