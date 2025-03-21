import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
};

export const themes = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme == 'dark' ? 'light' : 'dark';
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
})

export const { toggleTheme, setTheme } = themes.actions
export default themes.reducer