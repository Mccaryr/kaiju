import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "",
    taskType: "",
    assignee: "",
}
export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            const {searchTerm, taskType, assignee} = action.payload
            if(searchTerm) state.searchTerm = searchTerm;
            if(taskType) state.taskType = taskType;
            if(assignee) state.assignee = assignee

        }
    }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer;