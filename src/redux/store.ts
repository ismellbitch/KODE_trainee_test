import { configureStore } from "@reduxjs/toolkit"
import filtersReducer from './slices/filtersSlice'
import themesReducer from './slices/themesSlice'
import languagesReducer from './slices/languagesSlice'


export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        themes: themesReducer,
        languages: languagesReducer
    },
});