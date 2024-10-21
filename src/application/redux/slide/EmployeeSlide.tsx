import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAxios } from '~/infrastructure/api/axiosJwt';
import { EmployeeRequest } from '~/application/model/modelRequest/EmployeeModelRequest';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import { apiEmployee } from '~/infrastructure/api/emplyeeApi';
import {
    GetCountPagingEmployeeResponseSuccess,
    GetEmployeeByIdResponseFailure,
    GetEmployeeByIdResponseSuccess,
    GetMultipleEmployeeResponseFailure,
    GetMultipleEmployeeResponseSuccess,
} from '~/application/model/modelResponse/EmployeeModelResponse';

export const EmployeeService = {
    fetchGetCountPaging: createAsyncThunk('Employee/fetchGetCountPaging', async (size: number, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiEmployee.getCountPaging(axiosJwt, size);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetAll: createAsyncThunk('Employee/fetchGetAll', async (_, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiEmployee.getAll(axiosJwt);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetPaging: createAsyncThunk('Employee/fetchGetPaging', async (props: propsFetchPaging, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiEmployee.getPagingEmployee(axiosJwt, props);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetById: createAsyncThunk('Employee/fetchGetById', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiEmployee.getEmployeeById(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchCreate: createAsyncThunk('Employee/fetchCreateEmployee', async (model: EmployeeRequest, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiEmployee.createEmployee(axiosJwt, model);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchDelete: createAsyncThunk('Employee/fetchDeleteEmployee', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiEmployee.deleteEmployee(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchUpdate: createAsyncThunk(
        'Employee/fetchUpdateEmployee',
        async (payload: { model: EmployeeRequest }, thunkAPI) => {
            const { rejectWithValue, dispatch, getState } = thunkAPI;
            try {
                const axiosJwt = createAxios(dispatch, getState);
                const response = await apiEmployee.updateEmployee(axiosJwt, payload.model);
                return response;
            } catch (err: any) {
                if (err.response.data) {
                    return rejectWithValue(err.response.data);
                }
            }
        },
    ),
};
export interface getEmployeesState {
    DataSuccess: GetMultipleEmployeeResponseSuccess | null;
    DataFailure: GetMultipleEmployeeResponseFailure | null;
}
export interface GetEmployeeByIdState {
    DataSuccess: GetEmployeeByIdResponseSuccess | null;
    DataFailure: GetEmployeeByIdResponseFailure | null;
}
const initialEmployeesState: getEmployeesState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialEmployeePagingState: getEmployeesState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialEmployeeState: GetEmployeeByIdState = {
    DataSuccess: null,
    DataFailure: null,
};
interface initialStateType {
    dataGetPagingEmployee: getEmployeesState;
    dataGetAll: getEmployeesState;
    dataGetEmployeeById: GetEmployeeByIdState;
    dataGetCountPaging: GetCountPagingEmployeeResponseSuccess | null;
    dataCreate: ResponseBase | null;
    dataDelete: ResponseBase | null;
    dataUpdate: ResponseBase | null;
    isLoading: boolean;
    isError: boolean;
}
export const EmployeeSlice = createSlice({
    name: 'Employee',
    initialState: {
        dataGetAll: initialEmployeesState,
        dataGetPagingEmployee: initialEmployeePagingState,
        dataGetEmployeeById: initialEmployeeState,
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
            .addCase(EmployeeService.fetchGetPaging.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchGetPaging.fulfilled, (state, action) => {
                state.dataGetPagingEmployee.DataSuccess =
                    action.payload as unknown as GetMultipleEmployeeResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchGetPaging.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetPagingEmployee.DataFailure = action.payload as GetMultipleEmployeeResponseFailure;
            })
            .addCase(EmployeeService.fetchGetAll.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchGetAll.fulfilled, (state, action) => {
                state.dataGetAll.DataSuccess = action.payload as unknown as GetMultipleEmployeeResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchGetAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetAll.DataFailure = action.payload as GetMultipleEmployeeResponseFailure;
            })
            .addCase(EmployeeService.fetchCreate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchCreate.fulfilled, (state, action) => {
                state.dataCreate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchCreate.rejected, (state, action) => {
                state.dataCreate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(EmployeeService.fetchUpdate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchUpdate.fulfilled, (state, action) => {
                state.dataUpdate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchUpdate.rejected, (state, action) => {
                state.dataUpdate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(EmployeeService.fetchDelete.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchDelete.fulfilled, (state, action) => {
                state.dataDelete = action.payload as any;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchDelete.rejected, (state, action) => {
                state.dataDelete = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(EmployeeService.fetchGetCountPaging.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchGetCountPaging.fulfilled, (state, action) => {
                state.dataGetCountPaging = action.payload as unknown as GetCountPagingEmployeeResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchGetCountPaging.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(EmployeeService.fetchGetById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchGetById.fulfilled, (state, action) => {
                state.dataGetEmployeeById.DataSuccess = action.payload as unknown as GetEmployeeByIdResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(EmployeeService.fetchGetById.rejected, (state, action) => {
                state.dataGetEmployeeById.DataFailure = action.payload as unknown as GetEmployeeByIdResponseFailure;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

// Action creators are generated for each case reducer function

export default EmployeeSlice.reducer;
