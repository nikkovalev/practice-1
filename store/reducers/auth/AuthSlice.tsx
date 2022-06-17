import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./AuthActionCreators";

interface AuthState {
  isLoading: boolean;
  isError: string;
  userId: string;
  token: string;
}

const initialState: AuthState = {
  isLoading: false,
  isError: "",
  token: "",
  userId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending.type]: (state: AuthState) => {
      state.isLoading = true;
      state.isError = "";
    },
    [registerUser.rejected.type]: (state: AuthState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [registerUser.fulfilled.type]: (state: AuthState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = "";
      state.userId = action.payload;
    },
    [loginUser.pending.type]: (state: AuthState) => {
      state.isLoading = true;
      state.isError = "";
    },
    [loginUser.rejected.type]: (state: AuthState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [loginUser.fulfilled.type]: (state: AuthState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = "";
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;
