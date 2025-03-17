import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from './slices/filtersSlice';


export const store = configureStore({
    reducer: {
        filters: filtersReducer,
    },
});