import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAxios } from '~/infrastructure/api/axiosJwt';
import { apiCategory } from '~/infrastructure/api/categoryApi';
import { CategoryRequest } from '~/application/model/modelRequest/CategoryModelRequest';
import {
    GetAllCategoriesResponseFailure,
    GetAllCategoriesResponseSuccess,
    GetCategoryByIdResponseFailure,
    GetCategoryByIdResponseSuccess,
    GetMultipleCategoriesResponseFailure,
    GetMultipleCategoriesResponseSuccess,
} from '~/application/model/modelResponse/CategoryModelResponse';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';

export const CategoryService = {
    fetchGetAll: createAsyncThunk('category/fetchGetAll', async (_, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiCategory.getAll(axiosJwt);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetPaging: createAsyncThunk('category/fetchGetPaging', async (props: propsFetchPaging, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiCategory.getPagingCategory(axiosJwt, props);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetById: createAsyncThunk('category/fetchGetById', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiCategory.getCategoryById(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchCreate: createAsyncThunk('category/fetchCreateCategory', async (model: CategoryRequest, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiCategory.createCategory(axiosJwt, model);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchDelete: createAsyncThunk('category/fetchDeleteCategory', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiCategory.deleteCategory(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchUpdate: createAsyncThunk(
        'category/fetchUpdateCategory',
        async (payload: { model: CategoryRequest }, thunkAPI) => {
            const { rejectWithValue, dispatch, getState } = thunkAPI;
            try {
                const axiosJwt = createAxios(dispatch, getState);
                const response = await apiCategory.updateCategory(axiosJwt, payload.model);
                return response;
            } catch (err: any) {
                if (err.response.data) {
                    return rejectWithValue(err.response.data);
                }
            }
        },
    ),
};
export interface getCategoriesState {
    DataSuccess: GetMultipleCategoriesResponseSuccess | null;
    DataFailure: GetMultipleCategoriesResponseFailure | null;
}
export interface getAllCategoriesState {
    DataSuccess: GetAllCategoriesResponseSuccess | null;
    DataFailure: GetAllCategoriesResponseFailure | null;
}
export interface GetCategoryByIdState {
    DataSuccess: GetCategoryByIdResponseSuccess | null;
    DataFailure: GetCategoryByIdResponseFailure | null;
}
const initialCategoriesState: getCategoriesState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialAllCategoriesState: getAllCategoriesState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialCategoryState: GetCategoryByIdState = {
    DataSuccess: null,
    DataFailure: null,
};
interface initialStateType {
    dataGetAll: getAllCategoriesState;
    dataGetPagingCategory: getCategoriesState;
    dataGetCategoryById: GetCategoryByIdState;
    dataCreate: ResponseBase | null;
    dataDelete: ResponseBase | null;
    dataUpdate: ResponseBase | null;
    dataEdit: ResponseBase | null;
    isLoading: boolean;
    isError: boolean;
}
export const CategorySlice = createSlice({
    name: 'category',
    initialState: {
        dataGetAll: initialAllCategoriesState,
        dataGetPagingCategory: initialCategoriesState,
        dataGetCategoryById: initialCategoryState,
        dataCreate: null,
        dataDelete: null,
        dataUpdate: null,
        dataEdit: null,
        isLoading: false,
        isError: false,
    } as initialStateType,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(CategoryService.fetchGetAll.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CategoryService.fetchGetAll.fulfilled, (state, action) => {
                state.dataGetAll.DataSuccess = action.payload as unknown as GetAllCategoriesResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CategoryService.fetchGetAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetAll.DataFailure = action.payload as GetAllCategoriesResponseFailure;
            })
            .addCase(CategoryService.fetchGetPaging.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CategoryService.fetchGetPaging.fulfilled, (state, action) => {
                state.dataGetPagingCategory.DataSuccess =
                    action.payload as unknown as GetMultipleCategoriesResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CategoryService.fetchGetPaging.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetPagingCategory.DataFailure = action.payload as GetMultipleCategoriesResponseFailure;
            })
            .addCase(CategoryService.fetchCreate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CategoryService.fetchCreate.fulfilled, (state, action) => {
                state.dataCreate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CategoryService.fetchCreate.rejected, (state, action) => {
                state.dataCreate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(CategoryService.fetchUpdate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CategoryService.fetchUpdate.fulfilled, (state, action) => {
                state.dataUpdate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CategoryService.fetchUpdate.rejected, (state, action) => {
                state.dataUpdate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(CategoryService.fetchDelete.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CategoryService.fetchDelete.fulfilled, (state, action) => {
                state.dataDelete = action.payload as any;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CategoryService.fetchDelete.rejected, (state, action) => {
                state.dataDelete = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(CategoryService.fetchGetById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CategoryService.fetchGetById.fulfilled, (state, action) => {
                state.dataGetCategoryById.DataSuccess = action.payload as unknown as GetCategoryByIdResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CategoryService.fetchGetById.rejected, (state, action) => {
                state.dataGetCategoryById.DataFailure = action.payload as unknown as GetCategoryByIdResponseFailure;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

// Action creators are generated for each case reducer function

export default CategorySlice.reducer;
