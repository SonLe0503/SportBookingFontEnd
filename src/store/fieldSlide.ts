import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { DynamicKeyObject } from "../interface/app";
import { request } from "../utils/request";

import type { RootState } from "./index";

/* ----------------------------- INTERFACES ----------------------------- */
export interface IField {
  fieldId: number;
  fieldName: string;
  location: string;
  price: number;
  description: string;
  image: string;
  avatar: string;
  ownerId: number;
  type?: string | null;
  openTime?: string | null;
  closeTime?: string | null;
  openDays?: string | null;
  fixedPrice?: string | null;
  link?: string | null;
  courtDetails: string;
}

/* ----------------------------- STATE TYPE ----------------------------- */
interface IInitialState {
  fields: IField[];
  selectedField: IField | null;
  loading: boolean;
  error: string | null;
}

/* ----------------------------- INITIAL STATE ----------------------------- */
const initialState: IInitialState = {
  fields: [],
  selectedField: null,
  loading: false,
  error: null,
};

/* ----------------------------- ACTIONS ----------------------------- */

// GET ALL FIELDS
export const actionGetFields = createAsyncThunk(
  "field/actionGetFields",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/admin/Fields`,
        method: "GET",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// GET FIELD DETAIL
export const actionGetDetailField = createAsyncThunk(
  "field/actionGetDetailField",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/admin/Fields/${id}`,
        method: "GET",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// CREATE FIELD
export const actionCreateField = createAsyncThunk(
  "field/actionCreateField",
  async (data: DynamicKeyObject, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("FieldName", data.fieldName);
      formData.append("Location", data.location);
      formData.append("Price", data.price);
      formData.append("Description", data.description);
      formData.append("OwnerId", data.ownerId);

      if (data.imageFile) {
        formData.append("ImageFile", data.imageFile); // phải trùng với DTO backend
      }
      if (data.avatarFile) {
        formData.append("AvatarFile", data.avatarFile);
      }
      const res = await request({
        url: `/admin/Fields`,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// UPDATE FIELD
export const actionUpdateField = createAsyncThunk(
  "field/actionUpdateField",
  async (data: DynamicKeyObject, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("FieldName", data.fieldName);
      formData.append("Location", data.location);
      formData.append("Price", data.price);
      formData.append("Description", data.description);
      formData.append("OwnerId", data.ownerId);

      if (data.imageFile) {
        formData.append("ImageFile", data.imageFile);
      }
      if (data.avatarFile) {
        formData.append("AvatarFile", data.avatarFile);
      }

      const res = await request({
        url: `/admin/Fields/${data.fieldId}`,
        method: "PUT",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// DELETE FIELD
export const actionDeleteField = createAsyncThunk(
  "field/actionDeleteField",
  async (id: number, { rejectWithValue }) => {
    try {
      await request({
        url: `/admin/Fields/${id}`,
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/* ----------------------------- SLICE ----------------------------- */
export const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    clearSelectedField: (state) => {
      state.selectedField = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(actionGetFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actionGetFields.fulfilled, (state, action) => {
        state.loading = false;
        state.fields = action.payload;
      })
      .addCase(actionGetFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET DETAIL
      .addCase(actionGetDetailField.pending, (state) => {
        state.loading = true;
        state.selectedField = null;
      })
      .addCase(actionGetDetailField.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedField = action.payload;
      })
      .addCase(actionGetDetailField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE
      .addCase(actionCreateField.fulfilled, (state, action) => {
        state.fields.push(action.payload);
      })

      // UPDATE
      .addCase(actionUpdateField.fulfilled, (state, action) => {
        const index = state.fields.findIndex(
          (f) => f.fieldId === action.payload.fieldId
        );
        if (index !== -1) state.fields[index] = action.payload;

        if (state.selectedField?.fieldId === action.payload.fieldId) {
          state.selectedField = action.payload;
        }
      })

      // DELETE
      .addCase(actionDeleteField.fulfilled, (state, action) => {
        state.fields = state.fields.filter((f) => f.fieldId !== action.payload);
        if (state.selectedField?.fieldId === action.payload)
          state.selectedField = null;
      });
  },
});

/* ----------------------------- SELECTORS ----------------------------- */
export const selectFields = (state: RootState) => state.field.fields;
export const selectSelectedField = (state: RootState) =>
  state.field.selectedField;

/* ----------------------------- EXPORT ----------------------------- */
export const { clearSelectedField } = fieldSlice.actions;
export default fieldSlice.reducer;
