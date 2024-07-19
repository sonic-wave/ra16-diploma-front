import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchList: '',
};

const searchSlice = createSlice({
    name: 'searchList',
    initialState,
    reducers: {
        addSearchTerm: (state, action) => {
            state.searchList = action.payload;
            // state.searchList.push(action.payload);
        },
        clearSearchList: (state) => {
            state.searchList = '';
        }
    }
});

export const { addSearchTerm, clearSearchList } = searchSlice.actions;
export default searchSlice.reducer;
