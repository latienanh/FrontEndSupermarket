import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type Category from '~/domain/entities/supermarketEntities/Category';

import { apiCategory } from '~/infrastructure/api/categoryApi';

export const fetchAllCategories = createAsyncThunk('categories/fetchAllCategories', async (thunkAPI) => {
    const response = await apiCategory.getAll();
    return response.listData;
});

export interface CategoryState {
    listCategories: Category[];
    isLoading: boolean;
    isError: boolean;
}

const initialState: CategoryState = {
    listCategories: [],
    isLoading: false,
    isError: false,
};

export const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllCategories.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.listCategories = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

// Action creators are generated for each case reducer function

export default CategorySlice.reducer;
