import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersService } from "./orderService";


const initialState = {
    orders: [],
    recentOrder:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const getOrders = createAsyncThunk("order/get-orders", async (thunkAPI) => {
    try {
        return await OrdersService.getOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getRecentOrders = createAsyncThunk("order/get-recent-orders", async (thunkAPI) => {
    try {
        return await OrdersService.getRecentOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

 const ordersSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getOrders.pending, (state) => {
            state.isLoading = true;
        }).addCase(getOrders.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.orders = action.payload;
        }).addCase(getOrders.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        }).addCase(getRecentOrders.pending, (state) => {
            state.isLoading = true;
        }).addCase(getRecentOrders.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.recentOrder = action.payload;
        }).addCase(getRecentOrders.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        })
    }
});

export default ordersSlice.reducer;