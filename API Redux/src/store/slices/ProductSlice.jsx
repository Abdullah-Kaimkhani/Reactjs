
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allProducts: [],
    isloading: false,
    isError: false,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.allProducts = [];
            state.isloading = true;
            state.isError = false;
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.allProducts = action.payload;
            state.isloading = false;
            state.isError = false;
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.allProducts = [];
            state.isloading = false;
            state.isError = true;
        })
    }
})


export const fetchData = createAsyncThunk("products/fetch", async () => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
    }
})

export default productSlice.reducer;