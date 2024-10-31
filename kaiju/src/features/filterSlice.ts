import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "",
    type: ""
}
export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            console.log(action.payload)
            state.searchTerm = action.payload.searchTerm;
            state.type = action.payload.type;
        }
    }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer;