import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  isShow: boolean;
  text: string;
  type: "error" | "success";
}

const initialState: AlertState = {
  isShow: false,
  text: "",
  type: "error",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    showAlert: (
      state: AlertState,
      action: PayloadAction<{
        text: string;
        type: "error" | "success";
      }>
    ) => {
      state.isShow = true;
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
    hideAlert: (state: AlertState) => {
      state.isShow = false;
      state.text = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
