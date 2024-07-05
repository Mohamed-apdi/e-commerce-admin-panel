import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { customerService } from "./customerService";

const initialState = {
    customers: [],
    customer: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const getUsers = createAsyncThunk("customer/get-customers", async ( thunkAPI) => {
    try {
        return await customerService.getUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserId = createAsyncThunk("customer/get-a-customer", async (id, thunkAPI) => {
    try {
        return await customerService.getUserId(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteUser = createAsyncThunk("customer/delete-customer", async (id, thunkAPI) => {
    try {
        return await customerService.deleteUser(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("reset");

const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.customers = action.payload;
        }).addCase(getUsers.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase(getUserId.pending, (state) => {
            state.isLoading = true;
        }).addCase(getUserId.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.customer = action.payload;
        }).addCase(getUserId.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.customer = "";
            state.message = action.payload;
        })
        .addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteUser.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.delete = action.payload;
        }).addCase(deleteUser.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.delete = "";
            state.message = action.payload;
        })
        .addCase(resetState, () => initialState)
    }
});

export default customerSlice.reducer;
