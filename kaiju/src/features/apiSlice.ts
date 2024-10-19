import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
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
            query: () => 'tasks',
        }),
        updateTask: builder.mutation({
            query: (task) => ({
                url: `task/${task.id}`,
                method: 'PATCH',
                body: task
            })
        })
    }),
});


export const { useGetTasksQuery, useUpdateTaskMutation } = apiSlice;