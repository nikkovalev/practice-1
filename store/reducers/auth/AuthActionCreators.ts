import Router from "next/router";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "@/api/http";

import { IAuthLogin, IAuthReg } from "@/models/IAuth";
import { IUser } from "./../../../models/IUser";

import { showAlert } from "../alert/alertSlice";

export const registerUser = createAsyncThunk("auth/register", async (body: IAuthReg, thunkAPI) => {
  try {
    const { data } = await http.post<{ id: string }>("/auth/reg", body);
    thunkAPI.dispatch(showAlert({ text: "Успешная регистрация", type: "success" }));
    Router.push("/auth");
    return data.id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (body: IAuthLogin, thunkAPI) => {
  try {
    const { data } = await http.post<{ token: string }>("/auth/login", body);
    thunkAPI.dispatch(showAlert({ text: "Успешная авторизация", type: "success" }));
    return data.token;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const { data } = await http.get<IUser>("/auth/me");
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
