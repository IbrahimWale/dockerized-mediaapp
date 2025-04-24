import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mediaService from "./mediaService";

const initialState = {
  medias: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const saveMediaToDB = createAsyncThunk(
  "media/save",
  async (mediaData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await mediaService.saveMediaToDB(mediaData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMedias = createAsyncThunk(
  "medias/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await mediaService.getMedias(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user goal
export const deleteMedia = createAsyncThunk(
  "media/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await mediaService.deleteMedia(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const mediaSlice = createSlice({
  name: "medias",
  initialState,
  reducers: {
    reset: (state) => {
      state.medias = [];
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveMediaToDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveMediaToDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.medias.push(action.payload);
      })
      .addCase(saveMediaToDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMedias.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMedias.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.medias = action.payload;
      })
      .addCase(getMedias.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMedia.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.medias = state.medias.filter(
          (media) => media._id !== action.payload._id
        );
      })
      .addCase(deleteMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = mediaSlice.actions;
export default mediaSlice.reducer;
