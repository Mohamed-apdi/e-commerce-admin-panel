import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersService } from "./orderService";


const initialState = {
    orders: [],
    myorder:{},
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

export const getOrderById = createAsyncThunk("order/get-myorder", async (id, thunkAPI) => {
    try {
        return await OrdersService.getOrderById(id);
    } catch (error) {
        return thunkAPI.rejectWithValue({ message: error.message, status: error.response?.status });
    }
});


export const getRecentOrders = createAsyncThunk("order/get-recent-orders", async (thunkAPI) => {
    try {
        return await OrdersService.getRecentOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateOrder = createAsyncThunk("order/update-orders", async ({id,data}, thunkAPI) => {
    try {
        return await OrdersService.updateOrder({id, data});
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
            state.message = action.payload.message;
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
            state.message = action.payload.message;
        }).addCase(getOrderById.pending, (state) => {
            state.isLoading = true;
        }).addCase(getOrderById.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.myorder = action.payload;
        }).addCase(getOrderById.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.myorder = "not found";
            state.message = action.payload.message;
        }).addCase(updateOrder.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateOrder.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.update = action.payload;
        }).addCase(updateOrder.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.payload.message;
        })
    }
});

export default ordersSlice.reducer;