import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from './slices/filtersSlice';
import themesReducer from './slices/themesSlice';


export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        themes: themesReducer
    },
});