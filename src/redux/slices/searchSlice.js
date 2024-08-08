import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchList: "",
  activeCategory: null,
};

const searchSlice = createSlice({
  name: "searchList",
  initialState,
  reducers: {
    addSearchTerm: (state, action) => {
      state.searchList = action.payload;
    },
    addActiveCatergory: (state, action) => {
      state.activeCategory = action.payload;
    },
    clearSearchList: (state) => {
      state.searchList = "";
    },
  },
});

export const { addSearchTerm, addActiveCatergory, clearSearchList } =
  searchSlice.actions;
export default searchSlice.reducer;
