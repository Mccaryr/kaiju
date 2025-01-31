import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Project} from "../types/project.ts";
import {apiSlice} from "./apiSlice.ts";

type ProjectState = {
    data: Project[]
    selectedProject: {label: string, value: string} | null
}

const initialState: ProjectState = {
    data: [],
    selectedProject: null,
}

export const projectSlice = createSlice({
    name:'project',
    initialState,
    reducers: {
        setSelectedProject: (state, action: PayloadAction<any>) => {
            state.selectedProject = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiSlice.endpoints.getProjects.matchFulfilled,
            (state, action: PayloadAction<Project[]>) => {
                state.data = action.payload;
            }
        )
    }
})

export const {setSelectedProject} = projectSlice.actions;
export default projectSlice.reducer;