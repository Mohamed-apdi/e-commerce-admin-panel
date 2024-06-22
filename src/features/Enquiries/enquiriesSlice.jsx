import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enquirieService } from "./enquiriesService";


const initialState = {
    enquiries: [],
    update:"",
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const getEnquiries = createAsyncThunk("enquirie/get-Enquiries", async (thunkAPI) => {
    try {
        return await enquirieService.getEnquiries();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateEnquiries = createAsyncThunk("enquiries/update", async (data, thunkAPI) => {
    try {
        return await enquirieService.updateEnquiries(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

 const enquiriesSlice = createSlice({
    name:"enquiries",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getEnquiries.pending, (state) => {
            state.isLoading = true;
        }).addCase(getEnquiries.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.enquiries = action.payload;
        }).addCase(getEnquiries.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        }).addCase(updateEnquiries.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateEnquiries.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.update = action.payload;
        }).addCase(updateEnquiries.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        })
    }
});

export default enquiriesSlice.reducer;