import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { request } from "../utils/request";

import type { RootState } from "./index";

interface Booking {
  bookingId: number;
  userId: number;
  fieldId: number;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
}

interface BookingState {
  list: Booking[];
  detail: Booking | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  list: [],
  detail: null,
  loading: false,
  error: null,
};

// 🟢 Lấy danh sách booking
export const actionGetBookings = createAsyncThunk(
  "booking/actionGetBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request({
        url: "/Booking/GetBookings",
        method: "GET",
      });
      return res.data || res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 Lấy chi tiết booking theo ID
export const actionGetBooking = createAsyncThunk(
  "booking/actionGetBooking",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/Booking/GetBooking/${id}`,
        method: "GET",
      });
      return res.data || res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 Tạo booking mới
export const actionCreateBooking = createAsyncThunk(
  "booking/actionCreateBooking",
  async (data: Omit<Booking, "bookingId">, { rejectWithValue }) => {
    try {
      const res = await request({
        url: "/Booking/CreateBooking",
        method: "POST",
        data,
      });
      return res.data || res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 Cập nhật booking
export const actionUpdateBooking = createAsyncThunk(
  "booking/actionUpdateBooking",
  async (data: Booking, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/Booking/UpdateBooking/${data.bookingId}`,
        method: "PUT",
        data,
      });
      return res.data || res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 Xóa booking
export const actionDeleteBooking = createAsyncThunk(
  "booking/actionDeleteBooking",
  async (id: number, { rejectWithValue }) => {
    try {
      await request({
        url: `/Booking/DeleteBooking/${id}`,
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 🟢 GET ALL
    builder
      .addCase(actionGetBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionGetBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(actionGetBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 🟢 GET DETAIL
    builder
      .addCase(actionGetBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionGetBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(actionGetBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 🟢 CREATE
    builder
      .addCase(actionCreateBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionCreateBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(actionCreateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 🟢 UPDATE
    builder
      .addCase(actionUpdateBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionUpdateBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (b) => b.bookingId === action.payload.bookingId
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (
          state.detail &&
          state.detail.bookingId === action.payload.bookingId
        ) {
          state.detail = action.payload;
        }
      })
      .addCase(actionUpdateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 🟢 DELETE
    builder
      .addCase(actionDeleteBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionDeleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((b) => b.bookingId !== action.payload);
      })
      .addCase(actionDeleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectBookingList = (state: RootState) => state.booking.list;
export const selectBookingDetail = (state: RootState) => state.booking.detail;

export default bookingSlice.reducer;
