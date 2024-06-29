import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import { createAxios } from '~/infrastructure/api/axiosJwt';
import { apiMemberShipType } from '~/infrastructure/api/memberShipTypeApi';
import { MemberShipTypeRequest } from '~/application/model/modelRequest/MemberShipTypeMR';
import {
    GetAllMSTResponseFailure,
    GetAllMSTResponseSuccess,
    GetMSTByIdResponseFailure,
    GetMSTByIdResponseSuccess,
} from '~/application/model/modelResponse/MemberShipTypeMR';

export const MemberShipTypeService = {
    fetchGetAll: createAsyncThunk('MemberShipType/fetchGetAll', async (_, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiMemberShipType.getAll(axiosJwt);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetById: createAsyncThunk('MemberShipType/fetchGetById', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiMemberShipType.getMemberShipTypeById(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchCreate: createAsyncThunk('MemberShipType/fetchCreate', async (model: MemberShipTypeRequest, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiMemberShipType.createMemberShipType(axiosJwt, model);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchDelete: createAsyncThunk('MemberShipType/fetchDelete', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiMemberShipType.deleteMemberShipType(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchUpdate: createAsyncThunk(
        'MemberShipType/fetchUpdateMST',
        async (payload: { id: string; model: MemberShipTypeRequest }, thunkAPI) => {
            const { rejectWithValue, dispatch, getState } = thunkAPI;
            try {
                const axiosJwt = createAxios(dispatch, getState);
                const response = await apiMemberShipType.updateMemberShipType(axiosJwt, payload.id, payload.model);
                return response;
            } catch (err: any) {
                if (err.response.data) {
                    return rejectWithValue(err.response.data);
                }
            }
        },
    ),
};
export interface getAllState {
    DataSuccess: GetAllMSTResponseSuccess | null;
    DataFailure: GetAllMSTResponseFailure | null;
}
export interface GetMSTById {
    DataSuccess: GetMSTByIdResponseSuccess | null;
    DataFailure: GetMSTByIdResponseFailure | null;
}
const initialMSTsState: getAllState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialMSTState: GetMSTById = {
    DataSuccess: null,
    DataFailure: null,
};
interface initialStateType {
    dataGetAllMSTs: getAllState;
    dataGetMSTById: GetMSTById;
    dataCreate: ResponseBase | null;
    dataDelete: ResponseBase | null;
    dataUpdate: ResponseBase | null;
    isLoading: boolean;
    isError: boolean;
}
export const MSTs = createSlice({
    name: 'MemberShipType',
    initialState: {
        dataGetAllMSTs: initialMSTsState,
        dataGetMSTById: initialMSTState,
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
            .addCase(MemberShipTypeService.fetchGetAll.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(MemberShipTypeService.fetchGetAll.fulfilled, (state, action) => {
                state.dataGetAllMSTs.DataSuccess = action.payload as unknown as GetAllMSTResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(MemberShipTypeService.fetchGetAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetAllMSTs.DataFailure = action.payload as GetAllMSTResponseFailure;
            })
            .addCase(MemberShipTypeService.fetchCreate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(MemberShipTypeService.fetchCreate.fulfilled, (state, action) => {
                state.dataCreate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(MemberShipTypeService.fetchCreate.rejected, (state, action) => {
                state.dataCreate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(MemberShipTypeService.fetchUpdate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(MemberShipTypeService.fetchUpdate.fulfilled, (state, action) => {
                state.dataUpdate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(MemberShipTypeService.fetchUpdate.rejected, (state, action) => {
                state.dataUpdate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(MemberShipTypeService.fetchDelete.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(MemberShipTypeService.fetchDelete.fulfilled, (state, action) => {
                state.dataDelete = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(MemberShipTypeService.fetchDelete.rejected, (state, action) => {
                state.dataDelete = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(MemberShipTypeService.fetchGetById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(MemberShipTypeService.fetchGetById.fulfilled, (state, action) => {
                state.dataGetMSTById.DataSuccess = action.payload as unknown as GetMSTByIdResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(MemberShipTypeService.fetchGetById.rejected, (state, action) => {
                state.dataGetMSTById.DataFailure = action.payload as unknown as GetMSTByIdResponseFailure;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default MSTs.reducer;
