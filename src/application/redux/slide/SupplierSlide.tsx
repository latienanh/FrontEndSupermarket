import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAxios } from '~/infrastructure/api/axiosJwt';
import { SupplierRequest } from '~/application/model/modelRequest/SupplierModelRequest';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { apiSupplier } from '~/infrastructure/api/supplierApi';
import {
    GetCountPagingSupplierResponseSuccess,
    GetMultipleSupplierResponseFailure,
    GetMultipleSupplierResponseSuccess,
    GetSupplierByIdResponseFailure,
    GetSupplierByIdResponseSuccess,
} from '~/application/model/modelResponse/SupplierModelResponse';

export const SupplierService = {
    fetchGetCountPaging: createAsyncThunk('Supplier/fetchGetCountPaging', async (size: number, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiSupplier.getCountPaging(axiosJwt, size);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetAll: createAsyncThunk('Supplier/fetchGetAll', async (_, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiSupplier.getAll(axiosJwt);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetPaging: createAsyncThunk('Supplier/fetchGetPaging', async (props: propsFetchPaging, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiSupplier.getPagingSupplier(axiosJwt, props);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetById: createAsyncThunk('Supplier/fetchGetById', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiSupplier.getSupplierById(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchCreate: createAsyncThunk('Supplier/fetchCreateSupplier', async (model: SupplierRequest, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiSupplier.createSupplier(axiosJwt, model);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchDelete: createAsyncThunk('Supplier/fetchDeleteSupplier', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiSupplier.deleteSupplier(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchUpdate: createAsyncThunk(
        'Supplier/fetchUpdateSupplier',
        async (payload: { id: string; model: SupplierRequest }, thunkAPI) => {
            const { rejectWithValue, dispatch, getState } = thunkAPI;
            try {
                const axiosJwt = createAxios(dispatch, getState);
                const response = await apiSupplier.updateSupplier(axiosJwt, payload.id, payload.model);
                return response;
            } catch (err: any) {
                if (err.response.data) {
                    return rejectWithValue(err.response.data);
                }
            }
        },
    ),
};
export interface getSuppliersState {
    DataSuccess: GetMultipleSupplierResponseSuccess | null;
    DataFailure: GetMultipleSupplierResponseFailure | null;
}
export interface GetSupplierByIdState {
    DataSuccess: GetSupplierByIdResponseSuccess | null;
    DataFailure: GetSupplierByIdResponseFailure | null;
}
const initialSuppliersState: getSuppliersState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialSupplierPagingState: getSuppliersState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialSupplierState: GetSupplierByIdState = {
    DataSuccess: null,
    DataFailure: null,
};
interface initialStateType {
    dataGetPagingSupplier: getSuppliersState;
    dataGetAll: getSuppliersState;
    dataGetSupplierById: GetSupplierByIdState;
    dataGetCountPaging: GetCountPagingSupplierResponseSuccess | null;
    dataCreate: ResponseBase | null;
    dataDelete: ResponseBase | null;
    dataUpdate: ResponseBase | null;
    isLoading: boolean;
    isError: boolean;
}
export const SupplierSlice = createSlice({
    name: 'Supplier',
    initialState: {
        dataGetAll: initialSuppliersState,
        dataGetPagingSupplier: initialSupplierPagingState,
        dataGetSupplierById: initialSupplierState,
        dataGetCountPaging: null,
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
            .addCase(SupplierService.fetchGetPaging.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(SupplierService.fetchGetPaging.fulfilled, (state, action) => {
                state.dataGetPagingSupplier.DataSuccess =
                    action.payload as unknown as GetMultipleSupplierResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(SupplierService.fetchGetPaging.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetPagingSupplier.DataFailure = action.payload as GetMultipleSupplierResponseFailure;
            })
            .addCase(SupplierService.fetchGetAll.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(SupplierService.fetchGetAll.fulfilled, (state, action) => {
                state.dataGetAll.DataSuccess = action.payload as unknown as GetMultipleSupplierResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(SupplierService.fetchGetAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetAll.DataFailure = action.payload as GetMultipleSupplierResponseFailure;
            })
            .addCase(SupplierService.fetchCreate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(SupplierService.fetchCreate.fulfilled, (state, action) => {
                state.dataCreate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(SupplierService.fetchCreate.rejected, (state, action) => {
                state.dataCreate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(SupplierService.fetchUpdate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(SupplierService.fetchUpdate.fulfilled, (state, action) => {
                state.dataUpdate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(SupplierService.fetchUpdate.rejected, (state, action) => {
                state.dataUpdate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(SupplierService.fetchDelete.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(SupplierService.fetchDelete.fulfilled, (state, action) => {
                state.dataDelete = action.payload as any;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(SupplierService.fetchDelete.rejected, (state, action) => {
                state.dataDelete = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(SupplierService.fetchGetCountPaging.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(SupplierService.fetchGetCountPaging.fulfilled, (state, action) => {
                state.dataGetCountPaging = action.payload as unknown as GetCountPagingSupplierResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(SupplierService.fetchGetCountPaging.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(SupplierService.fetchGetById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(SupplierService.fetchGetById.fulfilled, (state, action) => {
                state.dataGetSupplierById.DataSuccess = action.payload as unknown as GetSupplierByIdResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(SupplierService.fetchGetById.rejected, (state, action) => {
                state.dataGetSupplierById.DataFailure = action.payload as unknown as GetSupplierByIdResponseFailure;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

// Action creators are generated for each case reducer function

export default SupplierSlice.reducer;
