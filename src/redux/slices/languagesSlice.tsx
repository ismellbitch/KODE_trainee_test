import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    language: navigator.language,
};

export const languages = createSlice({
    name: 'language',
    initialState,
    reducers: {
        toggleLanguage: (state) => {
            state.language = state.language == 'ru' ? 'en' : 'ru';
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
})

export const { toggleLanguage, setLanguage } = languages.actions
export default languages.reducer