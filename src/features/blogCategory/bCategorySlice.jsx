import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { blogCategoryService } from "./bCategoryService";


const initialState = {
    blogCategorys:[],
    createCategory:"",
    deleteCategory:"",
    updateCategory:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
};

export const getBlogCategorys = createAsyncThunk("blog/get-category", async (thunkAPI) => {

    try {
        return await blogCategoryService.getBlogCategorys();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createCategory = createAsyncThunk("blog/create-category", async (data, thunkAPI) => {
    try {
        return await blogCategoryService.createCategory(data);
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
            status:error.response?.status,
            data:error.response?.data
        })
    }
})

export const deleteCategory = createAsyncThunk("blog/delete-category", async (id, thunkAPI) => {
    try {
        return await blogCategoryService.deleteCategory(id);
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
            status:error.response?.status,
            data:error.response?.data
        })
    }
})

export const updateCategory = createAsyncThunk("blog/update-category", async (data, thunkAPI) => {
    try {
        return await blogCategoryService.updateCategory(data);
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
            status:error.response?.status,
            data:error.response?.data
        })
    }
})

const blogCategorySlice = createSlice({
    name:"Categorys",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getBlogCategorys.pending, (state) => {
            state.isLoading = true;
        }).addCase(getBlogCategorys.fulfilled, (state,action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.blogCategorys = action.payload;
        }).addCase(getBlogCategorys.rejected, (state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(createCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(createCategory.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.createCategory = action.payload;
        }).addCase(createCategory.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(deleteCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCategory.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.deleteCategory = action.payload;
        }).addCase(deleteCategory.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(updateCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateCategory.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.updateCategory = action.payload;
        }).addCase(updateCategory.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});

export default blogCategorySlice.reducer;