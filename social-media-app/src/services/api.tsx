import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../model/post.model";
import { User } from "../model/user.model";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    users: builder.query<User[], void>({
      query: () => "/users",
    }),
    posts: builder.query<Post[], void>({
      query: () => "/posts",
    }),
  }),
});

export const { useUsersQuery, usePostsQuery } = usersApi;
