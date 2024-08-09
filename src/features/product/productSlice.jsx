import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { productService } from "./productService";


const initialState = {
    products: [],
    createdProduct:"",
    deletedProduct: "",
    update:"",
    product:"",
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const getProducts = createAsyncThunk("product/get-products", async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

export const getProductById = createAsyncThunk("product/get-product-by-id", async (id, thunkAPI) => {
    try {
        return await productService.getProductById(id);
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

export const createProduct = createAsyncThunk("product/create-product", async (productData, thunkAPI) => {
    try {
        return await productService.createProduct(productData);
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

export const deleteProduct = createAsyncThunk("product/delete-product", async (id, thunkAPI) => {
    try {
        return await productService.deleteProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
})

export const updateProduct = createAsyncThunk("product/update-product", async ({ id, data }, thunkAPI) => {
    try {
        return await productService.updateProduct({ id, data });
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
});

export const resetState = createAction("Reset_all");

 const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(getProducts.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.products = action.payload;
        }).addCase(getProducts.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        }).addCase(getProductById.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProductById.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.product = action.payload;
        })
        .addCase(getProductById.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.payload.message;
        }).addCase(createProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(createProduct.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.createdProduct = action.payload;
        }).addCase(createProduct.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.payload.message;
        }).addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteProduct.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.deletedProduct = action.payload;
        }).addCase(deleteProduct.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.payload.message;
        }).addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.update = action.payload;
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.payload.message;
        })
        .addCase(resetState, () => initialState);
    
        
    }
});

export default productSlice.reducer;