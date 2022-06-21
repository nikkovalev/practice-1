import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "@/models/ICategory";

import { fetchCategories, fetchLikedServices } from "./categoriesActionCreators";

interface CategoriesState {
  categories: ICategory[];
  likedServices: number[];
  isCategoriesError: string;
  isServicesError: string;
  isCategoriesLoading: boolean;
  isServicesLoading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  likedServices: [],
  isCategoriesError: "",
  isServicesError: "",
  isCategoriesLoading: false,
  isServicesLoading: false,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending.type]: (state: CategoriesState) => {
      state.isCategoriesLoading = true;
    },
    [fetchCategories.fulfilled.type]: (
      state: CategoriesState,
      action: PayloadAction<ICategory[]>
    ) => {
      state.isCategoriesLoading = false;
      state.categories = action.payload;
    },
    [fetchCategories.rejected.type]: (state: CategoriesState, action: PayloadAction<string>) => {
      state.isCategoriesLoading = false;
      state.isCategoriesError = action.payload;
    },
    [fetchLikedServices.pending.type]: (state: CategoriesState) => {
      state.isCategoriesLoading = true;
    },
    [fetchLikedServices.fulfilled.type]: (
      state: CategoriesState,
      action: PayloadAction<number[]>
    ) => {
      state.isServicesLoading = false;
      state.likedServices = action.payload;
    },
    [fetchCategories.rejected.type]: (state: CategoriesState, action: PayloadAction<string>) => {
      state.isServicesLoading = false;
      state.isCategoriesError = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
