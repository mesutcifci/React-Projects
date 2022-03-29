import { configureStore, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { Post, Posts } from "./model/post.model";
import { usersApi } from "./services/api";

// Initial state
const modalInitialState = { isVisible: false };
const usersInitialState = { users: [], user: {} };
const postsInitialState: Posts = {
  posts: [],
  post: {
    id: "",
    owner: "",
    title: "",
    body: "",
    createdAt: "",
    updatedAt: "",
  },
  userPosts: [],
};

// Slice
const modalSlice = createSlice({
  name: "modal",
  initialState: modalInitialState,
  reducers: {
    showModal(state) {
      state.isVisible = true;
    },
    hideModal(state) {
      state.isVisible = false;
    },
  },
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const filterAndSortPosts = (posts: Post[]): Post[] => {
  let filteredPosts = _.uniqBy(posts, "createdAt");
  filteredPosts = _.orderBy(filteredPosts, ["createdAt"], ["desc"]);
  return filteredPosts;
};

const postsSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
    setPosts(state, action) {
      state.posts = filterAndSortPosts([...state.posts, ...action.payload]);
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    setUserPosts(state, action) {
      if (action.payload.length > 0) {
        state.userPosts = filterAndSortPosts([
          ...state.userPosts,
          ...action.payload,
        ]);
      }
    },
    removePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.userPosts = state.userPosts.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

// Action
export const modalActions = modalSlice.actions;
export const usersActions = usersSlice.actions;
export const postsActions = postsSlice.actions;

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    modal: modalSlice.reducer,
    usersSlice: usersSlice.reducer,
    postsSlice: postsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
