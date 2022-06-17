import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthLogin, IAuthReg } from "@/models/IAuth";
import { http } from "@/api/http";
import { showAlert } from "../alert/AlertSlice";
import Router from "next/router";

export const registerUser = createAsyncThunk("auth/register", async (body: IAuthReg, thunkAPI) => {
  try {
    const { data } = await http.post("/auth/reg", body);
    thunkAPI.dispatch(showAlert({ text: "Успешная регистрация", type: "success" }));
    Router.push("/auth");
    return data.id;
  } catch (error) {
    thunkAPI.dispatch(
      showAlert({
        text: error + "",
        type: "error",
      })
    );
    return thunkAPI.rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (body: IAuthLogin, thunkAPI) => {
  try {
    const { data } = await http.post("/auth/login", body);
    thunkAPI.dispatch(showAlert({ text: "Успешная авторизация", type: "success" }));
    return data.token;
  } catch (error) {
    thunkAPI.dispatch(
      showAlert({
        text: error + "",
        type: "error",
      })
    );
    return thunkAPI.rejectWithValue(error);
  }
});
