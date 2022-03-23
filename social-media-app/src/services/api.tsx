import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../model/post.model";
import { User } from "../model/user.model";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    // Queries

    users: builder.query<User[], void>({
      query: () => "/users",
    }),
    user: builder.query<User, string>({
      query: (username) => `/users/${username}`,
    }),
    posts: builder.query<Post[], void>({
      query: () => "/posts",
    }),
    post: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
    }),

    //Mutations
    createPost: builder.mutation<void, Post>({
      query: (post) => ({
        url: `/posts`,
        method: "POST",
        body: post,
      }),
    }),
    updatePost: builder.mutation<void, Post>({
      query: ({ id, ...post }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: post,
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useUsersQuery,
  useUserQuery,
  usePostsQuery,
  usePostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = usersApi;
