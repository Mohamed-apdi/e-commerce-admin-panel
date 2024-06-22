import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customerService } from "./customerService";

const initialState = {
    customers: [],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const getUsers = createAsyncThunk("customer/get-customers", async (thunkAPI) => {
    try {
        return await customerService.getUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

 const customerSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        }).addCase(getUsers.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.customers = action.payload;
        }).addCase(getUsers.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        })
    }
});

export default customerSlice.reducer;