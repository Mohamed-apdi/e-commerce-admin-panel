import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { productCategoryService } from "./pCategoryService"


const initialState = {
    productCategorys:[],
    createCategory:"",
    deleteCategory:"",
    updateCategory:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
};

export const getProductCategorys = createAsyncThunk("product/get-category", async (thunkAPI) => {

    try {
        return await productCategoryService.getProductCategorys();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createCategory = createAsyncThunk("product/create-Category", async (data, thunkAPI) => {
    try {
        return await productCategoryService.createCategory(data);
    } catch (error) {
         return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

export const deleteCategory = createAsyncThunk("product/delete-category", async (id, thunkAPI) => {
    try {
        return await productCategoryService.deleteCategory(id);
    } catch (error) {
         return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

export const updateCategory = createAsyncThunk("product/update-category", async (data, thunkAPI) => {
    try {
        return await productCategoryService.updateCategory(data);
    } catch (error) {
         return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

const productCategorySlice = createSlice({
    name:"Categorys",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getProductCategorys.pending, (state) => {
            state.isLoading = true;
        }).addCase(getProductCategorys.fulfilled, (state,action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.productCategorys = action.payload;
        }).addCase(getProductCategorys.rejected, (state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(createCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(createCategory.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.createCategory = action.payload;
        }).addCase(createCategory.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        }).addCase(deleteCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCategory.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.deleteCategory = action.payload;
        }).addCase(deleteCategory.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        }).addCase(updateCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.updateCategory = action.payload;
        })
        .addCase(updateCategory.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        });
    }
});

export default productCategorySlice.reducer;