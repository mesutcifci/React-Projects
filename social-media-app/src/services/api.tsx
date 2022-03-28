import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../model/post.model";
import { User } from "../model/user.model";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    
    // Queries
    getUsers: builder.query<User[], void>({
      query: () => "/users",
    }),
    getUser: builder.query<User, string>({
      query: (username) => `/users/${username}`,
    }),
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
    }),
    getPostsByUsername: builder.query<Post[], string>({
      query: (username) => "/posts?owner=" + username,
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
    }),

    //Mutations
    createPost: builder.mutation<void, Post>({
      query: (props) => {
        return{ 
          url: `/posts`,
          method: "POST",
          body: props
        }
      },
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
  useGetUsersQuery,
  useGetUserQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostsByUsernameQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = usersApi;
