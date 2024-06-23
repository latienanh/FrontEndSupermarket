import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    GetAllRoleResponseFailure,
    GetAllRoleResponseSuccess,
} from '~/application/model/modelResponse/RoleModelResponse';
import { apiRole } from '~/infrastructure/api/roleApi';

export const fetchAllRole = createAsyncThunk('role/fetchAllRole', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await apiRole.getAll();
        return response;
    } catch (err: any) {
        if (err.response.data) {
            return rejectWithValue(err.response.data);
        }
    }
});

export interface initialStateType {
    DataSuccess: GetAllRoleResponseSuccess | null;
    isLoading: boolean;
    isError: boolean;
    DataFailure: GetAllRoleResponseFailure | null;
}

const initialState: initialStateType = {
    DataSuccess: null,
    isLoading: false,
    isError: false,
    DataFailure: null,
};

export const RoleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllRole.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllRole.fulfilled, (state, action) => {
                state.DataSuccess = action.payload as unknown as GetAllRoleResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllRole.rejected, (state, action) => {
                state.DataFailure = action.payload as GetAllRoleResponseFailure;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

// Action creators are generated for each case reducer function

export default RoleSlice.reducer;
