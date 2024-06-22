import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

const initialState = {
    blogs:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""
}


export const getBlogs = createAsyncThunk("blog/get-blogs", async (thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getBlogs.pending, (state) => {
            state.isLoading = true;
        }).addCase(getBlogs.fulfilled, (state,acion) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.blogs = acion.payload;
        }).addCase(getBlogs.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
});


export default blogSlice.reducer;
