import React, { useEffect } from "react";
import { useDeletePostMutation, usePostsQuery } from "../../services/api";
import { Post } from "../../model/post.model";

const Home = () => {
  const { data: posts, isLoading: loadingForPosts } = usePostsQuery();
  const [deletePost] = useDeletePostMutation();

  if (loadingForPosts) {
    return <p>Loading...</p>;
  }

  const deletePostHandler = async (id: string) => {
    await deletePost(id);
  };

  return (
    <div>
      {posts?.map((post: Post, index: number) => {
        return (
          <div key={post.id}>

          </div>
        );
      })}
    </div>
  );
};

export default Home;
