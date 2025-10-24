/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { jwtDecode } from "jwt-decode";

import { EUserRole, type DynamicKeyObject } from "../interface/app";
import { request } from "../utils/request";

import type { RootState } from "./index";


interface IInfoLogin  {
  accessToken: string;
  role: EUserRole;
  email: string;
  userId: string;
  expiresTime: number;
}

type IInitialState = {
  infoLogin: IInfoLogin;
  isLogin: boolean;
  emailResend: {
    isCountDown: boolean;
    remaining: number;
  };
};

const initialState: IInitialState = {
  infoLogin: {
    accessToken: "",
    role: EUserRole.USER,
    email: "",
    userId: "",
    expiresTime: 0,
  },
  isLogin: false,
  emailResend: {
    isCountDown: false,
    remaining: 0,
  },
};

export const actionLogin = createAsyncThunk(
  "auth/actionLogin",
  async(data:DynamicKeyObject, {rejectWithValue}) => {
    const { ...payload } = data;
    try{
      return await request({
        url: `/Auth/Login`,
        method: "POST",
        data: payload,
      })
    }catch(error){
      return rejectWithValue(error);
    }
  }
)

export const actionRegister = createAsyncThunk(
  "auth/actionRegister",
  async (data: DynamicKeyObject, { rejectWithValue }) => {
    try {
      const res = await request({
        url: `/Auth/Register`,
        method: "POST",
        data,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const slice =  createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.infoLogin = initialState.infoLogin;
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionLogin.fulfilled, (state, action) => {
      const token = action.payload?.data?.token ?? "";
      if (token) {
        const decodedToken: any = jwtDecode(token);
        state.infoLogin = {
          ...state.infoLogin,
          accessToken: token,
          role: decodedToken["role"],        // "Admin" | "Customer"
          email: decodedToken["email"],
          userId: decodedToken["nameid"],
          expiresTime: decodedToken["exp"],  // số giây từ epoch
        };
        state.isLogin = true;
      }
    })
    .addCase(actionLogin.rejected, (state) => {
      state.infoLogin = initialState.infoLogin;
      state.isLogin = false;
    })
    builder
      .addCase(actionRegister.fulfilled, () => {
        console.log("✅ Đăng ký thành công");
      })
      .addCase(actionRegister.rejected, (state, action) => {
        console.error("❌ Đăng ký thất bại:", action.payload);
      });
  }
})
export const { logout } = slice.actions;
export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectInfoLogin = (state: RootState) => state.auth.infoLogin;

export default slice.reducer