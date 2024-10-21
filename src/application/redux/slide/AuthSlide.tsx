import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NULL } from 'sass';
import {
    ForgotPassword,
    LoginRequest,
    RefreshToken,
    ResetPassword,
    SignupRequest,
} from '~/application/model/modelRequest/AuthModelRequest';
import {
    ForgotPasswordResponseSuccess,
    LogOutResponseFailure,
    LogOutResponseSuccess,
    LoginResponseFailure,
    LoginResponseSuccess,
    ResetPasswordResponseSuccess,
    SignUpResponseFailure,
    SignUpResponseSuccess,
} from '~/application/model/modelResponse/AuthModelResponse';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import { apiAuth } from '~/infrastructure/api/authApi';
import { createAxios } from '~/infrastructure/api/axiosJwt';

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (model: LoginRequest, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await apiAuth.login(model);
        return response;
    } catch (err: any) {
        if (err.response.data) {
            return rejectWithValue(err.response.data);
        }
    }
});
export const fetchLogOut = createAsyncThunk('auth/fetchLogOut', async (_, thunkAPI) => {
    const { rejectWithValue, dispatch, getState } = thunkAPI;
    try {
        const axiosJwt = createAxios(dispatch, getState);
        const response = await apiAuth.logout(axiosJwt);
        return response;
    } catch (err: any) {
        if (err.response.data) {
            return rejectWithValue(err.response.data);
        }
    }
});
export const fetchSigup = createAsyncThunk('auth/fetchSigup', async (model: SignupRequest, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await apiAuth.sigup(model);
        return response;
    } catch (err: any) {
        if (err.response.data) {
            return rejectWithValue(err.response.data);
        }
    }
});
export const fetchRefreshToken = createAsyncThunk('auth/fetchRefresh', async (model: RefreshToken, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await apiAuth.refreshToken(model);
        return response;
    } catch (err: any) {
        if (err.response.data) {
            return rejectWithValue(err.response.data);
        }
    }
});
export const fetchForgotPassword = createAsyncThunk('auth/ForgotPassword', async (model: ForgotPassword, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await apiAuth.forgotPassword(model);
        return response;
    } catch (err: any) {
        if (err.response.data) {
            return rejectWithValue(err.response.data);
        }
    }
});
export const fetchResetPassword = createAsyncThunk('auth/ResetPassword', async (model: ResetPassword, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await apiAuth.resetPassword(model);
        return response;
    } catch (err: any) {
        if (err.response.data) {
            return rejectWithValue(err.response.data);
        }
    }
});
export interface SignupState {
    DataSuccess: SignUpResponseSuccess | null;
    isLoading: boolean;
    isError: boolean;
    DataFailure: SignUpResponseFailure | null;
}
export interface LoginState {
    DataSuccess: LoginResponseSuccess | null;
    isLoading: boolean;
    isError: boolean;
    DataFailure: LoginResponseFailure | null;
}
export interface LogOutState {
    DataSuccess: LogOutResponseSuccess | null;
    isLoading: boolean;
    isError: boolean;
    DataFailure: LogOutResponseFailure | null;
}
export interface ForgotpasswordState {
    DataSuccess: ForgotPasswordResponseSuccess | null;
    isLoading: boolean;
    isError: boolean;
    DataFailure: ResponseBase | null;
}
export interface ResetPasswordState {
    DataSuccess: ResetPasswordResponseSuccess | null;
    isLoading: boolean;
    isError: boolean;
    DataFailure: ResponseBase | null;
}

const initialLoginState: LoginState = {
    DataSuccess: null,
    isLoading: false,
    isError: false,
    DataFailure: null,
};
const initialSigupState: SignupState = {
    DataSuccess: null,
    isLoading: false,
    isError: false,
    DataFailure: null,
};
const initialLogout: LogOutState = {
    DataSuccess: null,
    isLoading: false,
    isError: false,
    DataFailure: null,
};
const initialForgotPassword: ForgotpasswordState = {
    DataSuccess: null,
    isLoading: false,
    isError: false,
    DataFailure: null,
};
const initialResetPassword: ResetPasswordState = {
    DataSuccess: null,
    isLoading: false,
    isError: false,
    DataFailure: null,
};
export const Auth = createSlice({
    name: 'auth',
    initialState: {
        login: initialLoginState,
        signUp: initialSigupState,
        logout: initialLogout,
        forgotPassword: initialForgotPassword,
        resetPassword: initialResetPassword,
        refresh: {
            isLoading: false,
            isError: false,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.login.isLoading = true;
                state.login.isError = false;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.login.DataSuccess = action.payload as LoginResponseSuccess;
                state.login.DataFailure = null;
                state.logout.DataSuccess = null;
                state.login.isLoading = false;
                state.login.isError = false;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.login.DataFailure = action.payload as LoginResponseFailure;
                state.login.DataSuccess = null;
                state.login.isLoading = false;
                state.login.isError = true;
            })
            .addCase(fetchSigup.pending, (state) => {
                state.signUp.isLoading = true;
                state.signUp.isError = false;
            })
            .addCase(fetchSigup.fulfilled, (state, action) => {
                state.signUp.DataSuccess = action.payload as SignUpResponseSuccess;
                state.signUp.DataFailure = null;
                state.signUp.isLoading = false;
                state.signUp.isError = false;
            })
            .addCase(fetchSigup.rejected, (state, action) => {
                state.signUp.isLoading = false;
                state.signUp.isError = true;
                state.signUp.DataSuccess = null;
                state.signUp.DataFailure = action.payload as SignUpResponseFailure;
            })
            .addCase(fetchLogOut.pending, (state) => {
                state.logout.isLoading = true;
                state.logout.isError = false;
            })
            .addCase(fetchLogOut.fulfilled, (state, action) => {
                state.logout.DataSuccess = action.payload as unknown as LogOutResponseSuccess;
                state.login.DataSuccess = null;
                state.signUp.DataSuccess = null;
                state.logout.isLoading = false;
                state.logout.isError = false;
            })
            .addCase(fetchLogOut.rejected, (state, action) => {
                state.logout.isLoading = false;
                state.logout.isError = true;
                state.logout.DataFailure = action.payload as LogOutResponseFailure;
            })
            .addCase(fetchRefreshToken.pending, (state) => {
                // state.refresh.isLoading = true;
            })
            .addCase(fetchRefreshToken.fulfilled, (state, action) => {
                state.login.DataSuccess = action.payload;
                // state.refresh.isLoading = false;
                // state.refresh.isError = false;
            })
            .addCase(fetchRefreshToken.rejected, (state, action) => {
                state.login.DataSuccess = null;
                // state.refresh.isLoading = false;
                // state.refresh.isError = true;
            })
            .addCase(fetchForgotPassword.pending, (state) => {
                state.forgotPassword.DataSuccess = null;
                state.forgotPassword.isLoading = true;
                state.forgotPassword.isError = false;
            })
            .addCase(fetchForgotPassword.fulfilled, (state, action) => {
                state.forgotPassword.DataSuccess = action.payload as unknown as ForgotPasswordResponseSuccess;
                state.forgotPassword.isLoading = false;
                state.forgotPassword.isError = false;
            })
            .addCase(fetchForgotPassword.rejected, (state, action) => {
                state.forgotPassword.DataFailure = action.payload as ResponseBase;
                state.forgotPassword.isLoading = false;
                state.forgotPassword.isError = true;
            })
            .addCase(fetchResetPassword.pending, (state) => {
                state.resetPassword.DataSuccess = null;
                state.resetPassword.isLoading = true;
                state.resetPassword.isError = false;
            })
            .addCase(fetchResetPassword.fulfilled, (state, action) => {
                state.resetPassword.DataSuccess = action.payload as ResetPasswordResponseSuccess;
                state.resetPassword.isLoading = false;
                state.resetPassword.isError = false;
            })
            .addCase(fetchResetPassword.rejected, (state, action) => {
                state.resetPassword.DataFailure = action.payload as ResponseBase;
                state.resetPassword.isLoading = false;
                state.resetPassword.isError = true;
            });
    },
});

export default Auth.reducer;
