import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    UserCreateRequest,
    UserEditRequest,
    UserUpdateRequest,
} from '~/application/model/modelRequest/UserModelRequest';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import {
    GetAllUserResponseFailure,
    GetAllUserResponseSuccess,
    GetUserByIdResponseFailure,
    GetUserByIdResponseSuccess,
} from '~/application/model/modelResponse/UserModelResponse';
import { apiUser } from '~/infrastructure/api/userApi';
import { RootState } from '../rootState';
import { createAxios } from '~/infrastructure/api/axiosJwt';
export const UserService = {
    fetchGetAll: createAsyncThunk<any, void, { state: RootState }>('user/fetchGetAll', async (_, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiUser.getAll(axiosJwt);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetById: createAsyncThunk('user/fetchGetById', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiUser.getUserById(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchCreate: createAsyncThunk('user/fetchCreateUser', async (model: UserCreateRequest, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiUser.createUser(axiosJwt, model);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchDelete: createAsyncThunk('user/fetchDeleteUser', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiUser.deleteUser(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchUpdate: createAsyncThunk('user/fetchUpdateUser', async (payload: { model: UserUpdateRequest }, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiUser.updateUser(axiosJwt, payload.model);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchEdit: createAsyncThunk('auth/fetchEditUser', async (payload: { model: UserEditRequest }, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiUser.editUser(axiosJwt, payload.model);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
};
export interface getAllState {
    DataSuccess: GetAllUserResponseSuccess | null;
    DataFailure: GetAllUserResponseFailure | null;
}
export interface GetUserById {
    DataSuccess: GetUserByIdResponseSuccess | null;
    DataFailure: GetUserByIdResponseFailure | null;
}
const initialUsersState: getAllState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialUserState: GetUserById = {
    DataSuccess: null,
    DataFailure: null,
};
interface initialStateType {
    dataGetAllUsers: getAllState;
    dataGetUserById: GetUserById;
    dataCreate: ResponseBase | null;
    dataDelete: ResponseBase | null;
    dataUpdate: ResponseBase | null;
    dataEdit: ResponseBase | null;
    isLoading: boolean;
    isError: boolean;
}
export const Users = createSlice({
    name: 'users',
    initialState: {
        dataGetAllUsers: initialUsersState,
        dataGetUserById: initialUserState,
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
            .addCase(UserService.fetchGetAll.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(UserService.fetchGetAll.fulfilled, (state, action) => {
                state.dataGetAllUsers.DataSuccess = action.payload as unknown as GetAllUserResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(UserService.fetchGetAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetAllUsers.DataFailure = action.payload as GetAllUserResponseFailure;
            })
            .addCase(UserService.fetchCreate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(UserService.fetchCreate.fulfilled, (state, action) => {
                state.dataCreate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(UserService.fetchCreate.rejected, (state, action) => {
                state.dataCreate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(UserService.fetchUpdate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(UserService.fetchUpdate.fulfilled, (state, action) => {
                state.dataUpdate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(UserService.fetchUpdate.rejected, (state, action) => {
                state.dataUpdate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(UserService.fetchDelete.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(UserService.fetchDelete.fulfilled, (state, action) => {
                state.dataDelete = action.payload as any;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(UserService.fetchDelete.rejected, (state, action) => {
                state.dataDelete = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(UserService.fetchEdit.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(UserService.fetchEdit.fulfilled, (state, action) => {
                state.dataEdit = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(UserService.fetchEdit.rejected, (state, action) => {
                state.dataEdit = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(UserService.fetchGetById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(UserService.fetchGetById.fulfilled, (state, action) => {
                state.dataGetUserById.DataSuccess = action.payload as unknown as GetUserByIdResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(UserService.fetchGetById.rejected, (state, action) => {
                state.dataGetUserById.DataFailure = action.payload as unknown as GetUserByIdResponseFailure;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default Users.reducer;
