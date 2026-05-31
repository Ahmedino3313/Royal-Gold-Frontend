import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem('cart')) || [],
    },
        reducers: {
            addToCart: (state, action) => {
                const { quantity = 1, ...product } = action.payload
                const safeProduct = {
                    ...product,
                    price: Number(product.price),
                }
                const existing = state.items.find(item => item.id === safeProduct.id)
                if (existing) {
                    existing.quantity += quantity
                    toast.success(`${safeProduct.name} quantity updated`)
                } else {
                    state.items.push({ ...safeProduct, quantity })
                    toast.success(`${safeProduct.name} added to cart`)
                }
                localStorage.setItem('cart', JSON.stringify(state.items))
            },
            
            removeFromCart: (state, action) => {
                const item = state.items.find(i => i.id === action.payload)
                if (item) toast.success(`${item.name} removed from cart`)
                state.items = state.items.filter(item => item.id !== action.payload)
                localStorage.setItem('cart', JSON.stringify(state.items))
            },

            increaseQuantity: (state, action) => {
                const item = state.items.find(item => item.id === action.payload)
                if (item) item.quantity += 1
                localStorage.setItem('cart', JSON.stringify(state.items))
            },

            decreaseQuantity: (state, action) => {
                const item = state.items.find(item => item.id === action.payload)
                if (item && item.quantity > 1) {
                    item.quantity -= 1
                } else {
                    state.items = state.items.filter(i => i.id !== action.payload)
                }
                localStorage.setItem('cart', JSON.stringify(state.items))
            },

            clearCart: (state) => {
                state.items = []
                localStorage.removeItem('cart')
            },
        },
    })

    export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    } = cartSlice.actions

export default cartSlice.reducer