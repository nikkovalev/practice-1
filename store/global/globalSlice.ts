import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  theme: "light" | "dark";
  modalPrevUrl: string;
}

const initialState: GlobalState = {
  theme: "light",
  modalPrevUrl: "/",
};

export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    changeTheme: (state: GlobalState) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setModalPrevUrl: (state: GlobalState, action: PayloadAction<string>) => {
      state.modalPrevUrl = action.payload;
    },
  },
});

export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
