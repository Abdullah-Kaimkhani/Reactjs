import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import addToCartReducer from "./slices/addToCartSlice";

export const AppStore = configureStore({
    reducer: {
        productReducer,
        addToCartReducer,
    }
})