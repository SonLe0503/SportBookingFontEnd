/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { request } from "../utils/request";

import type { RootState } from "./index";

export interface Account {
  userId: number;
  username: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  createdAt: string;
}

interface AccountState {
  list: Account[];
  detail: Account | null;
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  list: [],
  detail: null,
  loading: false,
  error: null,
};

// 🟢 GET ALL
export const actionGetAccounts = createAsyncThunk(
  "account/actionGetAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request({
        url: "/admin/Account",
        method: "GET",
      });
      return res.data || res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 GET DETAIL
export const actionGetAccount = createAsyncThunk(
  "account/actionGetAccount",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/admin/Account/${id}`,
        method: "GET",
      });
      return res.data || res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 CREATE
export const actionCreateAccount = createAsyncThunk(
  "account/actionCreateAccount",
  async (
    data: {
      username: string;
      password: string;
      email: string;
      phone: string;
      role: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await request({
        url: "/admin/Account",
        method: "POST",
        data,
      });
      return res.data || res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 UPDATE
export const actionUpdateAccount = createAsyncThunk(
  "account/actionUpdateAccount",
  async (
    data: {
      userId: number;
      username: string;
      email: string;
      phone: string;
      role: string;
      createdAt: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await request({
        url: `/admin/Account/${data.userId}`,
        method: "PUT",
        data,
      });
      return res.data || res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 DELETE
export const actionDeleteAccount = createAsyncThunk(
  "account/actionDeleteAccount",
  async (id: number, { rejectWithValue }) => {
    try {
      await request({
        url: `/admin/Account/${id}`,
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const actionUploadAvatar = createAsyncThunk(
  "account/actionUploadAvatar",
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("AvatarFile", file); // tên trùng với Swagger

      const res = await request({
        url: "/api/Profile/avatar",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data || res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(actionGetAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionGetAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(actionGetAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // GET DETAIL
    builder
      .addCase(actionGetAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionGetAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(actionGetAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // CREATE
    builder
      .addCase(actionCreateAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionCreateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(actionCreateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE
    builder
      .addCase(actionUpdateAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionUpdateAccount.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (acc) => acc.userId === action.payload.userId
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (state.detail && state.detail.userId === action.payload.userId) {
          state.detail = action.payload;
        }
      })
      .addCase(actionUpdateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE
    builder
      .addCase(actionDeleteAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionDeleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (acc) => acc.userId !== action.payload
        );
      })
      .addCase(actionDeleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
       builder
      .addCase(actionUploadAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionUploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        if (state.detail) {
          state.detail.avatar = action.payload.avatar || action.payload; 
        }
      })
      .addCase(actionUploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectAccountList = (state: RootState) => state.account.list;
export const selectAccountDetail = (state: RootState) => state.account.detail;

export default accountSlice.reducer;