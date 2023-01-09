/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "../comments/commentsService";
const initialState = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get ticket comments
export const getComments = createAsyncThunk(
  "comments/getAll",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.getComments(ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// create  comment
export const createComment = createAsyncThunk(
  "comments/create",
  async ({ commentText, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.createComment(commentText, ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false,
          state.isSuccess = true,
          state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false,
          state.isError = true,
          state.message = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false,
          state.isSuccess = true,
          state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false,
          state.isError = true,
          (state.message = action.payload);
      });
  },
});
export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
