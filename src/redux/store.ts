import { configureStore } from "@reduxjs/toolkit"
import filtersReducer from './slices/filtersSlice.tsx'
import themesReducer from './slices/themesSlice.tsx'
import languagesReducer from './slices/languagesSlice.tsx'


export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        themes: themesReducer,
        languages: languagesReducer
    },
});