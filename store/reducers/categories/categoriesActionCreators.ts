import { http } from "@/api/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { ICategory } from "@/models/ICategory";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async (isFull: boolean, thunkAPI) => {
    try {
      const { data } = await http.get<ICategory[]>(`/categories?full=${isFull}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchLikedServices = createAsyncThunk(
  "categories/liked-services",
  async (raw: boolean, thunkAPI) => {
    try {
      const { data } = await http.get<number[]>(`/categories/liked-services?raw=${raw}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
