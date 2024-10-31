import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CONFIG from "../config.ts";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: window.location.hostname ==='localhost' ? `${CONFIG.LOCAL_BACKEND_URL}` : `${CONFIG.PROD_BACKEND_URL}`,
        credentials: 'same-origin',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getTasks: builder.query({
            query: ({searchTerm = '', taskType = ''}) => {
                const params = new URLSearchParams();
                if (searchTerm) params.append('search', searchTerm);
                if (taskType) params.append('type', taskType);
                if(!searchTerm.length && !taskType.length) {
                    return 'tasks'
                } else {
                    return `tasks?${params.toString()}`;
                }
            },
        }),
        updateTask: builder.mutation({
            query: (task) => ({
                url: `task/${task.id}`,
                method: 'PATCH',
                body: task
            })
        }),
        createTask: builder.mutation({
            query: (task) => ({
                url: `task`,
                method: 'POST',
                body: task
            })
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `task/${taskId}`,
                method: 'DELETE'
            })
        }),
    })
});


export const {
    useGetTasksQuery,
    useUpdateTaskMutation,
    useCreateTaskMutation,
    useDeleteTaskMutation
} = apiSlice;
