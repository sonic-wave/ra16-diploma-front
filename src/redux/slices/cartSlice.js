import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartList: JSON.parse(localStorage.getItem('cartList')) || [],
};

const saveToLocalStorage = (cartList) => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
};

const cartSlice = createSlice({
    name: 'cartList',
    initialState,
    reducers: {
        addCartList: (state, action) => {
            state.cartList.push(action.payload);
            saveToLocalStorage(state.cartList);
        },
        clearCartList: (state) => {
            state.cartList = [];
            saveToLocalStorage(state.cartList);
        },
        removeCartItem: (state, action) => {
            state.cartList = state.cartList.filter(item => item.id !== action.payload.id);
            saveToLocalStorage(state.cartList);
        }
    }
});

export const { addCartList, clearCartList, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
