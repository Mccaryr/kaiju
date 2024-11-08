import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "",
    taskType: ""
}
export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            const {searchTerm, taskType} = action.payload
            if(searchTerm) state.searchTerm = searchTerm;
            if(taskType) state.taskType = taskType;
        }
    }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer;