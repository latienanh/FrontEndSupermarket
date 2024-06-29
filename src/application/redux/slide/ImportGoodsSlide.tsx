import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import { createAxios } from '~/infrastructure/api/axiosJwt';
import { apiImportGoods } from '~/infrastructure/api/importGoodsApi';
export const ImportGoodsService = {
    fetchImportGoods: createAsyncThunk('ImportGoods/fetchImportGoods', async (model: StockInRequest, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiImportGoods.ImportGoods(axiosJwt, model);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
};

interface initialStateType {
    dataImportGoods: ResponseBase | null;
    isLoading: boolean;
    isError: boolean;
}
export const ImportGoods = createSlice({
    name: 'ImportGoodss',
    initialState: {
        dataImportGoods: null,
        isLoading: false,
        isError: false,
    } as initialStateType,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(ImportGoodsService.fetchImportGoods.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(ImportGoodsService.fetchImportGoods.fulfilled, (state, action) => {
                state.dataImportGoods = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(ImportGoodsService.fetchImportGoods.rejected, (state, action) => {
                state.dataImportGoods = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default ImportGoods.reducer;
