import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const initialState = {
  catalog: [],
  notFound: false,
  loading: false,
  error: "",
  catalogItem: null,
  loadingItem: false,
  errorItem: "",
};

// const localhost = 'https://ra16-diploma-back-ux60.onrender.com/api/'
const localhost = "http://localhost:7070/api/";

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const catalogSlice = createSliceWithThunk({
  name: "catalog",
  initialState,
  selectors: {
    catalogState: (state) => state,
    catalogList: (state) => state.catalog.Search,
    catalogItem: (state) => state.catalogItem,
  },
  reducers: (create) => ({
    fetchCatalog: create.asyncThunk(
      async (reqOptions, { rejectWithValue }) => {
        try {
          const response = await fetch(`${localhost}${reqOptions}`);

          if (!response.ok) {
            return rejectWithValue("Loading catalog error!");
          }
          const result = await response.json();
          return result;
        } catch (e) {
          return rejectWithValue(e);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = "";
        },
        fulfilled: (state, action) => {
          if (action.payload.Error === "Item not found!") {
            state.error = "Item not found!";
          } else {
            if (action.meta.arg.includes("offset")) {
              state.catalog = [...state.catalog, ...action.payload];
              state.notFound = false;
            } else {
              state.catalog = action.payload;
              if (action.payload.length === 0) {
                state.notFound = true;
              } else {
                state.notFound = false;
              }
            }
            state.error = "";
          }
        },
        rejected: (state, action) => {
          state.error = action.payload;
          state.loading = false;
        },
        settled: (state) => {
          state.loading = false;
        },
      },
    ),
    fetchCatalogItem: create.asyncThunk(
      async (id, { rejectWithValue }) => {
        try {
          const response = await fetch(`${localhost}items/${id}`);
          if (!response.ok) {
            return rejectWithValue("Loading catalog item error!");
          }
          const result = await response.json();
          return result;
        } catch (e) {
          return rejectWithValue(e);
        }
      },
      {
        pending: (state) => {
          state.loadingItem = true;
          state.errorItem = "";
        },
        fulfilled: (state, action) => {
          state.catalogItem = action.payload;
          state.errorItem = "";
        },
        rejected: (state, action) => {
          state.errorItem = action.payload;
        },
        settled: (state) => {
          state.loadingItem = false;
        },
      },
    ),
  }),
});

export const { fetchCatalog, fetchCatalogItem } = catalogSlice.actions;
export default catalogSlice.reducer;
