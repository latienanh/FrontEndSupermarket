import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import { createAxios } from '~/infrastructure/api/axiosJwt';
import { apiCustomer } from '~/infrastructure/api/customerApi';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { CustomerRequest } from '~/application/model/modelRequest/CustomerModelRequest';
import {
    GetCountPagingCustomerResponseSuccess,
    GetCustomerByIdResponseFailure,
    GetCustomerByIdResponseSuccess,
    GetPagingCustomerResponseFailure,
    GetPagingCustomerResponseSuccess,
} from '~/application/model/modelResponse/CustomerModelResponse';

export const CustomerService = {
    fetchGetCountPaging: createAsyncThunk('Customer/fetchGetCountPaging', async (size: number, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiCustomer.getCountPaging(axiosJwt, size);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetPaging: createAsyncThunk('Customer/fetchGetPaging', async (props: propsFetchPaging, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiCustomer.getPagingCustomer(axiosJwt, props);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetAll: createAsyncThunk('Customer/fetchGetAll', async (_, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiCustomer.getAll(axiosJwt);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetById: createAsyncThunk('Customer/fetchGetById', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiCustomer.getCustomerById(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchCreate: createAsyncThunk('Customer/fetchCreateCustomer', async (model: CustomerRequest, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiCustomer.createCustomer(axiosJwt, model);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchDelete: createAsyncThunk('Customer/fetchDeleteCustomer', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiCustomer.deleteCustomer(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchUpdate: createAsyncThunk(
        'Customer/fetchUpdateCustomer',
        async (payload: { id: string; model: CustomerRequest }, thunkAPI) => {
            const { rejectWithValue, dispatch, getState } = thunkAPI;
            try {
                const axiosJwt = createAxios(dispatch, getState);
                const response = await apiCustomer.updateCustomer(axiosJwt, payload.id, payload.model);
                return response;
            } catch (err: any) {
                if (err.response.data) {
                    return rejectWithValue(err.response.data);
                }
            }
        },
    ),
};
export interface getPagingState {
    DataSuccess: GetPagingCustomerResponseSuccess | null;
    DataFailure: GetPagingCustomerResponseFailure | null;
}
export interface GetCustomerByIdState {
    DataSuccess: GetCustomerByIdResponseSuccess | null;
    DataFailure: GetCustomerByIdResponseFailure | null;
}

const initialCustomersState: getPagingState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialGetAllState: getPagingState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialCustomerState: GetCustomerByIdState = {
    DataSuccess: null,
    DataFailure: null,
};
interface initialStateType {
    dataGetAll: getPagingState;
    dataGetAllCustomers: getPagingState;
    dataGetCustomerById: GetCustomerByIdState;
    dataGetCountPaging: GetCountPagingCustomerResponseSuccess | null;
    dataCreate: ResponseBase | null;
    dataDelete: ResponseBase | null;
    dataUpdate: ResponseBase | null;
    isLoading: boolean;
    isError: boolean;
}
export const Customers = createSlice({
    name: 'Customers',
    initialState: {
        dataGetAll: initialGetAllState,
        dataGetAllCustomers: initialCustomersState,
        dataGetCustomerById: initialCustomerState,
        dataGetCountPaging: null,
        dataCreate: null,
        dataDelete: null,
        dataUpdate: null,
        isLoading: false,
        isError: false,
    } as initialStateType,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(CustomerService.fetchGetPaging.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CustomerService.fetchGetPaging.fulfilled, (state, action) => {
                state.dataGetAllCustomers.DataSuccess = action.payload as unknown as GetPagingCustomerResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CustomerService.fetchGetPaging.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetAllCustomers.DataFailure = action.payload as GetPagingCustomerResponseFailure;
            })
            .addCase(CustomerService.fetchGetAll.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CustomerService.fetchGetAll.fulfilled, (state, action) => {
                state.dataGetAll.DataSuccess = action.payload as unknown as GetPagingCustomerResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CustomerService.fetchGetAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetAll.DataFailure = action.payload as GetPagingCustomerResponseFailure;
            })
            .addCase(CustomerService.fetchCreate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CustomerService.fetchCreate.fulfilled, (state, action) => {
                state.dataCreate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CustomerService.fetchCreate.rejected, (state, action) => {
                state.dataCreate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(CustomerService.fetchUpdate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CustomerService.fetchUpdate.fulfilled, (state, action) => {
                state.dataUpdate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CustomerService.fetchUpdate.rejected, (state, action) => {
                state.dataUpdate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(CustomerService.fetchDelete.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CustomerService.fetchDelete.fulfilled, (state, action) => {
                state.dataDelete = action.payload as any;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CustomerService.fetchDelete.rejected, (state, action) => {
                state.dataDelete = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(CustomerService.fetchGetCountPaging.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CustomerService.fetchGetCountPaging.fulfilled, (state, action) => {
                state.dataGetCountPaging = action.payload as unknown as GetCountPagingCustomerResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CustomerService.fetchGetCountPaging.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(CustomerService.fetchGetById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CustomerService.fetchGetById.fulfilled, (state, action) => {
                state.dataGetCustomerById.DataSuccess = action.payload as unknown as GetCustomerByIdResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(CustomerService.fetchGetById.rejected, (state, action) => {
                state.dataGetCustomerById.DataFailure = action.payload as unknown as GetCustomerByIdResponseFailure;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default Customers.reducer;
