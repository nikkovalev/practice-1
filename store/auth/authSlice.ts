import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/models/IUser";

interface IAuthState {
  token: string;
  user: IUser | null;
  userId: number | null;
  isAuth: boolean;
}

const initialState: IAuthState = {
  token: "",
  userId: null,
  user: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state: IAuthState, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state: IAuthState) => {
      state.user = null;
      state.userId = null;
      state.isAuth = false;
      state.token = "";
    },
    saveToken: (state: IAuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = true;
    },
    saveUserId: (state: IAuthState, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    saveAvatar: (state: IAuthState, action: PayloadAction<string>) => {
      (state.user as IUser).photoUrl = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const { logout } = authSlice.actions;
