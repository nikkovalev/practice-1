import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/models/IUser";

interface IAuthState {
  token: string;
  user: IUser | null;
  isAuth: boolean;
}

const initialState: IAuthState = {
  token: "",
  user: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: IAuthState, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state: IAuthState) => {
      state.user = null;
      state.isAuth = false;
      state.token = "";
    },
    setToken: (state: IAuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = true;
    },
    updatePhotoURL: (state: IAuthState, action: PayloadAction<string>) => {
      (state.user as IUser).photoUrl = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const { logout } = authSlice.actions;
