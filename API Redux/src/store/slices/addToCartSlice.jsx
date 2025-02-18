import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    isloading: false,
    isError: false,
}

const addToCartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.cart.push(action.payload)
        },
    }
})

export const { addCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;