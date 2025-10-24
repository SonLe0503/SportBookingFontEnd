/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { request } from "../utils/request";

import type { RootState } from "./index";

interface ImageFieldState {
  list: any[];
  detail: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ImageFieldState = {
  list: [],
  detail: null,
  loading: false,
  error: null,
};

// 🟢 GET ALL
export const actionGetImageFields = createAsyncThunk(
  "imageField/actionGetImageFields",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request({
        url: "/ImageField/GetImageFields",
        method: "GET",
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi khi tải danh sách ảnh");
    }
  }
);

// 🟢 GET DETAIL
export const actionGetImageField = createAsyncThunk(
  "imageField/actionGetImageField",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/ImageField/GetImageField/${id}`,
        method: "GET",
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi khi tải chi tiết ảnh");
    }
  }
);

// 🟢 CREATE
export const actionCreateImageField = createAsyncThunk(
  "imageField/actionCreateImageField",
  async (data: { fieldId: number; imageFile: File }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("FieldId", data.fieldId.toString());
      formData.append("ImageFile", data.imageFile);

      const res = await request({
        url: "/ImageField/Create",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi khi tạo ảnh mới");
    }
  }
);

// 🟢 UPDATE
export const actionUpdateImageField = createAsyncThunk(
  "imageField/actionUpdateImageField",
  async (
    data: { id: number; fieldId: number; imageFile?: File },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("FieldId", data.fieldId.toString());
      if (data.imageFile) formData.append("ImageFile", data.imageFile);

      const res = await request({
        url: `/ImageField/Update/${data.id}`,
        method: "PUT",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi khi cập nhật ảnh");
    }
  }
);

// 🟢 DELETE
export const actionDeleteImageField = createAsyncThunk(
  "imageField/actionDeleteImageField",
  async (id: number, { rejectWithValue }) => {
    try {
      await request({
        url: `/ImageField/Delete/${id}`,
        method: "DELETE",
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi khi xóa ảnh");
    }
  }
);

const imageFieldSlice = createSlice({
  name: "imageField",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // 📸 GET ALL
    builder
      .addCase(actionGetImageFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actionGetImageFields.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(actionGetImageFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 📸 GET DETAIL
    builder
      .addCase(actionGetImageField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actionGetImageField.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(actionGetImageField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 📸 CREATE
    builder
      .addCase(actionCreateImageField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actionCreateImageField.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(actionCreateImageField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 📸 UPDATE — fix chỗ tìm index
    builder
      .addCase(actionUpdateImageField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actionUpdateImageField.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (img) => img.imageId === action.payload.imageId
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (state.detail && state.detail.imageId === action.payload.imageId) {
          state.detail = action.payload;
        }
      })
      .addCase(actionUpdateImageField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 📸 DELETE
    builder
      .addCase(actionDeleteImageField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actionDeleteImageField.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((img) => img.imageId !== action.payload);
      })
      .addCase(actionDeleteImageField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectListImage = (state: RootState) => state.imageField.list;
export const selectSelectedImage = (state: RootState) =>
  state.imageField.detail;

export default imageFieldSlice.reducer;
