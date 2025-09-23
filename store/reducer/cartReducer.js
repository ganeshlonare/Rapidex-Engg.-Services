import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    count: 0,
    products: []
}

export const cartReducer = createSlice({
    name: 'cartStore',
    initialState,
    reducers: {
        addIntoCart: (state, action) => {
            const payload = action.payload
            // Guard against invalid or incomplete payloads
            if (!payload || !payload.productId || !payload.variantId) {
                return
            }
            const existingProduct = state.products.findIndex(
                (product) => product && product.productId === payload.productId && product.variantId === payload.variantId
            )

            if (existingProduct < 0) {
                state.products.push({
                    ...payload,
                    qty: typeof payload.qty === 'number' && payload.qty > 0 ? payload.qty : 1,
                    sellingPrice: Number(payload.sellingPrice) || 0,
                    mrp: Number(payload.mrp) || Number(payload.sellingPrice) || 0,
                })
                state.count = state.products.filter(Boolean).length
            }
        },
        increaseQuantity: (state, action) => {
            const { productId, variantId } = action.payload
            const existingProduct = state.products.findIndex(
                (product) => product && product.productId === productId && product.variantId === variantId
            )

            if (existingProduct >= 0) {
                state.products[existingProduct].qty += 1
            }
        },
        decreaseQuantity: (state, action) => {
            const { productId, variantId } = action.payload
            const existingProduct = state.products.findIndex(
                (product) => product && product.productId === productId && product.variantId === variantId
            )

            if (existingProduct >= 0) {
                if (state.products[existingProduct].qty > 1) {
                    state.products[existingProduct].qty -= 1
                }
            }
        },
        removeFromCart: (state, action) => {
            const { productId, variantId } = action.payload

            state.products = state.products.filter((product) => product && !(product.productId === productId && product.variantId === variantId))

            state.count = state.products.filter(Boolean).length
        },
        clearCart: (state, action) => {
            state.products = []
            state.count = 0
        }

    }
})

export const {
    addIntoCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
} = cartReducer.actions
export default cartReducer.reducer
