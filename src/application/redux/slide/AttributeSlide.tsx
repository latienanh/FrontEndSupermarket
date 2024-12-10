import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AttributeRequest } from '~/application/model/modelRequest/AttributeModelRequest';
import { propsFetchPaging } from '~/application/model/modelRequest/FetchingPaging';
import {
    GetAllAttributesResponseFailure,
    GetAllAttributesResponseSuccess,
    GetAttributeByIdResponseFailure,
    GetAttributeByIdResponseSuccess,
    GetAttributesResponseFailure,
    GetAttributesResponseSuccess,
} from '~/application/model/modelResponse/AttributeModelResponse';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import { apiAttribute } from '~/infrastructure/api/attributeApi';
import { createAxios } from '~/infrastructure/api/axiosJwt';

export const AttributeService = {
    fetchGetAll: createAsyncThunk('Attribute/fetchGetAll', async (_, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiAttribute.getAll(axiosJwt);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetPaging: createAsyncThunk('Attribute/fetchGetPaging', async (props: propsFetchPaging, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiAttribute.getPagingAttribute(axiosJwt, props);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetById: createAsyncThunk('Attribute/fetchGetById', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiAttribute.getAttributeById(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchCreate: createAsyncThunk('Attribute/fetchCreateAttribute', async (model: AttributeRequest, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiAttribute.createAttribute(axiosJwt, model);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchDelete: createAsyncThunk('Attribute/fetchDeleteAttribute', async (id: string, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiAttribute.deleteAttribute(axiosJwt, id);
            return response;
        } catch (err: any) {
            if (err.response.data) {
                return rejectWithValue(err.response.data);
            }
        }
    }),
    fetchUpdate: createAsyncThunk(
        'Attribute/fetchUpdateAttribute',
        async (payload: { model: AttributeRequest }, thunkAPI) => {
            const { rejectWithValue, dispatch, getState } = thunkAPI;
            try {
                const axiosJwt = createAxios(dispatch, getState);
                const response = await apiAttribute.updateAttribute(axiosJwt, payload.model);
                return response;
            } catch (err: any) {
                if (err.response.data) {
                    return rejectWithValue(err.response.data);
                }
            }
        },
    ),
};
export interface getAttributesState {
    DataSuccess: GetAttributesResponseSuccess | null;
    DataFailure: GetAttributesResponseFailure | null;
}
export interface getAllAttributesState {
    DataSuccess: GetAllAttributesResponseSuccess | null;
    DataFailure: GetAllAttributesResponseFailure | null;
}
export interface GetAttributeByIdState {
    DataSuccess: GetAttributeByIdResponseSuccess | null;
    DataFailure: GetAttributeByIdResponseFailure | null;
}
const initialAttributesState: getAttributesState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialAttributePagingState: getAttributesState = {
    DataSuccess: null,
    DataFailure: null,
};
const initialAttributeState: GetAttributeByIdState = {
    DataSuccess: null,
    DataFailure: null,
};
interface initialStateType {
    dataGetPagingAttribute: getAttributesState;
    dataGetAll: getAllAttributesState;
    dataGetAttributeById: GetAttributeByIdState;
    dataCreate: ResponseBase | null;
    dataDelete: ResponseBase | null;
    dataUpdate: ResponseBase | null;
    isLoading: boolean;
    isError: boolean;
}
export const AttributeSlice = createSlice({
    name: 'Attribute',
    initialState: {
        dataGetAll: initialAttributesState,
        dataGetPagingAttribute: initialAttributePagingState,
        dataGetAttributeById: initialAttributeState,
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
            .addCase(AttributeService.fetchGetPaging.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(AttributeService.fetchGetPaging.fulfilled, (state, action) => {
                state.dataGetPagingAttribute.DataSuccess = action.payload as unknown as GetAttributesResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(AttributeService.fetchGetPaging.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetPagingAttribute.DataFailure = action.payload as GetAttributesResponseFailure;
            })
            .addCase(AttributeService.fetchGetAll.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(AttributeService.fetchGetAll.fulfilled, (state, action) => {
                state.dataGetAll.DataSuccess = action.payload as unknown as GetAllAttributesResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(AttributeService.fetchGetAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.dataGetAll.DataFailure = action.payload as GetAllAttributesResponseFailure;
            })
            .addCase(AttributeService.fetchCreate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(AttributeService.fetchCreate.fulfilled, (state, action) => {
                state.dataCreate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(AttributeService.fetchCreate.rejected, (state, action) => {
                state.dataCreate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(AttributeService.fetchUpdate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(AttributeService.fetchUpdate.fulfilled, (state, action) => {
                state.dataUpdate = action.payload as unknown as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(AttributeService.fetchUpdate.rejected, (state, action) => {
                state.dataUpdate = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(AttributeService.fetchDelete.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(AttributeService.fetchDelete.fulfilled, (state, action) => {
                state.dataDelete = action.payload as any;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(AttributeService.fetchDelete.rejected, (state, action) => {
                state.dataDelete = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(AttributeService.fetchGetById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(AttributeService.fetchGetById.fulfilled, (state, action) => {
                state.dataGetAttributeById.DataSuccess = action.payload as unknown as GetAttributeByIdResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(AttributeService.fetchGetById.rejected, (state, action) => {
                state.dataGetAttributeById.DataFailure = action.payload as unknown as GetAttributeByIdResponseFailure;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

// Action creators are generated for each case reducer function

export default AttributeSlice.reducer;
