import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "@/features/brand/brandSlice";
import productCategoryReducer from "../features/productCategory/pCategorySlice"
import colorReducer from "@/features/ProductColor/colorSlice";
import blogReducer from "@/features/blog/blogSlice";
import bCategoryReducer  from "@/features/blogCategory/bCategorySlice";
import enquiriesReducer from "@/features/Enquiries/enquiriesSlice";
import orderReducer from "@/features/Orders/orderSlice";
import uploadReducer from "@/features/upload/uploadSlice";

 const Store = configureStore({
    reducer:{
        auth: authReducer, 
        customer: customerReducer, 
        product: productReducer,
        brand:brandReducer,
        pcategory:productCategoryReducer,
        pcolor:colorReducer,
        blog:blogReducer,
        bcategory:bCategoryReducer,
        enquiry:enquiriesReducer,
        order:orderReducer,
        upload:uploadReducer,
    },
})

export default Store