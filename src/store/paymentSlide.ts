import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { request } from "../utils/request";

import type { RootState } from "./index";

interface Payment {
  paymentId: number;
  bookingId: number;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  status: string;
}

interface PaymentState {
  list: Payment[];
  detail: Payment | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  list: [],
  detail: null,
  loading: false,
  error: null,
};

// 🟢 GET ALL
export const actionGetPayments = createAsyncThunk(
  "payment/actionGetPayments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request({
        url: "/Payment/GetPayments",
        method: "GET",
      });
      return res.data || res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 GET DETAIL
export const actionGetPayment = createAsyncThunk(
  "payment/actionGetPayment",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/Payment/GetPayment/${id}`,
        method: "GET",
      });
      return res.data || res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 CREATE
export const actionCreatePayment = createAsyncThunk(
  "payment/actionCreatePayment",
  async (data: Omit<Payment, "paymentId">, { rejectWithValue }) => {
    try {
      const res = await request({
        url: "/Payment/CreatePayment",
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
export const actionUpdatePayment = createAsyncThunk(
  "payment/actionUpdatePayment",
  async (data: Payment, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/Payment/UpdatePayment/${data.paymentId}`,
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
export const actionDeletePayment = createAsyncThunk(
  "payment/actionDeletePayment",
  async (id: number, { rejectWithValue }) => {
    try {
      await request({
        url: `/Payment/DeletePayment/${id}`,
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(actionGetPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionGetPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(actionGetPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // GET DETAIL
    builder
      .addCase(actionGetPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionGetPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(actionGetPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // CREATE
    builder
      .addCase(actionCreatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionCreatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(actionCreatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE
    builder
      .addCase(actionUpdatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionUpdatePayment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (p) => p.paymentId === action.payload.paymentId
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (
          state.detail &&
          state.detail.paymentId === action.payload.paymentId
        ) {
          state.detail = action.payload;
        }
      })
      .addCase(actionUpdatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE
    builder
      .addCase(actionDeletePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionDeletePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (p) => p.paymentId !== action.payload
        );
      })
      .addCase(actionDeletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectPaymentList = (state: RootState) => state.payment.list;
export const selectPaymentDetail = (state: RootState) => state.payment.detail;

export default paymentSlice.reducer;