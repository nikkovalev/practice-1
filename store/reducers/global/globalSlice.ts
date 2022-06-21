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
    changeTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    changeModalPrevUrl: (state, action: PayloadAction<string>) => {
      state.modalPrevUrl = action.payload;
    },
  },
});

export const { changeTheme, changeModalPrevUrl } = globalSlice.actions;
export default globalSlice.reducer;
