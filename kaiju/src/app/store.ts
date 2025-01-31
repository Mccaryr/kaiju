import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modalSlice.ts'
import {apiSlice} from "../features/apiSlice.ts";
import filterReducer from '../features/filterSlice.ts'
import authReducer from '../features/authSlice.ts'
import projectReducer from '../features/projectSlice.ts'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        modal: modalReducer,
        filter: filterReducer,
        auth: authReducer,
        projects: projectReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch