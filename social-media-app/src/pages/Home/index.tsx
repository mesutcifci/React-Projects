import React, { useEffect } from "react";
import { useDeletePostMutation, usePostsQuery } from "../../services/api";
import { Post } from "../../model/post.model";
import Layout, { Content } from "antd/lib/layout/layout";
import PostCard from "../../components/PostCard";

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
    <Layout className="py-10 flex items-center">
      <Content>
        <PostCard />
      </Content>
    </Layout>
  );
};

export default Home;
