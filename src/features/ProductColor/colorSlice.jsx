import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { colorService } from "./colorService";


const initialState = {
    color:[],
    createColor:"",
    deleteColor:"",
    updateColor:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
};

export const getColors = createAsyncThunk("color/get-colors", async (thunkAPI) => {

    try {
        return await colorService.getColors();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createColor = createAsyncThunk("color/create-Color", async (data, thunkAPI) => {
    try {
        return await colorService.createColors(data);
    } catch (error) {
         return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

export const deleteColor = createAsyncThunk("color/delete-Color", async (id, thunkAPI) => {
    try {
        return await colorService.deleteColors(id);
    } catch (error) {
         return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

export const updateColor = createAsyncThunk("color/update-Color", async (data, thunkAPI) => {
    try {
        return await colorService.updateColors(data);
    } catch (error) {
         return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

const colorSlice = createSlice({
    name:"Color",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getColors.pending, (state) => {
            state.isLoading = true;
        }).addCase(getColors.fulfilled, (state,action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.color = action.payload;
        }).addCase(getColors.rejected, (state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(createColor.pending, (state) => {
            state.isLoading = true;
        }).addCase(createColor.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.createColor = action.payload;
        }).addCase(createColor.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        }).addCase(deleteColor.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteColor.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.deleteColor = action.payload;
        }).addCase(deleteColor.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        }).addCase(updateColor.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateColor.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.updateColor = action.payload;
        })
        .addCase(updateColor.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        });
    }
});

export default colorSlice.reducer;