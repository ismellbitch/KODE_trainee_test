import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    department: 'all',
    sortProperty: 'alphabet',
    search: ''
};

export const filters = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter: (state, action) => {
            state.department = action.payload;
        },
        changeSort: (state, action) => {
            state.sortProperty = action.payload;
        },
        changeSearchText: (state, action) => {
            state.search = action.payload;
        },
        setFilters: (state, action) => {
            state.department = action.payload.department;
            state.sortProperty = action.payload.sortProperty;
            action.payload.searchText ? state.search = action.payload.searchText : state.search = '';
        }
    }
})

export const { changeFilter, changeSort, changeSearchText, setFilters } = filters.actions
export default filters.reducer