import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResponseBase } from '~/application/model/modelResponse/ModelResponeseBase';
import {
    GetAllInvoiceSuccess,
    GetChartResponseSuccess,
    GetSaleDateNowResponseSuccess,
} from '~/application/model/modelResponse/SaleModelResponse';
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
    fetchGetAllInvoice: createAsyncThunk('Sale/fetchGetAllInvoice', async (_, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiSale.GetAllInvoice(axiosJwt);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetSaleChart: createAsyncThunk('Sale/fetchGetSaleChart', async (_, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiSale.GetSaleChart(axiosJwt);
            return response;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err);
        }
    }),
    fetchGetSaleDateNow: createAsyncThunk('Sale/fetchGetSaleDateNow', async (_, thunkAPI) => {
        const { rejectWithValue, dispatch, getState } = thunkAPI;
        try {
            const axiosJwt = createAxios(dispatch, getState);
            const response = await apiSale.GetSaleDateNow(axiosJwt);
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
    dataGetAll: GetAllInvoiceSuccess | null;
    dataGetSaleChart: GetChartResponseSuccess | null;
    dataGetSaleDateNow: GetSaleDateNowResponseSuccess | null;
    dataSale: ResponseBase | null;
    isLoading: boolean;
    isError: boolean;
}
export const Sales = createSlice({
    name: 'Sales',
    initialState: {
        dataGetAll: null,
        dataGetSaleChart: null,
        dataGetSaleDateNow: null,
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
            })
            .addCase(SaleService.fetchGetAllInvoice.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(SaleService.fetchGetAllInvoice.fulfilled, (state, action) => {
                state.dataGetAll = action.payload as GetAllInvoiceSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(SaleService.fetchGetAllInvoice.rejected, (state, action) => {
                state.dataGetAll = action.payload as GetAllInvoiceSuccess;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(SaleService.fetchGetSaleChart.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(SaleService.fetchGetSaleChart.fulfilled, (state, action) => {
                state.dataGetSaleChart = action.payload as GetChartResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(SaleService.fetchGetSaleChart.rejected, (state, action) => {
                state.dataGetSaleChart = action.payload as GetChartResponseSuccess;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(SaleService.fetchGetSaleDateNow.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(SaleService.fetchGetSaleDateNow.fulfilled, (state, action) => {
                state.dataGetSaleDateNow = action.payload as GetSaleDateNowResponseSuccess;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(SaleService.fetchGetSaleDateNow.rejected, (state, action) => {
                state.dataGetSaleDateNow = action.payload as GetSaleDateNowResponseSuccess;
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default Sales.reducer;
