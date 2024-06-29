import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import { createAxios } from '~/infrastructure/api/axiosJwt';
import { apiSale } from '~/infrastructure/api/saleApi';
export const SaleService = {
    fetchSale: createAsyncThunk('Sale/fetchSale', async (model: InvoiceRequest, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiSale.Sale(axiosJwt, model);
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
    dataSale: ResponseBase | null;
    isLoading: boolean;
    isError: boolean;
}
export const Sales = createSlice({
    name: 'Sales',
    initialState: {
        dataSale: null,
        isLoading: false,
        isError: false,
    } as initialStateType,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(SaleService.fetchSale.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(SaleService.fetchSale.fulfilled, (state, action) => {
                state.dataSale = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(SaleService.fetchSale.rejected, (state, action) => {
                state.dataSale = action.payload as ResponseBase;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default Sales.reducer;
