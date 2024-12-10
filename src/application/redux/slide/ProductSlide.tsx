import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAxios } from '~/infrastructure/api/axiosJwt';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';

import {
    GetAllProductResponseFailure,
    GetAllProductResponseSuccess,
    GetProductByIdResponseFailure,
    GetProductByIdResponseSuccess,
    GetProductsResponseFailure,
    GetProductsResponseSuccess,
} from '~/application/model/modelResponse/ProductModelResponse';
import { apiProduct } from '~/infrastructure/api/productApi';
import { ProductCreateRequest, ProductUpdateRequest } from '~/application/model/modelRequest/ProductModelResqest';

export const ProductService = {
    fetchGetAll: createAsyncThunk('Product/fetchGetAll', async (_, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiProduct.getAll(axiosJwt);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetPaging: createAsyncThunk('Product/fetchGetPaging', async (props: propsFetchPaging, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiProduct.getPagingProduct(axiosJwt, props);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetById: createAsyncThunk('Product/fetchGetById', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiProduct.getProductById(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchCreate: createAsyncThunk('Product/fetchCreateProduct', async (model: ProductCreateRequest, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiProduct.createProduct(axiosJwt, model);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchDelete: createAsyncThunk('Product/fetchDeleteProduct', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiProduct.deleteProduct(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchUpdate: createAsyncThunk(
        'Product/fetchUpdateProduct',
        async (payload: { model: ProductUpdateRequest }, thunkAPI) => {
            const { rejectWithValue, dispatch, getState } = thunkAPI;
            try {
                const axiosJwt = createAxios(dispatch, getState);
                const response = await apiProduct.updateProduct(axiosJwt, payload.model);
                return response;
            } catch (err: any) {
                if (err.response.data) {
                    return rejectWithValue(err.response.data);
                }
            }
        },
    ),
};
export interface getProductsState {
    DataSuccess: GetProductsResponseSuccess | null;
    DataFailure: GetProductsResponseFailure | null;
}
export interface GetProductByIdState {
    DataSuccess: GetProductByIdResponseSuccess | null;
    DataFailure: GetProductByIdResponseFailure | null;
}
export interface getAllProductsState {
    DataSuccess: GetAllProductResponseSuccess | null;
    DataFailure: GetAllProductResponseFailure | null;
}
const initialProductsState: getProductsState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialProductPagingState: getProductsState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialProductState: GetProductByIdState = {
    DataSuccess: null,
    DataFailure: null,
};
interface initialStateType {
    dataGetPagingProduct: getProductsState;
    dataGetAll: getAllProductsState;
    dataGetProductById: GetProductByIdState;
    dataCreate: ResponseBase | null;
    dataDelete: ResponseBase | null;
    dataUpdate: ResponseBase | null;
    isLoading: boolean;
    isError: boolean;
}
export const ProductSlice = createSlice({
    name: 'Product',
    initialState: {
        dataGetAll: initialProductsState,
        dataGetPagingProduct: initialProductPagingState,
        dataGetProductById: initialProductState,
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
            .addCase(ProductService.fetchGetPaging.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(ProductService.fetchGetPaging.fulfilled, (state, action) => {
                state.dataGetPagingProduct.DataSuccess = action.payload as unknown as GetProductsResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(ProductService.fetchGetPaging.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetPagingProduct.DataFailure = action.payload as GetProductsResponseFailure;
            })
            .addCase(ProductService.fetchGetAll.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(ProductService.fetchGetAll.fulfilled, (state, action) => {
                state.dataGetAll.DataSuccess = action.payload as unknown as GetAllProductResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(ProductService.fetchGetAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetAll.DataFailure = action.payload as GetAllProductResponseFailure;
            })
            .addCase(ProductService.fetchCreate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(ProductService.fetchCreate.fulfilled, (state, action) => {
                state.dataCreate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(ProductService.fetchCreate.rejected, (state, action) => {
                state.dataCreate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(ProductService.fetchUpdate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(ProductService.fetchUpdate.fulfilled, (state, action) => {
                state.dataUpdate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(ProductService.fetchUpdate.rejected, (state, action) => {
                state.dataUpdate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(ProductService.fetchDelete.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(ProductService.fetchDelete.fulfilled, (state, action) => {
                state.dataDelete = action.payload as any;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(ProductService.fetchDelete.rejected, (state, action) => {
                state.dataDelete = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(ProductService.fetchGetById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(ProductService.fetchGetById.fulfilled, (state, action) => {
                state.dataGetProductById.DataSuccess = action.payload as unknown as GetProductByIdResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(ProductService.fetchGetById.rejected, (state, action) => {
                state.dataGetProductById.DataFailure = action.payload as unknown as GetProductByIdResponseFailure;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default ProductSlice.reducer;
