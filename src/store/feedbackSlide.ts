import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { DynamicKeyObject } from "../interface/app";
import { request } from "../utils/request";

import type { RootState } from "./index";

// ----------------------
// Kiểu dữ liệu Feedback
// ----------------------
export interface IFeedback {
  feedbackId: number;
  userId: number;
  fieldId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

type IInitialState = {
  feedbacks: IFeedback[];
  selectedFeedback: IFeedback | null;
  loading: boolean;
  error: string | null;
};

// ----------------------
// State khởi tạo
// ----------------------
const initialState: IInitialState = {
  feedbacks: [],
  selectedFeedback: null,
  loading: false,
  error: null,
};

// ----------------------
// Async actions
// ----------------------

// 🟢 Lấy tất cả feedbacks
export const actionGetFeedbacks = createAsyncThunk(
  "feedback/actionGetFeedbacks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/Feedback/GetFeedbacks`,
        method: "GET",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 Lấy chi tiết feedback theo ID
export const actionGetDetailFeedback = createAsyncThunk(
  "feedback/actionGetDetailFeedback",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/Feedback/GetFeedback/${id}`,
        method: "GET",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 Tạo mới feedback
export const actionCreateFeedback = createAsyncThunk(
  "feedback/actionCreateFeedback",
  async (data: DynamicKeyObject, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/Feedback/CreateFeedback`,
        method: "POST",
        data,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 Cập nhật feedback
export const actionUpdateFeedback = createAsyncThunk(
  "feedback/actionUpdateFeedback",
  async (data: DynamicKeyObject, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/Feedback/UpdateFeedback/${data.feedbackId}`,
        method: "PUT",
        data,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 Xóa feedback
export const actionDeleteFeedback = createAsyncThunk(
  "feedback/actionDeleteFeedback",
  async (id: number, { rejectWithValue }) => {
    try {
      await request({
        url: `/Feedback/DeleteFeedback/${id}`,
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ----------------------
// Slice
// ----------------------
export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    clearSelectedFeedback: (state) => {
      state.selectedFeedback = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(actionGetFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actionGetFeedbacks.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
        state.loading = false;
      })
      .addCase(actionGetFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get detail
      .addCase(actionGetDetailFeedback.fulfilled, (state, action) => {
        state.selectedFeedback = action.payload;
      })

      // Create
      .addCase(actionCreateFeedback.fulfilled, (state, action) => {
        state.feedbacks.push(action.payload);
      })

      // Update
      .addCase(actionUpdateFeedback.fulfilled, (state, action) => {
        const index = state.feedbacks.findIndex(
          (f) => f.feedbackId === action.payload.feedbackId
        );
        if (index !== -1) state.feedbacks[index] = action.payload;

        if (state.selectedFeedback?.feedbackId === action.payload.feedbackId)
          state.selectedFeedback = action.payload;
      })

      // Delete
      .addCase(actionDeleteFeedback.fulfilled, (state, action) => {
        state.feedbacks = state.feedbacks.filter(
          (f) => f.feedbackId !== action.payload
        );
        if (state.selectedFeedback?.feedbackId === action.payload)
          state.selectedFeedback = null;
      });
  },
});

// ----------------------
// Selectors
// ----------------------
export const selectFeedbacks = (state: RootState) => state.feedback.feedbacks;
export const selectSelectedFeedback = (state: RootState) =>
  state.feedback.selectedFeedback;
// export const selectFeedbackLoading = (state: RootState) =>
//   state.feedback.loading;
// export const selectFeedbackError = (state: RootState) => state.feedback.error;

// ----------------------
// Exports
// ----------------------
export const { clearSelectedFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
