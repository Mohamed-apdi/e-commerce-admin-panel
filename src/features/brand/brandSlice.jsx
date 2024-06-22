import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { brandService } from "./brandService";


const initialState = {
    brands: [],
    createBrands:"",
    deleteBrand:"",
    updateBrnad:"",
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const getBrands = createAsyncThunk("brand/get-brands", async (thunkAPI) => {
    try {
        return await brandService.getBrands();
    } catch (error) {
         return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

export const createBrands = createAsyncThunk("brand/createBrand", async (data, thunkAPI) => {
    try {
        return await brandService.createBrand(data);
    } catch (error) {
         return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

export const deleteBrands = createAsyncThunk("brand/delete-Brand", async (id, thunkAPI) => {
    try {
        return await brandService.deleteBrand(id);
    } catch (error) {
         return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

export const updateBrands = createAsyncThunk("brand/update-Brand", async (brand, thunkAPI) => {
    try {
        return await brandService.updateBrand(brand);
    } catch (error) {
         return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

 const brandSlice = createSlice({
    name:"brands",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getBrands.pending, (state) => {
            state.isLoading = true;
        }).addCase(getBrands.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.brands = action.payload;
        }).addCase(getBrands.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        }).addCase(createBrands.pending, (state) => {
            state.isLoading = true;
        }).addCase(createBrands.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.createBrands = action.payload;
        }).addCase(createBrands.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        }).addCase(deleteBrands.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteBrands.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.deleteBrand = action.payload;
        }).addCase(deleteBrands.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        }).addCase(updateBrands.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateBrands.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.updateBrand = action.payload;
        })
        .addCase(updateBrands.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        });
    }
});

export default brandSlice.reducer;