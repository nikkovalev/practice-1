import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/models/IUser";
import { getMe, loginUser, registerUser } from "./authActionCreators";

interface AuthState {
  isLoading: boolean;
  error: string;
  userId: string;
  isAuth: boolean;
  user: IUser | null;
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: "",
  userId: "",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.userId = "";
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: {
    [registerUser.pending.type]: (state: AuthState) => {
      state.isLoading = true;
      state.error = "";
    },
    [registerUser.rejected.type]: (state: AuthState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [registerUser.fulfilled.type]: (state: AuthState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = "";
      state.userId = action.payload;
    },
    [loginUser.pending.type]: (state: AuthState) => {
      state.isLoading = true;
      state.error = "";
    },
    [loginUser.rejected.type]: (state: AuthState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [loginUser.fulfilled.type]: (state: AuthState, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload);
      state.isLoading = false;
      state.error = "";
      state.isAuth = true;
    },
    [getMe.fulfilled.type]: (state: AuthState, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
