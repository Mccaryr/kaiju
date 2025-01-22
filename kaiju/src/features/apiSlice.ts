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
        login: builder.mutation({
            query: (userData) => ({
                url: "/auth/authenticate",
                method: "POST",
                body: userData,
            }),
        }),
        getProjects: builder.query({
            query: () => {
                return 'projects'
            }
        }),
        getTasks: builder.query({
            query: ({searchTerm = '', taskType = '', projectId = '', assignee = ''}) => {
                const params = new URLSearchParams();
                if (searchTerm) params.append('searchTerm', searchTerm);
                if (taskType && taskType !== "All") params.append('type', taskType);
                if(projectId) params.append('projectId', projectId)
                if(assignee && assignee !== "All") params.append('assignee', assignee)

                return `tasks?${params.toString()}`;
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
                body: task,
                params: {
                    recipient: task.assignee
                },
            })
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `task/${taskId}`,
                method: 'DELETE'
            })
        }),
        getComments: builder.query({
            query: (taskId) => {
                return `tasks/${taskId}/comments`
            }
        }),
        createComment: builder.mutation({
            query: (comment) => ({
                url:`comments`,
                method:'POST',
                body: comment
            })
        }),
        updateComment: builder.mutation({
            query: (comment) => ({
                url:`comments`,
                method:'PUT',
                body: comment
            })
        }),
        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `comments/${commentId}`,
                method: 'DELETE'
            })
        })
    }),
});


export const {
    useLoginMutation,
    useGetProjectsQuery,
    useGetTasksQuery,
    useUpdateTaskMutation,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useGetCommentsQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation
} = apiSlice;
