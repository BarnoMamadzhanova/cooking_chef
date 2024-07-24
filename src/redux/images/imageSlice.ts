import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IImage, IUploadedImage } from "../../api/images/types";
import { uploadImage, deleteImage } from "../../api/images";

interface ImageState {
  images: IUploadedImage[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ImageState = {
  images: [],
  status: "idle",
  error: null,
};

export const uploadImageAsync = createAsyncThunk(
  "images/upload",
  async (imageData: IImage, { rejectWithValue }) => {
    try {
      const response = await uploadImage(imageData);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadImageAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images.push(action.payload);
      })
      .addCase(uploadImageAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to upload image";
      })
      .addCase(deleteImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteImageAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = state.images.filter(
          (image) => image.id !== action.meta.arg
        );
      })
      .addCase(deleteImageAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to delete image";
      });
  },
});

export default imageSlice.reducer;
